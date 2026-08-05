import { createFileRoute } from "@tanstack/react-router";
import { getPublishedContent } from "@/lib/content.functions";
import { ContentProvider, ThemeStyle } from "@/components/site/ContentContext";
import { Navbar, Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/terms")({
  loader: () => getPublishedContent(),
  head: () => ({
    meta: [
      { title: "Terms of Service — Sayanti Banerjee" },
      { name: "description", content: "Terms of service for booking and engaging Sayanti Banerjee for events." },
      { property: "og:title", content: "Terms of Service — Sayanti Banerjee" },
      { property: "og:description", content: "Terms of service for booking and engaging Sayanti Banerjee for events." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const content = Route.useLoaderData();
  return (
    <ContentProvider value={content}>
      <ThemeStyle content={content} />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 pb-20 pt-32">
          <h1 className="font-display text-4xl font-bold">{content.footer.termsLabel}</h1>
          <span className="gold-divider mt-5" />
          <div className="mt-8 whitespace-pre-wrap font-display text-muted-foreground">{content.footer.termsContent}</div>
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}
