import { createFileRoute } from "@tanstack/react-router";
import {
  Navbar, Hero, Intro, WhyBook, FeaturedMoments, Services, PastEvents, MyWorks,
  Testimonials, ContactCta, Footer, FloatingCall,
} from "@/components/site/Sections";
import { ContentProvider, ThemeStyle } from "@/components/site/ContentContext";
import { getPublishedContent } from "@/lib/content.functions";

const isStaticSite = import.meta.env.VITE_STATIC_SITE === "true";

export const Route = createFileRoute("/")({
  loader: () => getPublishedContent(),
  staleTime: isStaticSite ? Infinity : 0,
  shouldReload: !isStaticSite,
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.settings.seo.title ?? "Sayanti Banerjee — Anchor, Actor & Influencer" },
      { name: "description", content: loaderData?.settings.seo.description ?? "Premium event anchoring across India & abroad." },
      { property: "og:title", content: loaderData?.settings.seo.title ?? "Sayanti Banerjee — Anchor, Actor & Influencer" },
      { property: "og:description", content: loaderData?.settings.seo.description ?? "Premium event anchoring across India & abroad." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const content = Route.useLoaderData();
  return (
    <ContentProvider value={content}>
      <ThemeStyle content={content} />
      <div className="min-h-screen bg-background">
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
