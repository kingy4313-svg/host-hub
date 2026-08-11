import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        const decodedPath = path ? decodeURIComponent(path) : "";
        if (!decodedPath || decodedPath.includes("..")) return new Response("Not found", { status: 404 });

        try {
          const { data, error } = await supabaseAdmin.storage.from("media").download(decodedPath);
          if (error || !data) return new Response("Not found", { status: 404 });

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