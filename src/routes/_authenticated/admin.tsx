import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import * as Lucide from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ADMIN_SECTIONS } from "@/components/admin/SectionEditors";
import { getAdminContent, saveDraft, publishContent } from "@/lib/content.functions";
import { DEFAULT_CONTENT, type SiteContent } from "@/content/site-content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Content Dashboard | Anchor Sayanti Admin" },
      { name: "description", content: "Manage every section of the Anchor Sayanti website from one dashboard." },
      { property: "og:title", content: "Content Dashboard | Anchor Sayanti Admin" },
      { property: "og:description", content: "Manage every section of the Anchor Sayanti website from one dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function Nav({ active, onSelect }: { active: string; onSelect: (key: string) => void }) {
  return (
    <nav className="space-y-1">
      {ADMIN_SECTIONS.map((s) => {
        const Icon = (Lucide as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] ?? Lucide.Circle;
        return (
          <button
            key={s.key}
            onClick={() => onSelect(s.key)}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
              active === s.key ? "bg-primary/10 font-medium text-primary" : "hover:bg-muted"
            }`}
          >
            <Icon className="h-4 w-4" />
            {s.label}
          </button>
        );
      })}
    </nav>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [active, setActive] = useState(ADMIN_SECTIONS[0]!.key);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draftOnly, setDraftOnly] = useState(false);
  const [publishedUpdatedAt, setPublishedUpdatedAt] = useState<string | null>(null);
  const [draftUpdatedAt, setDraftUpdatedAt] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getAdminContent()
      .then((res) => {
        if (!cancelled) {
          setContent(res.draft);
          setDraftUpdatedAt(res.draftUpdatedAt);
          setPublishedUpdatedAt(res.publishedUpdatedAt);
        }
      })
      .catch(() => toast.error("Could not load content"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const section = useMemo(() => ADMIN_SECTIONS.find((s) => s.key === active) ?? ADMIN_SECTIONS[0]!, [active]);

  const patch: <K extends keyof SiteContent>(key: K, value: Partial<SiteContent[K]>) => void = (key, value) =>
    setContent((prev) => ({ ...prev, [key]: { ...prev[key], ...value } }));

  async function save() {
    setSaving(true);
    try {
      console.log("admin.save: saving content (preview to console)", content);
      const res = await saveDraft({ data: { content, section: section.label } });
      console.log("admin.save: saveDraft response", res);
      if (!draftOnly) await publishContent({ data: { content } });
      toast.success(draftOnly ? "Draft saved" : "Saved — live on the site");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/login", replace: true });
  }

  const sidebar = <Nav active={active} onSelect={(k) => { setActive(k); setMobileOpen(false); }} />;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-white px-4 py-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="md:hidden rounded-xl border border-blue-300 bg-white px-5 py-2.5 text-blue-600 shadow-sm"
              aria-label="Open menu"
            >
              <Lucide.Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto p-4">
            <p className="mb-3 text-sm font-semibold">Sections</p>
            {sidebar}
          </SheetContent>
        </Sheet>

        <h1 className="text-base font-semibold">Content Dashboard</h1>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden flex-col gap-1 text-xs text-neutral-600 sm:flex">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={draftOnly} onChange={(e) => setDraftOnly(e.target.checked)} />
              Save as draft only
            </label>
            <p className="text-[11px] text-neutral-500">
              When checked, changes are saved in draft only and will not update the live site until you save with this box unchecked.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-xl border border-blue-300 bg-white px-5 py-2.5 text-blue-600 shadow-sm"
          >
            <Link to="/admin/preview">Preview</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl border border-blue-300 bg-white px-5 py-2.5 text-blue-600 shadow-sm"
            onClick={() => void logout()}
          >
            <Lucide.LogOut className="mr-1 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r p-4 md:block">{sidebar}</aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Lucide.Loader2 className="h-4 w-4 animate-spin" /> Loading content...
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-6">
              <div>
                <h2 className="text-lg font-semibold">{section.label}</h2>
                <p className="text-sm text-neutral-500">Edits appear on the live site as soon as you save.</p>
              </div>

              <section.Editor content={content} patch={patch} />

              <div className="sticky bottom-0 -mx-4 border-t bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
                <Button onClick={() => void save()} disabled={saving}>
                  {saving ? <Lucide.Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
