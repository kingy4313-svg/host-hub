import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Navbar, Hero, Intro, WhyBook, FeaturedMoments, Services, PastEvents, MyWorks,
  Testimonials, ContactCta, Footer, FloatingCall,
} from "@/components/site/Sections";
import { ContentProvider, ThemeStyle } from "@/components/site/ContentContext";
import { getAdminContent } from "@/lib/content.functions";
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
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    getAdminContent().then((res) => setContent(res.draft)).catch(() => setContent(DEFAULT_CONTENT));
  }, []);

  if (!content) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">Loading preview...</div>;
  }

  return (
    <ContentProvider value={content}>
      <ThemeStyle content={content} />
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 flex items-center justify-between bg-[color:var(--gold)] px-4 py-2 text-xs font-medium text-black">
          <span>Draft preview — not published yet</span>
          <Link to="/admin" className="underline">Back to dashboard</Link>
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
