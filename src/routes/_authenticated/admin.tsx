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
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-all ${
              active === s.key 
                ? "bg-blue-100 text-blue-900 shadow-sm border-l-4 border-blue-600" 
                : "text-gray-700 hover:bg-gray-100 border-l-4 border-transparent"
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    
    // Check if there's draft content from preview mode
    const savedDraft = sessionStorage.getItem("adminDraftContent");
    if (savedDraft) {
      try {
        const restoredContent = JSON.parse(savedDraft);
        setContent(restoredContent);
        sessionStorage.removeItem("adminDraftContent");
        setLoading(false);
        return;
      } catch (e) {
        console.error("Failed to restore draft from sessionStorage:", e);
        sessionStorage.removeItem("adminDraftContent");
      }
    }
    
    // Otherwise load from server
    getAdminContent()
      .then((res) => {
        if (!cancelled) {
          setContent(res.draft);
          toast.success("Content loaded successfully");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to load content:", err);
          toast.error(`Could not load content: ${err instanceof Error ? err.message : "Unknown error"}`);
          // Content will use DEFAULT_CONTENT already set in state
        }
      })
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
      await saveDraft({ data: { content, section: section.label } });
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
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden border-gray-300 text-gray-700 hover:bg-gray-100" aria-label="Open menu">
              <Lucide.Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto p-4 bg-white">
            <p className="mb-3 text-sm font-semibold text-gray-900">Sections</p>
            {sidebar}
          </SheetContent>
        </Sheet>

        <h1 className="text-base font-bold text-gray-900">Content Dashboard</h1>

        <div className="ml-auto flex items-center gap-3">
          <label className="hidden items-center gap-2 text-xs text-gray-600 sm:flex hover:text-gray-800 cursor-pointer">
            <input type="checkbox" checked={draftOnly} onChange={(e) => setDraftOnly(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            Save as draft only
          </label>
          <Button asChild variant="outline" size="sm" className="border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100">
            <Link to="/admin/preview">Preview</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100" onClick={() => void logout()}>
            <Lucide.LogOut className="mr-1 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-gray-50 p-4 md:block">{sidebar}</aside>

        <main className="min-w-0 flex-1 bg-gray-50 p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lucide.Loader2 className="h-4 w-4 animate-spin" /> Loading content...
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">{section.label}</h2>
                <p className="text-sm text-gray-600 mt-1">Edits appear on the live site as soon as you save.</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <section.Editor content={content} patch={patch} />
              </div>

              <div className="sticky bottom-0 z-20 -mx-4 border-t border-gray-300 bg-white px-4 py-4 shadow-lg sm:-mx-6 sm:px-6">
                <Button 
                  onClick={() => void save()} 
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? <Lucide.Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
