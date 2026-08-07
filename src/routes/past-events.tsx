import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
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

  return (
    <main className="px-6 pb-10 pt-32">
      <ScrollReveal>
        <Link to="/" className="mx-auto flex max-w-6xl items-center gap-2 font-display text-sm text-muted-foreground hover:text-gold">
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <h1 className="mt-8 text-center font-display text-4xl font-bold md:text-6xl">
          {pastEvents.headingWhite} <span className="text-gold-gradient">{pastEvents.headingGold}</span>
        </h1>
        <span className="gold-divider mt-5" />
        <p className="mx-auto mt-6 max-w-2xl text-center font-display text-muted-foreground">{pastEvents.description}</p>
      </ScrollReveal>

      <ScrollRevealGroup className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09} amount={0.15}>
        {featured.items.map((m) => (
          <RevealItem key={m.id}>
            <figure className="overflow-hidden rounded-2xl border border-border">
              {m.mediaType === "video" ? (
                <video src={m.mediaUrl} className="h-64 w-full object-cover" muted loop playsInline autoPlay />
              ) : (
                <img src={m.mediaUrl} alt={m.caption} loading="lazy" className="h-64 w-full object-cover" />
              )}
              <figcaption className="p-4">
                <p className="font-display text-sm font-bold">{m.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.caption}</p>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </ScrollRevealGroup>

      <ScrollReveal>
        <h2 className="mt-24 text-center font-display text-3xl font-bold md:text-4xl">Event Archive</h2>
        <span className="gold-divider mt-5" />
      </ScrollReveal>
      <ScrollRevealGroup className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07} amount={0.15}>
        {workItems.map((w) => (
          <RevealItem key={w.id}>
            <article>
              <img src={w.thumbUrl} alt={w.title} loading="lazy" className="h-44 w-full rounded-lg border border-border object-cover" />
              <h3 className="mt-3 font-display text-sm font-bold">{w.title}</h3>
              <p className="text-xs text-gold">{w.category || w.tab}</p>
            </article>
          </RevealItem>
        ))}
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
