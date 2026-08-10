import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

async function getStorageClient() {
  try {
    const mod = await import("@/integrations/supabase/client.server");
    // prefer admin client when available
    return (mod as any).supabaseAdmin;
  } catch (err) {
    // fallback: create public client using publishable key (works if bucket is public)
    const SUPABASE_URL = process.env["SUPABASE_URL"] || import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_PUBLISHABLE_KEY = process.env["SUPABASE_PUBLISHABLE_KEY"] || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) throw new Error("Missing Supabase keys for media route");
    return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  }
}

export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        if (!path || path.includes("..")) return new Response("Not found", { status: 404 });

        try {
          const storage = await getStorageClient();
          const { data, error } = await storage.storage.from("media").download(path);
          if (error || !data) return new Response("Not found", { status: 404 });

          return new Response(await data.arrayBuffer(), {
            headers: {
              "content-type": data.type || "application/octet-stream",
              "cache-control": "public, max-age=31536000, immutable",
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
