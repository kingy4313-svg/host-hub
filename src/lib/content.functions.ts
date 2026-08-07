import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { mergeContent, type SiteContent } from "@/content/site-content";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Public: the live site content. */
export const getPublishedContent = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { data } = await publicClient().from("site_content").select("data").eq("id", "published").maybeSingle();
    return mergeContent(data?.data ?? {});
  } catch {
    return mergeContent({});
  }
});

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!data) throw new Error("Forbidden: admin access required");
}

export const getAdminContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as any);
    const { data } = await (context as any).supabase.from("site_content").select("id, data, updated_at");
    const rows: { id: string; data: unknown; updated_at: string }[] = data ?? [];
    const draft = rows.find((r) => r.id === "draft");
    const published = rows.find((r) => r.id === "published");
    return {
      draft: mergeContent(draft?.data ?? published?.data ?? {}),
      published: mergeContent(published?.data ?? {}),
      draftUpdatedAt: draft?.updated_at ?? null,
      publishedUpdatedAt: published?.updated_at ?? null,
    };
  });

export const saveDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { content: SiteContent; section?: string }) => input)
  .handler(async ({ data, context }) => {
    const ctx = context as any;
    await assertAdmin(ctx);
    const { error } = await ctx.supabase
      .from("site_content")
      .upsert({ id: "draft", data: data.content, updated_at: new Date().toISOString(), updated_by: ctx.userId });
    if (error) throw new Error(error.message);
    await ctx.supabase.from("activity_log").insert({
      action: "save_draft",
      section: data.section ?? null,
      actor_email: ctx.claims?.email ?? null,
      created_by: ctx.userId,
    });
    return { ok: true };
  });

export const publishContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { content: SiteContent; label?: string }) => input)
  .handler(async ({ data, context }) => {
    const ctx = context as any;
    await assertAdmin(ctx);
    const now = new Date().toISOString();
    const { error } = await ctx.supabase
      .from("site_content")
      .upsert({ id: "published", data: data.content, updated_at: now, updated_by: ctx.userId });
    if (error) throw new Error(error.message);
    await ctx.supabase
      .from("site_content")
      .upsert({ id: "draft", data: data.content, updated_at: now, updated_by: ctx.userId });
    await ctx.supabase.from("content_versions").insert({
      data: data.content,
      label: data.label ?? `Published ${new Date().toLocaleString()}`,
      created_by: ctx.userId,
    });
    await ctx.supabase.from("activity_log").insert({
      action: "publish",
      actor_email: ctx.claims?.email ?? null,
      created_by: ctx.userId,
    });
    return { ok: true };
  });

export const listVersions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const ctx = context as any;
    await assertAdmin(ctx);
    const { data } = await ctx.supabase
      .from("content_versions")
      .select("id, label, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    return (data ?? []) as { id: string; label: string; created_at: string }[];
  });

export const restoreVersion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    const ctx = context as any;
    await assertAdmin(ctx);
    const { data: version } = await ctx.supabase
      .from("content_versions")
      .select("data")
      .eq("id", data.id)
      .maybeSingle();
    if (!version) throw new Error("Version not found");
    const now = new Date().toISOString();
    await ctx.supabase
      .from("site_content")
      .upsert({ id: "draft", data: version.data, updated_at: now, updated_by: ctx.userId });
    await ctx.supabase.from("activity_log").insert({
      action: "restore_version",
      actor_email: ctx.claims?.email ?? null,
      created_by: ctx.userId,
    });
    return mergeContent(version.data);
  });

export const listActivity = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const ctx = context as any;
    await assertAdmin(ctx);
    const { data } = await ctx.supabase
      .from("activity_log")
      .select("id, action, section, actor_email, created_at")
      .order("created_at", { ascending: false })
      .limit(40);
    return (data ?? []) as { id: string; action: string; section: string | null; actor_email: string | null; created_at: string }[];
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const ctx = context as any;
    const { data } = await ctx.supabase.rpc("has_role", { _user_id: ctx.userId, _role: "admin" });
    return { isAdmin: Boolean(data), email: ctx.claims?.email ?? null };
  });
