import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/**
 * Downloads a media object. Prefers the service-role client, but falls back to
 * the publishable key (the bucket has a public SELECT policy) so uploads still
 * render when no service-role key is configured.
 */
const ALLOWED_BUCKETS = new Set(["media", "featured-moments-videos"]);

async function downloadMedia(objectPath: string, bucket: string) {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const res = await supabaseAdmin.storage.from(bucket).download(objectPath);
    if (!res.error && res.data) return res.data;
  } catch {
    // fall through to the publishable-key client
  }

  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return null;

  const anon = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, headers: { ...Object.fromEntries(new Headers(init?.headers)), apikey: key } }) },
  });
  const res = await anon.storage.from(bucket).download(objectPath);
  if (res.error || !res.data) return null;
  return res.data;
}

export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        const decodedPath = path ? decodeURIComponent(path) : "";
        if (!decodedPath || decodedPath.includes("..")) return new Response("Not found", { status: 404 });

        const requested = new URL(request.url).searchParams.get("bucket") ?? "media";
        const bucket = ALLOWED_BUCKETS.has(requested) ? requested : "media";

        try {
          const data = await downloadMedia(decodedPath, bucket);

          if (!data) return new Response("Not found", { status: 404 });

          const buffer = await data.arrayBuffer();
          const size = buffer.byteLength;
          const contentType = data.type || "application/octet-stream";

          const baseHeaders: Record<string, string> = {
            "content-type": contentType,
            "cache-control": "public, max-age=31536000, immutable",
            "accept-ranges": "bytes",
            "access-control-allow-origin": "*",
          };

          // Handle Range requests (needed for mobile browsers loading large images/videos)
          const range = request.headers.get("range");
          if (range) {
            const match = range.match(/bytes=(\d*)-(\d*)/);
            const start = match?.[1] ? parseInt(match[1], 10) : 0;
            const end = match?.[2] ? parseInt(match[2], 10) : size - 1;
            const chunk = buffer.slice(start, end + 1);

            return new Response(chunk, {
              status: 206,
              headers: {
                ...baseHeaders,
                "content-length": String(chunk.byteLength),
                "content-range": `bytes ${start}-${end}/${size}`,
              },
            });
          }

          return new Response(buffer, {
            status: 200,
            headers: {
              ...baseHeaders,
              "content-length": String(size),
            },
          });
        } catch (err) {
          console.error("/api/public/media error:", err);
          return new Response("Not found", { status: 404 });
        }
      },
    },
  },
});