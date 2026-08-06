import { supabase } from "@/integrations/supabase/client";

/** Uploads a file to the private media bucket and returns a public proxy URL. */
export async function uploadMedia(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });
  if (error) throw new Error(error.message);

  const url = `/api/public/media/${path}`;
  await supabase.from("media_assets").insert({
    url,
    path,
    name: file.name,
    mime_type: file.type || null,
    size: file.size,
  });
  return url;
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
