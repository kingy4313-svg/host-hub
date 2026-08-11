import { supabase } from "@/integrations/supabase/client";

/** Uploads a file to the private media bucket and returns a public proxy URL. */
export async function uploadMedia(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
  try {
    const res = await supabase.storage
      .from("media")
      .upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });
    if (res.error) {
      console.error("Supabase storage upload error:", res.error);
      throw new Error(res.error.message || "Upload failed");
    }

    const url = `/api/public/media/${encodeURIComponent(path)}`;
    const insertRes = await supabase.from("media_assets").insert({
      url,
      path,
      name: file.name,
      mime_type: file.type || null,
      size: file.size,
    });
    if (insertRes.error) {
      console.warn("Warning: media_assets insert failed:", insertRes.error);
    }
    console.log("uploadMedia: uploaded file, path=", path, "publicUrl=", url);
    return url;
  } catch (err) {
    console.error("uploadMedia error:", err);
    throw err;
  }
}

/** Best-effort thumbnail for a pasted video link. */
export function videoThumbnail(url: string): string {
  if (!url) return "";
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt?.[1]) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`;
  return "";
}

export function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}
