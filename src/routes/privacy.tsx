import { createFileRoute } from "@tanstack/react-router";
import { getPublishedContent } from "@/lib/content.functions";
import { ContentProvider, ThemeStyle } from "@/components/site/ContentContext";
import { Navbar, Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/privacy")({
  loader: () => getPublishedContent(),
  staleTime: 0,
  shouldReload: true,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sayanti Banerjee" },
      { name: "description", content: "How enquiry and booking information is collected and handled on this site." },
      { property: "og:title", content: "Privacy Policy — Sayanti Banerjee" },
      { property: "og:description", content: "How enquiry and booking information is collected and handled on this site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const content = Route.useLoaderData();
  return (
    <ContentProvider value={content}>
      <ThemeStyle content={content} />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 pb-20 pt-32">
          <h1 className="font-display text-4xl font-bold">{content.footer.privacyLabel}</h1>
          <span className="gold-divider mt-5" />
          <div className="mt-8 whitespace-pre-wrap font-display text-muted-foreground">{content.footer.privacyContent}</div>
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}
