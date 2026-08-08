import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as Lucide from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Navbar, Hero, Intro, WhyBook, FeaturedMoments, Services, PastEvents, MyWorks,
  Testimonials, ContactCta, Footer, FloatingCall,
} from "@/components/site/Sections";
import { ContentProvider, ThemeStyle } from "@/components/site/ContentContext";
import { getAdminContent, publishContent } from "@/lib/content.functions";
import { DEFAULT_CONTENT, type SiteContent } from "@/content/site-content";

export const Route = createFileRoute("/_authenticated/admin_/preview")({
  head: () => ({
    meta: [
      { title: "Draft Preview | Anchor Sayanti Admin" },
      { name: "description", content: "Preview unpublished website changes before they go live." },
      { property: "og:title", content: "Draft Preview | Anchor Sayanti Admin" },
      { property: "og:description", content: "Preview unpublished website changes before they go live." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [originalContent, setOriginalContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAdminContent()
      .then((res) => {
        setContent(res.draft);
        setOriginalContent(res.draft);
      })
      .catch(() => {
        setContent(DEFAULT_CONTENT);
        setOriginalContent(DEFAULT_CONTENT);
      });
  }, []);

  const hasUnsavedChanges = content !== null && originalContent !== null && JSON.stringify(content) !== JSON.stringify(originalContent);

  async function handleSaveChanges() {
    if (!content) return;
    setSaving(true);
    try {
      await publishContent({ data: { content } });
      setOriginalContent(content);
      toast.success("Changes saved and published to the live site");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleEditMode() {
    if (!content) return;
    // Store current draft content in sessionStorage for the admin page to retrieve
    sessionStorage.setItem("adminDraftContent", JSON.stringify(content));
    // Navigate back to admin dashboard, maintaining the draft state
    void navigate({ to: "/admin", replace: false });
  }

  if (!content) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">Loading preview...</div>;
  }

  return (
    <ContentProvider value={content}>
      <ThemeStyle content={content} />
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-white px-4 py-3 border-b-2 border-gray-200 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Draft preview — not published yet</span>
            {hasUnsavedChanges && (
              <span className="inline-block h-2 w-2 rounded-full bg-orange-500" title="You have unsaved changes"></span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => void handleSaveChanges()}
              disabled={saving || !hasUnsavedChanges}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <Lucide.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Lucide.Check className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              onClick={() => void handleEditMode()}
              variant="outline"
              className="border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 font-semibold px-4 py-2"
            >
              <Lucide.Edit className="mr-2 h-4 w-4" />
              Edit / Make Changes
            </Button>
          </div>
        </div>
        <Navbar />
        <main>
          <Hero />
          <Intro />
          <WhyBook />
          <FeaturedMoments />
          <Services />
          <PastEvents />
          <MyWorks />
          <Testimonials />
          <ContactCta />
        </main>
        <Footer />
        <FloatingCall />
      </div>
    </ContentProvider>
  );
}
