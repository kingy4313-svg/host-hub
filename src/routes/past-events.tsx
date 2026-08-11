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

function GalleryCard({ item, index }: { item: PastEventItem; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const mediaUrl = item.mediaUrl?.trim() ?? "";
  const isVideo = mediaUrl && (item.mediaType === "video" || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(mediaUrl));
  const loadingAttr = index === 0 ? "eager" : "lazy" as const;

  return (
    <article className="overflow-hidden rounded-2xl border border-border luxe-card bg-card">
      <div className="w-full bg-muted">
        {mediaUrl ? (
          isVideo ? (
            <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
              <video src={mediaUrl} className="h-full w-full object-contain block" controls playsInline />
            </div>
          ) : !imgFailed ? (
            <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
              <img
                src={mediaUrl}
                alt={item.caption || item.label || "Past event"}
                loading={loadingAttr}
                decoding="async"
                className="h-full w-full object-contain block"
                onError={() => setImgFailed(true)}
              />
            </div>
          ) : (
            <div className="flex h-56 items-center justify-center">
              <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[color:var(--gold)] underline">
                Open media in new tab
              </a>
            </div>
          )
        ) : (
          <div className="flex h-56 items-center justify-center text-sm text-muted-foreground">No media yet</div>
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
        <main className="px-6 pb-14 pt-24">
          <ScrollReveal>
            <div className="mx-auto max-w-6xl">
              <div className="flex justify-center sm:justify-start">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black shadow-[0_20px_60px_rgba(212,169,71,0.35)] transition-transform hover:-translate-y-0.5"
                >
                  <ArrowLeft className="size-4" /> Back to home
                </Link>
              </div>
              <div className="mt-12 text-center">
                <h1 className="font-display text-[clamp(3.5rem,7.5vw,6.5rem)] font-black uppercase tracking-[-0.04em] text-foreground leading-[0.95] md:text-[clamp(4rem,6vw,8rem)]">
                  {pastEvents.headingWhite} <span className="text-gold-gradient">{pastEvents.headingGold}</span>
                </h1>
                <div className="mx-auto mt-8 h-1.5 w-24 rounded-full bg-gold" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="sr-only">Past Events Gallery</h2>
            {pastEvents.items.length > 0 ? (
              <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pastEvents.items.map((item, index) => (
                  <RevealItem key={item.id}>
                    <GalleryCard item={item} index={index} />
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
