import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { PastEventItem } from "@/content/site-content";
import { ContentProvider, ThemeStyle } from "@/components/site/ContentContext";
import { Navbar, Footer, FloatingCall } from "@/components/site/Sections";
import { ScrollReveal, RevealItem } from "@/components/site/ScrollReveal";
import { getPublishedContent } from "@/lib/content.functions";

export const Route = createFileRoute("/past-events")({
  loader: () => getPublishedContent(),
  head: ({ loaderData }) => {
    const name = loaderData?.settings.siteName ?? "Anchor";
    const title = `Past Events Gallery — ${name}`;
    const description =
      "Browse a curated gallery of past events hosted by a premium event anchor — corporate conferences, celebrity nights, award shows and destination weddings.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PastEventsPage,
});

function GalleryCard({ item }: { item: PastEventItem }) {
  const [imgFailed, setImgFailed] = useState(false);
  const isVideo = item.mediaType === "video" || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(item.mediaUrl);

  return (
    <article className="overflow-hidden rounded-2xl border border-border luxe-card bg-card">
      <div className="h-56 w-full bg-muted">
        {item.mediaUrl ? (
          isVideo ? (
            <video src={item.mediaUrl} className="h-full w-full object-cover" controls playsInline />
          ) : !imgFailed ? (
            <img
              src={item.mediaUrl}
              alt={item.caption || item.label || "Past event"}
              loading="lazy"
              className="h-full w-full object-contain"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[color:var(--gold)] underline">
                Open media in new tab
              </a>
            </div>
          )
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No media yet</div>
        )}
      </div>
      <div className="p-4">
        {item.label ? <p className="font-display text-sm font-bold">{item.label}</p> : null}
        <p className="mt-1 text-xs text-muted-foreground">{item.caption}</p>
      </div>
    </article>
  );
}

function PastEventsPage() {
  const content = Route.useLoaderData();
  const pastEvents = content.pastEvents;

  return (
    <ContentProvider value={content}>
      <ThemeStyle content={content} />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="px-6 pb-10 pt-32">
          <ScrollReveal>
            <Link
              to="/"
              className="mx-auto inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-black uppercase tracking-widest shadow-[0_0_18px_rgba(255,215,0,0.35)] hover:scale-105 transition-transform"
            >
              <ArrowLeft className="size-4" /> Back to home
            </Link>
            <div className="relative">
              <h1 className="relative z-10 mt-8 text-center font-display text-4xl font-bold md:text-6xl">
                {pastEvents.headingWhite} <span className="text-gold-gradient">{pastEvents.headingGold}</span>
              </h1>
              <span className="gold-divider mt-5 relative z-10" />
              <p className="mx-auto mt-6 max-w-2xl text-center font-display text-muted-foreground relative z-10">
                {pastEvents.description}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="sr-only">Past Events Gallery</h2>
            {pastEvents.items.length > 0 ? (
              <div className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.items.map((item) => (
                  <RevealItem key={item.id}>
                    <GalleryCard item={item} />
                  </RevealItem>
                ))}
              </div>
            ) : (
              <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-muted p-10 text-center text-muted-foreground">
                No past events have been added yet. Upload images or videos from the admin dashboard to populate this page.
              </div>
            )}
          </ScrollReveal>
        </main>
        <Footer />
        <FloatingCall />
      </div>
    </ContentProvider>
  );
}
