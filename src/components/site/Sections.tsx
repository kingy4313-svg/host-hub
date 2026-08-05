import { useRef, useState } from "react";
import {
  Clock, Globe, Mic, Instagram, Users, Globe2, ArrowLeft, ArrowRight, Star,
  Calendar, Target, PartyPopper, Heart, Rocket, MessageCircle, Mail, Phone, ArrowUp, Play,
} from "lucide-react";
import heroImg from "@/assets/hero-anchor.jpg";
import eventAwards from "@/assets/event-awards.jpg";
import { CONTACT, featuredMoments, services, testimonials, workTabs, works } from "./data";

const serviceIcons = { Mic, Users, Star, Calendar, Target, PartyPopper, Heart, Rocket };

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-background/40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-xl font-bold tracking-wide">Sayanti Banerjee</a>
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {[["Portfolio", "#works"], ["Past Events", "#past-events"], ["About", "#about"], ["Contact Me", "#contact"]].map(([l, h]) => (
            <li key={l}><a href={h} className="font-display transition-colors hover:text-gold">{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#contact" className="rounded-full border border-border bg-secondary px-5 py-2 text-sm font-medium">Contact</a>
          <a href="#contact" className="btn-gold rounded-full px-5 py-2 text-sm">Login</a>
        </div>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <img src={heroImg} alt="Sayanti Banerjee hosting an event with a microphone" width={1600} height={1200}
        className="absolute inset-0 h-full w-full object-cover object-top" />
      <div className="absolute inset-0 flex items-start justify-center pt-24">
        <div className="text-center">
          <span className="block font-display text-[14vw] leading-[0.85] font-bold text-gold-soft/60 md:text-[10rem]">Anchor</span>
          <span className="-mt-4 block translate-x-[18%] font-display text-[9vw] leading-[0.9] font-bold text-gold-soft/70 md:text-[6rem]">Sayanti</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to top, var(--background), transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: "var(--background)", clipPath: "polygon(0 40%, 50% 0, 100% 40%, 100% 100%, 0 100%)" }} />
    </section>
  );
}

const stats = [
  { icon: Clock, label: "9+ YRS" }, { icon: Globe, label: "INDIA & ABROAD" }, { icon: Mic, label: "900+ EVENTS" },
  { icon: Instagram, label: "36K+ FAMILY" }, { icon: Users, label: "1000+ HAPPY CLIENTS" }, { icon: Globe2, label: "GOOGLE PAGE" },
];

export function Intro() {
  return (
    <section id="about" className="px-6 py-20 text-center">
      <h1 className="font-display text-4xl font-bold md:text-6xl">
        Anchor <span className="text-gold">★</span> Actor <span className="text-gold">★</span> Influencer
      </h1>
      <p className="mx-auto mt-6 max-w-3xl font-display text-lg text-muted-foreground">
        Journalist to Influencer, Actor and Anchor... Journey of Life Must Go ON...
      </p>
      <p className="mx-auto mt-2 max-w-3xl font-display text-lg text-muted-foreground">
        I bring stories to life on stage — with poise, spontaneity, and presence that holds the attention.
      </p>
      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-y-12">
        {stats.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <span className="flex size-14 items-center justify-center rounded-full border border-gold/50">
              <Icon className="size-6 text-gold" />
            </span>
            <span className="font-display text-sm font-bold tracking-wide text-gold">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const reasons = [
  { title: "Emotion Over Script", text: "Your event deserves real connection, not robotic hosting." },
  { title: "Energy That Lifts the Attention", text: "From shy crowds to wild parties — I match your vibe." },
  { title: "Flawless Stage Flow", text: "I handle last-minute changes with calm confidence." },
];

export function WhyBook() {
  return (
    <section className="px-6 py-20">
      <h2 className="text-center font-display text-4xl font-bold md:text-5xl">Why People Book Me</h2>
      <span className="gold-divider mt-5" />
      <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
        {reasons.map((r) => (
          <article key={r.title} className="luxe-card p-8 text-center transition-shadow hover:shadow-[0_0_40px_-10px_var(--gold-deep)]">
            <span className="mx-auto block h-[3px] w-14" style={{ background: "var(--gradient-gold)" }} />
            <h3 className="mt-7 font-display text-2xl text-gold">{r.title}</h3>
            <p className="mt-4 font-display text-muted-foreground">{r.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FeaturedMoments() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  return (
    <section className="py-20">
      <h2 className="text-center font-display text-4xl font-bold md:text-5xl">
        Featured <span className="text-gold-gradient">Moments</span>
      </h2>
      <span className="gold-divider mt-5" />
      <div className="mx-auto mt-10 flex max-w-6xl justify-between px-6">
        <button onClick={() => scroll(-1)} aria-label="Previous" className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold">
          <ArrowLeft className="size-5" />
        </button>
        <button onClick={() => scroll(1)} aria-label="Next" className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold">
          <ArrowRight className="size-5" />
        </button>
      </div>
      <div ref={ref} className="no-scrollbar mt-6 flex snap-x gap-6 overflow-x-auto px-6 pb-4 md:px-[max(1.5rem,calc(50vw-32rem))]">
        {featuredMoments.map((m, i) => (
          <figure key={i} className="relative w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border">
            <img src={m.img} alt={m.caption} loading="lazy" width={720} height={1080} className="h-[440px] w-full object-cover" />
            <figcaption className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 to-transparent p-4 text-center font-display text-sm font-bold">
              {m.label}
            </figcaption>
            <p className="absolute inset-x-4 bottom-4 rounded-md bg-background/80 p-2 text-center text-xs font-medium">{m.caption}</p>
            <Instagram className="absolute right-4 top-14 size-8 text-gold" />
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="px-6 py-20">
      <h2 className="text-center font-display text-4xl font-bold md:text-5xl">
        My <span className="text-gold-gradient">Services</span>
      </h2>
      <span className="gold-divider mt-5" />
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-8">
        {services.map((s) => {
          const Icon = serviceIcons[s.icon];
          return (
            <div key={s.label} className="flex flex-col items-center gap-3 text-center">
              <span className="flex size-12 items-center justify-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
                <Icon className="size-5 text-primary-foreground" />
              </span>
              <span className="font-display text-sm">{s.label}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-14 text-center text-sm text-muted-foreground">Trusted by clients in Mumbai, Goa, Pune, Delhi & Kolkata.</p>
    </section>
  );
}

export function PastEvents() {
  return (
    <section id="past-events" className="px-6 py-20 text-center">
      <h2 className="font-display text-4xl font-bold md:text-5xl">
        Go Through Our <span className="text-gold-gradient">Past Events</span>
      </h2>
      <span className="gold-divider mt-5" />
      <p className="mx-auto mt-8 max-w-2xl font-display text-muted-foreground">
        Swipe through our collection of memorable events, each card representing a unique moment captured in time.
      </p>
      <div className="relative mx-auto mt-12 w-full max-w-md">
        <div className="absolute inset-x-6 -bottom-3 h-6 rounded-b-2xl bg-card/60" />
        <div className="absolute inset-x-3 -bottom-1.5 h-6 rounded-b-2xl bg-card/80" />
        <figure className="relative overflow-hidden rounded-2xl border border-border">
          <img src={eventAwards} alt="Doctor's Day Celebration 2025 hosting" loading="lazy" width={720} height={1080} className="h-64 w-full object-cover" />
        </figure>
      </div>
      <a href="#works" className="btn-gold mt-12 inline-block rounded-md px-8 py-3 font-display">Explore More</a>
    </section>
  );
}

export function MyWorks() {
  const [tab, setTab] = useState<string>(workTabs[0]);
  return (
    <section id="works" className="px-6 py-20">
      <h2 className="text-center font-display text-4xl font-bold md:text-5xl">My Works</h2>
      <span className="gold-divider mt-5" />
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {workTabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-2 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === t ? "border-b-2 border-gold text-gold" : "text-foreground/80 hover:text-gold"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide">{tab}</h3>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {works[tab].map((w) => (
            <article key={w.title}>
              <div className="relative overflow-hidden rounded-lg border border-border">
                <img src={w.img} alt={w.title} loading="lazy" width={720} height={1080} className="h-48 w-full object-cover" />
                <span className="absolute bottom-2 right-2 rounded bg-background/85 px-2 py-0.5 text-xs">{w.duration}</span>
                <Play className="absolute inset-0 m-auto size-10 text-gold opacity-80" />
              </div>
              <h4 className="mt-3 font-display text-sm font-bold">{w.title}</h4>
              <p className="text-xs text-gold">{tab}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialRow({ items, reverse }: { items: typeof testimonials; reverse?: boolean }) {
  return (
    <div className="overflow-hidden">
      <div className="marquee-track flex w-max gap-6" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {[...items, ...items].map((t, i) => (
          <article key={i} className="luxe-card w-[300px] shrink-0 p-5">
            <h4 className="font-display text-sm font-bold">{t.name}</h4>
            <p className="text-xs text-gold">{t.role}</p>
            <p className="mt-4 font-display text-sm text-muted-foreground">{t.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20">
      <h2 className="text-center font-display text-4xl font-bold md:text-5xl">
        Loved by <span className="text-gold-gradient">Community</span>
      </h2>
      <p className="mt-4 text-center text-sm text-muted-foreground">What our clients say about our services</p>
      <p className="mt-2 text-center text-xs text-gold">Hover over testimonials to pause scrolling</p>
      <div className="mt-6 text-center">
        <a href="#contact" className="btn-gold inline-block rounded-md px-6 py-2 text-sm">Share Your Experience</a>
      </div>
      <div className="mt-12 space-y-6">
        <TestimonialRow items={testimonials.slice(0, 4)} />
        <TestimonialRow items={testimonials.slice(4, 8)} reverse />
        <TestimonialRow items={testimonials.slice(8, 12)} />
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24 text-center">
      <span className="absolute left-[8%] top-1/3 size-1.5 rounded-full bg-gold" />
      <span className="absolute right-[10%] top-1/2 size-1 rounded-full bg-gold/70" />
      <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
        Let's Light Up Your Event<br /><span className="text-gold-gradient">Together</span>
      </h2>
      <span className="gold-divider mt-6" />
      <p className="mt-8 font-display text-lg text-muted-foreground">and create everlasting memories.......</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center gap-2 rounded-md px-7 py-3 font-display">
          <MessageCircle className="size-4" /> WhatsApp Now
        </a>
        <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 rounded-md border border-gold/50 px-7 py-3 font-display text-gold">
          <Mail className="size-4" /> Email
        </a>
        <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-md border border-gold/50 px-7 py-3 font-display text-gold">
          <Phone className="size-4" /> Call
        </a>
      </div>
      <div className="luxe-card mx-auto mt-14 max-w-2xl p-6">
        <p className="font-display text-muted-foreground">Ready to connect? Reach out directly:</p>
        <p className="mt-3 text-sm">
          <a href={`mailto:${CONTACT.email}`} className="text-gold underline-offset-4 hover:underline">{CONTACT.email}</a>
          <span className="mx-3 text-gold">•</span>
          <a href={CONTACT.phoneHref} className="text-gold underline-offset-4 hover:underline">{CONTACT.phone}</a>
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-6 pb-10">
      <div className="pb-14 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
          <span className="size-4 rounded-full bg-background" />
        </span>
        <p className="mt-4 font-display italic text-gold">"Your story deserves the perfect voice."</p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-border pt-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl text-gold">Sayanti Banerjee</h3>
          <p className="mt-4 font-display text-sm text-muted-foreground">Crafted with care to leave your audience smiling.</p>
          <p className="mt-4 text-sm text-gold">Trusted in: Mumbai • Goa • Pune • Delhi • Kolkata</p>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold">Quick Links</h4>
          <ul className="mt-4 space-y-2 font-display text-sm text-muted-foreground">
            <li><a href="#about" className="hover:text-gold">About</a></li>
            <li><a href="#services" className="hover:text-gold">Services</a></li>
            <li><a href="#contact" className="hover:text-gold">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold">Get in Touch</h4>
          <ul className="mt-4 space-y-2 font-display text-sm text-muted-foreground">
            <li><a href={CONTACT.phoneHref} className="hover:text-gold">{CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-gold">{CONTACT.email}</a></li>
            <li><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="hover:text-gold">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <div className="flex gap-6 font-display text-sm text-muted-foreground">
          <a href="#top" className="hover:text-gold">Terms of Service</a>
          <a href="#top" className="hover:text-gold">Privacy Policy</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-gold">
            <Instagram className="size-5" />
          </a>
          <a href="#top" aria-label="Back to top" className="flex size-8 items-center justify-center rounded-full border border-gold/40 text-gold">
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">© 2024 Sayanti Banerjee. All rights reserved.</p>
    </footer>
  );
}

export function FloatingCall() {
  return (
    <a href={CONTACT.phoneHref} aria-label="Call now"
      className="btn-gold fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full">
      <Phone className="size-6" />
    </a>
  );
}
