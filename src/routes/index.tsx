import { createFileRoute } from "@tanstack/react-router";
import {
  Navbar, Hero, Intro, WhyBook, FeaturedMoments, Services, PastEvents, MyWorks,
  Testimonials, ContactCta, Footer, FloatingCall,
} from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sayanti Banerjee — Anchor, Actor & Influencer" },
      { name: "description", content: "Book Sayanti Banerjee, a premium event anchor with 900+ shows across India & abroad — corporate conferences, celebrity events, weddings and live shows." },
      { property: "og:title", content: "Sayanti Banerjee — Anchor, Actor & Influencer" },
      { property: "og:description", content: "Premium event anchoring for corporate conferences, celebrity events, product launches and destination weddings." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
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
  );
}
