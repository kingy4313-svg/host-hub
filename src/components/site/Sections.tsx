import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, Play, MessageCircle, Mail, Phone, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useContent, Icon } from "./ContentContext";
import { ScrollReveal, ScrollRevealGroup, RevealItem, CountUp } from "./ScrollReveal";
import { AnimatedIconGrid } from "./AnimatedIconGrid";
import { VideoPlayer } from "./VideoPlayer";

const mailto = (email: string) => `mailto:${email}`;
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

function Media({
  url, type, alt, className,
}: { url: string; type: string; alt: string; className?: string | undefined }) {
  if (type === "video") {
    return <video src={url} className={className} autoPlay muted loop playsInline />;
  }
  return <img src={url} alt={alt} loading="lazy" className={className} />;
}

export function Navbar() {
  const { navbar, settings } = useContent();
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-background/40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="logo-glow flex items-center gap-3 font-display text-xl font-bold tracking-wide">
          {settings.logoUrl ? <img src={settings.logoUrl} alt={navbar.logoText} className="h-9 w-auto" /> : null}
          {navbar.logoText}
        </a>
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {navbar.items.map((i) => (
            <li key={i.id}><a href={i.href} className="font-display transition-colors hover:text-gold">{i.label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {navbar.contactText ? (
            <a href={navbar.contactHref} className="rounded-full border border-border bg-secondary px-5 py-2 text-sm font-medium">
              {navbar.contactText}
            </a>
          ) : null}
          {navbar.showLogin ? (
            <Link to={navbar.loginHref} className="btn-gold rounded-full px-5 py-2 text-sm">{navbar.loginText}</Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
}

export function Hero() {
  const { hero } = useContent();
  return (
    <section id="top" className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <Media url={hero.mediaUrl} type={hero.mediaType} alt={`${hero.line1} ${hero.line2}`}
        className="absolute inset-0 h-full w-full object-cover object-top" />
      <div className="absolute inset-0 flex items-start justify-center pt-24">
        <ScrollRevealGroup className="text-center" stagger={0.14} amount={0.1}>
          <RevealItem>
            <span className="block font-display text-[14vw] leading-[0.85] font-bold text-gold-soft/60 md:text-[10rem]">{hero.line1}</span>
          </RevealItem>
          <RevealItem>
            <span className="-mt-4 block translate-x-[18%] font-display text-[9vw] leading-[0.9] font-bold text-gold-soft/70 md:text-[6rem]">{hero.line2}</span>
          </RevealItem>
          {hero.subheading ? (
            <RevealItem>
              <p className="mt-6 font-display text-lg text-foreground/90">{hero.subheading}</p>
            </RevealItem>
          ) : null}
          {hero.buttons.length ? (
            <RevealItem>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {hero.buttons.map((b) => (
                  <a key={b.id} href={b.href} className="btn-gold rounded-md px-7 py-3 font-display">{b.text}</a>
                ))}
              </div>
            </RevealItem>
          ) : null}
        </ScrollRevealGroup>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to top, var(--background), transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: "var(--background)", clipPath: "polygon(0 40%, 50% 0, 100% 40%, 100% 100%, 0 100%)" }} />
    </section>
  );
}

export function Intro() {
  const { intro } = useContent();
  return (
    <section id="about" className="px-6 py-20 text-center">
      <ScrollRevealGroup stagger={0.12}>
        <RevealItem>
          <h1 className="font-display text-4xl font-bold md:text-6xl">
            {intro.heading.split("★").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 ? <span className="text-gold">★</span> : null}
              </span>
            ))}
          </h1>
        </RevealItem>
        {intro.taglines.map((t) => (
          <RevealItem key={t.id}>
            <p className="mx-auto mt-4 max-w-3xl font-display text-lg text-muted-foreground">{t.text}</p>
          </RevealItem>
        ))}
      </ScrollRevealGroup>
      <AnimatedIconGrid
        className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-y-12"
        itemClassName="flex flex-col items-center gap-3"
        items={intro.stats.map((s) => ({
          id: s.id,
          badge: s.iconImageUrl ? (
            <img src={s.iconImageUrl} alt="" className="size-6" />
          ) : (
            <Icon name={s.icon} className="size-6 text-gold" />
          ),
          label: (
            <span className="font-display text-sm font-bold tracking-wide text-gold">
              {s.value ? <CountUp value={s.value} /> : null}
              {s.value && s.label ? " " : null}
              {s.label}
            </span>
          ),
        }))}
      />
    </section>
  );
}

export function WhyBook() {
  const { whyBook } = useContent();
  return (
    <section className="px-6 py-20">
      <ScrollReveal>
        <h2 className="text-center font-display text-4xl font-bold md:text-5xl">{whyBook.heading}</h2>
        {whyBook.showDivider ? <span className="gold-divider mt-5" /> : null}
      </ScrollReveal>
      <ScrollRevealGroup className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3" stagger={0.13} amount={0.2}>
        {whyBook.cards.map((r) => (
          <RevealItem key={r.id}>
            <article className="luxe-card h-full p-8 text-center transition-shadow hover:shadow-[0_0_40px_-10px_var(--gold-deep)]">
              <span className="mx-auto block h-[3px] w-14" style={{ background: "var(--gradient-gold)" }} />
              <h3 className={`mt-7 font-display text-2xl ${r.goldTitle ? "text-gold" : "text-foreground"}`}>{r.title}</h3>
              <p className="mt-4 font-display text-muted-foreground">{r.text}</p>
            </article>
          </RevealItem>
        ))}
      </ScrollRevealGroup>
    </section>
  );
}

export function FeaturedMoments() {
  const { featured } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  return (
    <section className="py-20">
      <h2 className="text-center font-display text-4xl font-bold md:text-5xl">
        {featured.headingWhite} <span className="text-gold-gradient">{featured.headingGold}</span>
      </h2>
      <span className="gold-divider mt-5" />
      {featured.showArrows ? (
        <div className="mx-auto mt-10 flex max-w-6xl justify-between px-6">
          <button onClick={() => scroll(-1)} aria-label="Previous" className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold">
            <ArrowLeft className="size-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next" className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold">
            <ArrowRight className="size-5" />
          </button>
        </div>
      ) : null}
      <div ref={ref} className="no-scrollbar mt-6 flex snap-x gap-6 overflow-x-auto px-6 pb-4 md:px-[max(1.5rem,calc(50vw-32rem))]">
        {featured.items.map((m) => (
          <figure key={m.id} className="relative w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border">
            <Media url={m.mediaUrl} type={m.mediaType} alt={m.caption} className="h-[440px] w-full object-cover" />
            <figcaption className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 to-transparent p-4 text-center font-display text-sm font-bold">
              {m.label}
            </figcaption>
            <p className="absolute inset-x-4 bottom-4 rounded-md bg-background/80 p-2 text-center text-xs font-medium">{m.caption}</p>
            {m.overlayIcon ? (
              <a href={m.overlayLink || "#"} target="_blank" rel="noreferrer" className="absolute right-4 top-14">
                <Icon name={m.overlayIcon} className="size-8 text-gold" />
              </a>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  const { services } = useContent();
  return (
    <section id="services" className="px-6 py-20">
      <ScrollReveal>
        <h2 className="text-center font-display text-4xl font-bold md:text-5xl">
          {services.headingWhite} <span className="text-gold-gradient">{services.headingGold}</span>
        </h2>
        <span className="gold-divider mt-5" />
      </ScrollReveal>
      <AnimatedIconGrid
        filled
        stagger={0.09}
        className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-8"
        itemClassName="service-tile flex flex-col items-center gap-3 text-center"
        items={services.items.map((s) => ({
          id: s.id,
          badge: s.iconImageUrl ? (
            <img src={s.iconImageUrl} alt="" className="size-5" />
          ) : (
            <Icon name={s.icon} className="size-5 text-primary-foreground" />
          ),
          label: s.href ? (
            <a href={s.href} className="font-display text-sm">{s.label}</a>
          ) : (
            <span className="font-display text-sm">{s.label}</span>
          ),
        }))}
      />
      {services.trustLine ? (
        <ScrollReveal>
          <p className="mt-14 text-center text-sm text-muted-foreground">{services.trustLine}</p>
        </ScrollReveal>
      ) : null}
    </section>
  );
}

export function PastEvents() {
  const { pastEvents } = useContent();
  const href = pastEvents.buttonHref && pastEvents.buttonHref !== "#works" ? pastEvents.buttonHref : "/past-events";
  const internal = href.startsWith("/");
  return (
    <section id="past-events" className="px-6 py-20 text-center">
      <ScrollReveal>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          {pastEvents.headingWhite} <span className="text-gold-gradient">{pastEvents.headingGold}</span>
        </h2>
        <span className="gold-divider mt-5" />
        <p className="mx-auto mt-8 max-w-2xl font-display text-muted-foreground">{pastEvents.description}</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="relative mx-auto mt-12 w-full max-w-md">
          <div className="absolute inset-x-6 -bottom-3 h-6 rounded-b-2xl bg-card/60" />
          <div className="absolute inset-x-3 -bottom-1.5 h-6 rounded-b-2xl bg-card/80" />
          <figure className="relative overflow-hidden rounded-2xl border border-border">
            <Media url={pastEvents.mediaUrl} type={pastEvents.mediaType} alt={pastEvents.headingGold} className="h-64 w-full object-cover" />
          </figure>
        </div>
      </ScrollReveal>
      {pastEvents.buttonText ? (
        internal ? (
          <Link to={href} className="btn-gold mt-12 inline-block rounded-md px-8 py-3 font-display">{pastEvents.buttonText}</Link>
        ) : (
          <a href={href} className="btn-gold mt-12 inline-block rounded-md px-8 py-3 font-display">{pastEvents.buttonText}</a>
        )
      ) : null}
    </section>
  );
}

export function MyWorks() {
  const { works } = useContent();
  const [tabId, setTabId] = useState<string>(works.tabs[0]?.id ?? "");
  const [playing, setPlaying] = useState<{ url: string; title: string } | null>(null);
  const active = works.tabs.find((t) => t.id === tabId) ?? works.tabs[0];
  return (
    <section id="works" className="px-6 py-20">
      <ScrollReveal>
        <h2 className="text-center font-display text-4xl font-bold md:text-5xl">{works.heading}</h2>
        <span className="gold-divider mt-5" />
      </ScrollReveal>
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {works.tabs.map((t) => (
          <button key={t.id} onClick={() => setTabId(t.id)}
            className={`pb-2 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
              active?.id === t.id ? "border-b-2 border-gold text-gold" : "text-foreground/80 hover:text-gold"}`}>
            {t.name}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide">{active?.name}</h3>
        <ScrollRevealGroup key={active?.id} className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} amount={0.15}>
          {(active?.items ?? []).map((w) => {
            const card = (
              <>
                <div className="relative overflow-hidden rounded-lg border border-border">
                  <img src={w.thumbUrl} alt={w.title} loading="lazy" className="h-48 w-full object-cover" />
                  {w.duration ? <span className="absolute bottom-2 right-2 rounded bg-background/85 px-2 py-0.5 text-xs">{w.duration}</span> : null}
                  <Play className="absolute inset-0 m-auto size-10 text-gold opacity-80" />
                </div>
                <h4 className="mt-3 font-display text-sm font-bold">{w.title}</h4>
                <p className="text-xs text-gold">{w.category || active?.name}</p>
              </>
            );
            return (
              <RevealItem key={w.id}>
                {w.videoUrl ? (
                  <button
                    type="button"
                    onClick={() => setPlaying({ url: w.videoUrl, title: w.title })}
                    className="block w-full text-left"
                  >
                    {card}
                  </button>
                ) : (
                  <article>{card}</article>
                )}
              </RevealItem>
            );
          })}
        </ScrollRevealGroup>
      </div>
      {playing ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setPlaying(null)}
        >
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="font-display text-sm text-gold">{playing.title}</p>
              <button onClick={() => setPlaying(null)} aria-label="Close video" className="text-muted-foreground hover:text-gold">
                <X className="size-5" />
              </button>
            </div>
            <VideoPlayer url={playing.url} title={playing.title} autoPlay />
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function Testimonials() {
  const { testimonials } = useContent();
  const items = testimonials.items;
  const size = Math.max(1, Math.ceil(items.length / 3));
  const rows = [items.slice(0, size), items.slice(size, size * 2), items.slice(size * 2)];
  return (
    <section className="py-20">
      <h2 className="text-center font-display text-4xl font-bold md:text-5xl">
        {testimonials.headingWhite} <span className="text-gold-gradient">{testimonials.headingGold}</span>
      </h2>
      {testimonials.subtext ? <p className="mt-4 text-center text-sm text-muted-foreground">{testimonials.subtext}</p> : null}
      {testimonials.showHoverNote ? <p className="mt-2 text-center text-xs text-gold">{testimonials.hoverNote}</p> : null}
      {testimonials.buttonText ? (
        <div className="mt-6 text-center">
          <a href={testimonials.buttonHref} className="btn-gold inline-block rounded-md px-6 py-2 text-sm">{testimonials.buttonText}</a>
        </div>
      ) : null}
      <div className="mt-12 space-y-6">
        {rows.map((row, idx) =>
          row.length ? (
            <div key={idx} className="overflow-hidden">
              <div className="marquee-track flex w-max gap-6"
                style={{
                  animationDuration: `${testimonials.rowSpeeds[idx] ?? 45}s`,
                  ...(idx % 2 === 1 ? { animationDirection: "reverse" as const } : {}),
                }}>
                {[...row, ...row].map((t, i) => (
                  <article key={`${t.id}-${i}`} className="luxe-card w-[300px] shrink-0 p-5">
                    <div className="flex items-center gap-3">
                      {t.photoUrl ? <img src={t.photoUrl} alt={t.name} className="size-10 rounded-full object-cover" /> : null}
                      <div>
                        <h4 className="font-display text-sm font-bold">{t.name}</h4>
                        <p className="text-xs text-gold">{t.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 font-display text-sm text-muted-foreground">{t.text}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>
    </section>
  );
}

export function ContactCta() {
  const { contact, settings } = useContent();
  const whatsapp = contact.whatsappHref || settings.whatsapp;
  const email = contact.emailHref || mailto(settings.email);
  const call = contact.callHref || telHref(settings.phone);
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24 text-center">
      <span className="absolute left-[8%] top-1/3 size-1.5 rounded-full bg-gold" />
      <span className="absolute right-[10%] top-1/2 size-1 rounded-full bg-gold/70" />
      <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
        {contact.headingWhite}<br /><span className="text-gold-gradient">{contact.headingGold}</span>
      </h2>
      <span className="gold-divider mt-6" />
      <p className="mt-8 font-display text-lg text-muted-foreground">{contact.subtext}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center gap-2 rounded-md px-7 py-3 font-display">
          <MessageCircle className="size-4" /> {contact.whatsappText}
        </a>
        <a href={email} className="inline-flex items-center gap-2 rounded-md border border-gold/50 px-7 py-3 font-display text-gold">
          <Mail className="size-4" /> {contact.emailText}
        </a>
        <a href={call} className="inline-flex items-center gap-2 rounded-md border border-gold/50 px-7 py-3 font-display text-gold">
          <Phone className="size-4" /> {contact.callText}
        </a>
      </div>
      <div className="luxe-card mx-auto mt-14 max-w-2xl p-6">
        <p className="font-display text-muted-foreground">{contact.boxText}</p>
        <p className="mt-3 text-sm">
          <a href={mailto(settings.email)} className="text-gold underline-offset-4 hover:underline">{settings.email}</a>
          <span className="mx-3 text-gold">•</span>
          <a href={telHref(settings.phone)} className="text-gold underline-offset-4 hover:underline">{settings.phone}</a>
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  const { footer, settings } = useContent();
  const year = new Date().getFullYear();
  const copyright = footer.autoYear ? footer.copyright.replace("{year}", String(year)) : footer.copyright;
  return (
    <footer className="px-6 pb-10">
      <div className="pb-14 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
          <span className="size-4 rounded-full bg-background" />
        </span>
        <p className="mt-4 font-display italic text-gold">"{footer.quote}"</p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-border pt-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl text-gold">{settings.siteName}</h3>
          <p className="mt-4 font-display text-sm text-muted-foreground">{footer.bio}</p>
          {footer.cities.length ? (
            <p className="mt-4 text-sm text-gold">Trusted in: {footer.cities.map((c) => c.text).join(" • ")}</p>
          ) : null}
        </div>
        <div>
          <h4 className="font-display text-lg font-bold">Quick Links</h4>
          <ul className="mt-4 space-y-2 font-display text-sm text-muted-foreground">
            {footer.quickLinks.map((l) => (
              <li key={l.id}><a href={l.href} className="hover:text-gold">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold">{footer.getInTouchHeading}</h4>
          <ul className="mt-4 space-y-2 font-display text-sm text-muted-foreground">
            <li><a href={telHref(settings.phone)} className="hover:text-gold">{settings.phone}</a></li>
            <li><a href={mailto(settings.email)} className="hover:text-gold">{settings.email}</a></li>
            <li><a href={settings.whatsapp} target="_blank" rel="noreferrer" className="hover:text-gold">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <div className="flex gap-6 font-display text-sm text-muted-foreground">
          <Link to="/terms" className="hover:text-gold">{footer.termsLabel}</Link>
          <Link to="/privacy" className="hover:text-gold">{footer.privacyLabel}</Link>
        </div>
        <div className="flex items-center gap-3">
          {settings.socials.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.platform} className="text-muted-foreground hover:text-gold">
              <Icon name={s.platform} className="size-5" />
            </a>
          ))}
          <a href="#top" aria-label="Back to top" className="flex size-8 items-center justify-center rounded-full border border-gold/40 text-gold">
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">{copyright}</p>
    </footer>
  );
}

export function FloatingCall() {
  const { settings } = useContent();
  if (!settings.floatingCall.enabled) return null;
  return (
    <a href={telHref(settings.floatingCall.phone)} aria-label="Call now"
      className="btn-gold fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full">
      <Phone className="size-6" />
    </a>
  );
}
