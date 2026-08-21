import { supabase } from "@/integrations/supabase/client";

export const FEATURED_BUCKET = "featured-moments-videos";

export type FeaturedMoment = {
  id: string;
  title: string;
  caption: string;
  sort_order: number;
  video_url: string;
  video_path: string | null;
  thumbnail_url: string | null;
  created_at: string;
};

/** Public proxy URL for an object stored in the featured-moments bucket. */
export function featuredVideoUrl(path: string): string {
  return `/api/public/media/${encodeURIComponent(path)}?bucket=${FEATURED_BUCKET}`;
}

const ALLOWED_VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;

export function validateVideoFile(file: File): string | null {
  const isVideoMime = file.type.startsWith("video/");
  if (!isVideoMime && !ALLOWED_VIDEO_EXT.test(file.name)) {
    return "Only video files (.mp4, .webm, .mov, .m4v) are allowed.";
  }
  if (file.size > 200 * 1024 * 1024) return "Video must be smaller than 200 MB.";
  return null;
}

export async function listFeaturedMoments(): Promise<FeaturedMoment[]> {
  const { data, error } = await supabase
    .from("featured_moments")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as FeaturedMoment[];
}

/**
 * Uploads a video to storage and stores its metadata. `onProgress` receives
 * 0-100 while the file is being transferred.
 */
export async function uploadFeaturedMoment(input: {
  file: File;
  title: string;
  caption: string;
  sortOrder: number;
  thumbnailUrl?: string;
  onProgress?: (percent: number) => void;
}): Promise<FeaturedMoment> {
  const invalid = validateVideoFile(input.file);
  if (invalid) throw new Error(invalid);

  const safeName = input.file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  const baseUrl = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
  const apiKey = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined;

  if (baseUrl && apiKey && token) {
    // XHR gives us real upload progress; the JS client does not expose it.
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${baseUrl}/storage/v1/object/${FEATURED_BUCKET}/${encodeURIComponent(path)}`);
      xhr.setRequestHeader("apikey", apiKey);
      xhr.setRequestHeader("authorization", `Bearer ${token}`);
      xhr.setRequestHeader("x-upsert", "false");
      if (input.file.type) xhr.setRequestHeader("content-type", input.file.type);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) input.onProgress?.(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(`Upload failed (${xhr.status}): ${xhr.responseText || "storage error"}`));
      };
      xhr.onerror = () => reject(new Error("Upload failed — network error."));
      xhr.send(input.file);
    });
  } else {
    const res = await supabase.storage
      .from(FEATURED_BUCKET)
      .upload(path, input.file, { contentType: input.file.type || "video/mp4", upsert: false });
    if (res.error) throw new Error(res.error.message || "Upload failed");
    input.onProgress?.(100);
  }

  const row = {
    title: input.title,
    caption: input.caption,
    sort_order: input.sortOrder,
    video_url: featuredVideoUrl(path),
    video_path: path,
    thumbnail_url: input.thumbnailUrl || null,
  };

  const { data, error } = await supabase.from("featured_moments").insert(row).select().single();
  if (error) {
    // Roll back the orphaned object so storage stays clean.
    await supabase.storage.from(FEATURED_BUCKET).remove([path]);
    throw new Error(error.message);
  }
  return data as FeaturedMoment;
}

export async function deleteFeaturedMoment(item: FeaturedMoment): Promise<void> {
  if (item.video_path) {
    const { error } = await supabase.storage.from(FEATURED_BUCKET).remove([item.video_path]);
    if (error) console.warn("Storage delete failed:", error.message);
  }
  const { error } = await supabase.from("featured_moments").delete().eq("id", item.id);
  if (error) throw new Error(error.message);
}

export async function updateFeaturedMoment(
  id: string,
  patch: Partial<Pick<FeaturedMoment, "title" | "caption" | "sort_order" | "thumbnail_url">>,
): Promise<void> {
  const { error } = await supabase.from("featured_moments").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}
