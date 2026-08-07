import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ContentProvider, ThemeStyle, useContent } from "@/components/site/ContentContext";
import { Navbar, Footer, FloatingCall, ContactCta } from "@/components/site/Sections";
import { ScrollReveal, ScrollRevealGroup, RevealItem } from "@/components/site/ScrollReveal";
import { getPublishedContent } from "@/lib/content.functions";

export const Route = createFileRoute("/past-events")({
  loader: () => getPublishedContent(),
  head: ({ loaderData }) => {
    const name = loaderData?.settings.siteName ?? "Sayanti Banerjee";
    const title = `Past Events Gallery — ${name}`;
    const description =
      "Browse a curated gallery of past events hosted by Sayanti Banerjee — corporate conferences, celebrity nights, award shows and destination weddings.";
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

function Gallery() {
  const { featured, works, pastEvents } = useContent();
  const workItems = works.tabs.flatMap((t) => t.items.map((i) => ({ ...i, tab: t.name })));
  function GalleryCard({ item }: { item: typeof pastEvents.items[0] }) {
    const [imgFailed, setImgFailed] = useState(false);
    const isVideo = item.mediaType === "video" || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(item.mediaUrl);
    return (
      <article className="overflow-hidden rounded-2xl border border-border luxe-card">
        <div className="h-56 w-full bg-muted">
          {isVideo ? (
            <video src={item.mediaUrl} className="h-full w-full object-cover" controls playsInline />
          ) : !imgFailed ? (
            // try rendering image; if it fails show open-in-tab fallback
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={item.mediaUrl}
              alt={item.caption || item.label || "past event"}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[color:var(--gold)] underline">
                Open media in new tab
              </a>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="font-display text-sm font-bold">{item.label}</p>
          <p className="mt-1 text-xs text-muted-foreground">{item.caption}</p>
        </div>
      </article>
    );
  }

  return (
    <main className="px-6 pb-10 pt-32">
      <ScrollReveal>
        <Link
          to="/"
          className="mx-auto inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-black uppercase tracking-widest shadow-[0_0_18px_rgba(255,215,0,0.35)] hover:scale-105 transition-transform"
        >
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <div className="relative">
          <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-8 font-display text-[14vw] leading-[0.85] font-bold text-gold-soft/20 md:text-[10rem]">
            {pastEvents.headingGold}
          </span>

          <h1 className="relative z-10 mt-8 text-center font-display text-4xl font-bold md:text-6xl">
            {pastEvents.headingWhite} <span className="text-gold-gradient">{pastEvents.headingGold}</span>
          </h1>

          <span className="gold-divider mt-5 relative z-10" />

          <p className="mx-auto mt-6 max-w-2xl text-center font-display text-muted-foreground relative z-10">{pastEvents.description}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <h2 className="sr-only">Past Events Gallery</h2>
        <div className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pastEvents.items.map((it) => (
            <RevealItem key={it.id}>
              <GalleryCard item={it} />
            </RevealItem>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <h2 className="mt-24 text-center font-display text-3xl font-bold md:text-4xl">Event Archive</h2>
        <span className="gold-divider mt-5" />
      </ScrollReveal>
      <ScrollRevealGroup className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07} amount={0.15}>
        {pastEvents.archiveItems && pastEvents.archiveItems.length ? (
          pastEvents.archiveItems.map((a) => (
            <RevealItem key={a.id}>
              <article>
                {a.mediaType === "video" || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(a.mediaUrl) ? (
                  <video src={a.mediaUrl} className="h-44 w-full rounded-lg border border-border object-cover" muted playsInline controls={false} />
                ) : (
                  <img src={a.mediaUrl} alt={a.caption} loading="lazy" className="h-44 w-full rounded-lg border border-border object-cover" />
                )}
                <h3 className="mt-3 font-display text-sm font-bold">{a.label}</h3>
                <p className="text-xs text-gold">{a.caption}</p>
              </article>
            </RevealItem>
          ))
        ) : (
          workItems.map((w) => (
            <RevealItem key={w.id}>
              <article>
                <img src={w.thumbUrl} alt={w.title} loading="lazy" className="h-44 w-full rounded-lg border border-border object-cover" />
                <h3 className="mt-3 font-display text-sm font-bold">{w.title}</h3>
                <p className="text-xs text-gold">{w.category || w.tab}</p>
              </article>
            </RevealItem>
          ))
        )}
      </ScrollRevealGroup>

      <ContactCta />
    </main>
  );
}

function PastEventsPage() {
  const content = Route.useLoaderData();
  return (
    <ContentProvider value={content}>
      <ThemeStyle content={content} />
      <div className="min-h-screen bg-background">
        <Navbar />
        <Gallery />
        <Footer />
        <FloatingCall />
      </div>
    </ContentProvider>
  );
}
