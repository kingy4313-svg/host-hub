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
  const trimmed = (url || "").trim();
  if (!trimmed) return "";

  const yt = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/i);
  if (yt?.[1]) return `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`;

  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo?.[1]) return `https://vumbnail.com/${vimeo[1]}.jpg`;

  if (/\.(mp4|webm|ogv|ogg|mov|m4v)(\?|#|$)/i.test(trimmed)) {
    return trimmed.replace(/(\.(?:mp4|webm|ogv|ogg|mov|m4v))(\?|#|$)/i, "$1/ik-thumbnail.jpg$2");
  }

  return "";
}

export async function videoThumbnailFromUrl(url: string): Promise<string> {
  const fallback = videoThumbnail(url);
  if (!url || typeof document === "undefined") return fallback;

  if (fallback && !/\.(mp4|webm|ogv|ogg|mov|m4v)(\?|#|$)/i.test(url.trim())) return fallback;

  try {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    await new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        video.removeEventListener("loadeddata", onLoaded);
        video.removeEventListener("error", onError);
      };
      const onLoaded = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error("Video preview could not be loaded."));
      };

      video.addEventListener("loadeddata", onLoaded, { once: true });
      video.addEventListener("error", onError, { once: true });
      video.src = url;
    });

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
    const targetTime = Math.min(Math.max(duration * 0.1, 0.1), duration - 0.05 || 0.1);
    video.currentTime = targetTime;

    await new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("error", onError);
      };
      const onSeeked = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error("Video preview frame could not be extracted."));
      };

      video.addEventListener("seeked", onSeeked, { once: true });
      video.addEventListener("error", onError, { once: true });
    });

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1200;
    canvas.height = video.videoHeight || 675;

    if (!canvas.width || !canvas.height) return fallback;

    const ctx = canvas.getContext("2d");
    if (!ctx) return fallback;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.8);
  } catch {
    return fallback;
  }
}

export function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}
