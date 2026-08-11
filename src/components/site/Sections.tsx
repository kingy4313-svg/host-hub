import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, Menu, Pause, Play, Volume2, VolumeX, MessageCircle, Mail, Phone, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useContent, Icon } from "./ContentContext";
import ShareExperienceModal from "./ShareExperienceModal";
import { ScrollReveal, ScrollRevealGroup, RevealItem, CountUp } from "./ScrollReveal";
import { AnimatedIconGrid } from "./AnimatedIconGrid";
import { VideoPlayer, detectVideo } from "./VideoPlayer";
import { Media } from "./Media";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const mailto = (email: string) => `mailto:${email}`;
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

function getVideoThumbnail(url: string) {
  const { kind, id } = detectVideo(url);
  if (kind === "youtube" && id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  if (kind === "vimeo" && id) return `https://vumbnail.com/${id}.jpg`;
  return undefined;
}

function FeaturedMedia({
  url,
  type,
  label,
  className,
}: {
  url: string;
  type: string;
  label: string;
  className?: string;
}) {
  const [showPlayer, setShowPlayer] = useState(false);
  const video = detectVideo(url);
  const isVideo = type === "video" || video.kind !== "unknown";
  const thumbnail = getVideoThumbnail(url);

  if (isVideo && video.kind !== "file") {
    if (!showPlayer) {
      return (
        <button
          type="button"
          className="relative aspect-[9/11] w-full overflow-hidden rounded-xl bg-black"
          onClick={() => setShowPlayer(true)}
        >
          {thumbnail ? (
            <img src={thumbnail} alt={`Play ${label}`} className={`${className ?? ""} absolute inset-0 h-full w-full object-cover`} />
          ) : (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black text-white">Play Video</div>
          )}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/70 text-white">
              <Play className="h-6 w-6" />
            </div>
          </div>
        </button>
      );
    }

    return <VideoPlayer url={url} title={label} className="absolute inset-0 h-full w-full" ratio="aspect-[9/11]" autoPlay={false} />;
  }

  if (isVideo) {
    return <FeaturedVideo url={url} className={`${className} aspect-[9/11]`} />;
  }

  return <Media url={url} type={type} alt={label} className={className} />;
}

function FeaturedVideo({ url, className, style }: { url: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const playVideo = async () => {
    if (!ref.current) return;
    try {
      ref.current.muted = muted;
      await ref.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const pauseVideo = () => {
    if (!ref.current) return;
    ref.current.pause();
    setPlaying(false);
  };

  const togglePlay = async () => {
    if (!ref.current) return;
    if (playing) {
      pauseVideo();
      return;
    }
    await playVideo();
  };

  const toggleMute = () => {
    if (!ref.current) return;
    const nextMuted = !muted;
    ref.current.muted = nextMuted;
    setMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!ref.current) return;
    setCurrentTime(ref.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!ref.current) return;
    setDuration(ref.current.duration);
  };

  const handleSeek = (value: number) => {
    if (!ref.current) return;
    ref.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="relative h-full w-full"
      onPointerEnter={() => {
        if (!isTouchDevice) {
          setShowControls(true);
          playVideo();
        }
      }}
      onPointerLeave={() => {
        if (!isTouchDevice) {
          setShowControls(false);
          pauseVideo();
        }
      }}
      onTouchStart={() => {
        setIsTouchDevice(true);
        setShowControls((current) => !current);
      }}
    >
      <video
        ref={ref}
        src={url}
        className={className}
        style={style}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
        onClick={(event) => {
          event.preventDefault();
          togglePlay();
        }}
      />
      <div className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-black/40 p-3 backdrop-blur-sm transition-opacity duration-200 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                void togglePlay();
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:bg-white/10"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                toggleMute();
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:bg-white/10"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/90">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const { navbar, settings } = useContent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll && current > 100);
      lastScroll = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="mx-auto flex w-full max-w-[1300px] items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="logo-glow text-sm font-display uppercase tracking-[0.35em] text-gold transition-colors hover:text-gold/80 md:text-base">
          {settings.logoUrl ? <img src={settings.logoUrl} alt={navbar.logoText} className="mr-3 inline-block h-8 w-auto align-middle" /> : null}
          <span className="align-middle">{navbar.logoText}</span>
        </Link>

        {/* desktop nav moved to the right-side controls for compact alignment */}

        <div className="hidden items-center gap-3 md:flex">
          <nav className="hidden items-center gap-4 text-xs font-medium uppercase tracking-[0.12em] text-foreground/90 md:flex">
            {navbar.items.map((item) => (
              <a key={item.id} href={item.href} className="transition-colors hover:text-gold">
                {item.label}
              </a>
            ))}
          </nav>
          {navbar.contactText ? (
            <a
              href={navbar.contactHref}
              className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-900"
            >
              {navbar.contactText}
            </a>
          ) : null}
          {navbar.showLogin ? (
            <Link
              to={navbar.loginHref}
              className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-soft"
            >
              {navbar.loginText}
            </Link>
          ) : null}
        </div>

        <div className="flex items-center md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:bg-black"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="bg-black/95 p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-display uppercase tracking-[0.35em] text-gold">{navbar.logoText}</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8 space-y-4 text-lg font-semibold uppercase tracking-[0.1em]">
                {navbar.items.map((item) => (
                  <a key={item.id} href={item.href} className="block rounded-full bg-white/5 px-4 py-3 transition hover:bg-white/10">
                    {item.label}
                  </a>
                ))}
                {navbar.contactText ? (
                  <a href={navbar.contactHref} className="block rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
                    {navbar.contactText}
                  </a>
                ) : null}
                {navbar.showLogin ? (
                  <Link to={navbar.loginHref} className="block rounded-full bg-gold px-4 py-3 text-sm font-semibold text-black transition hover:bg-gold-soft">
                    {navbar.loginText}
                  </Link>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  const { hero } = useContent();
  const mediaX = hero.mediaPositionX ?? 50;
  const mediaY = hero.mediaPositionY ?? 50;
  const objectPosition = `${mediaX}% ${mediaY}%`;
  const zoom = hero.mediaZoom ?? 1;
  const mediaXDesktop = (hero as any).mediaPositionXDesktop ?? mediaX;
  const mediaYDesktop = (hero as any).mediaPositionYDesktop ?? mediaY;
  const zoomDesktop = (hero as any).mediaZoomDesktop ?? zoom;
  const mediaStyleDesktop = {
    objectPosition: `${mediaXDesktop}% ${mediaYDesktop}%`,
    transform: `scale(${zoomDesktop})`,
    transformOrigin: `${mediaXDesktop}% ${mediaYDesktop}%`,
  } as React.CSSProperties;

  const mediaXMobile = (hero as any).mediaPositionXMobile ?? mediaX;
  const mediaYMobile = (hero as any).mediaPositionYMobile ?? mediaY;
  const zoomMobile = (hero as any).mediaZoomMobile ?? zoom;
  const mediaStyleMobile = {
    objectPosition: `${mediaXMobile}% ${mediaYMobile}%`,
    transform: `scale(${zoomMobile})`,
    transformOrigin: `${mediaXMobile}% ${mediaYMobile}%`,
  } as React.CSSProperties;
  const isMobile = useIsMobile();
  const heroMediaStyle = isMobile ? mediaStyleMobile : mediaStyleDesktop;

  return (
    <section id="top" className="relative w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Media
          url={hero.mediaUrl}
          type={hero.mediaType}
          alt={`${hero.line1} ${hero.line2}`}
          className="h-full w-full object-cover"
          style={heroMediaStyle}
          priority
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-[1300px] flex-col items-center justify-center px-4 py-6 sm:px-6 lg:min-h-[100vh]">
        <div className="relative flex w-full flex-col items-center justify-center gap-6 text-center">
          <span className="pointer-events-none absolute inset-x-0 top-10 mx-auto block max-w-[calc(100%-2rem)] text-6xl font-display font-black uppercase tracking-[0.2em] text-white/15 sm:text-[7rem] md:text-[8.5rem] lg:text-[10.5rem]">
            {hero.line1 || ""}
          </span>
          {hero.line2 ? (
            <span className="pointer-events-none absolute inset-x-0 top-[28%] mx-auto block max-w-[calc(100%-2rem)] text-5xl font-display font-black uppercase tracking-[0.25em] text-white/20 sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem]">
              {hero.line2}
            </span>
          ) : null}

          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 px-4 sm:px-0">
            <div className="flex flex-col items-center gap-3">
              {hero.line1 ? (
                <h1 className="font-display text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  {hero.line1}
                </h1>
              ) : null}
              {hero.line2 ? (
                <h2 className="font-display text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  {hero.line2}
                </h2>
              ) : null}
            </div>

            {hero.subheading ? (
              <p className="max-w-3xl text-base leading-7 text-white/85 sm:text-lg md:text-xl">
                {hero.subheading}
              </p>
            ) : null}
          </div>

          <div className="relative z-10 mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {hero.buttons.map((button) => (
              <a
                key={button.id}
                href={button.href}
                className="rounded-full bg-black/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-black"
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Intro() {
  const { intro } = useContent();
  return (
    <section id="about" className="px-6 py-20 text-center">
      <ScrollRevealGroup stagger={0.12}>
        <RevealItem>
          <h1 className="font-display text-2xl font-bold md:text-6xl tracking-tight whitespace-nowrap overflow-hidden">
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
        <h2 className="text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl">{whyBook.heading}</h2>
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
      <ScrollReveal>
        <h2 className="text-center font-display text-4xl font-bold md:text-5xl">
          {featured.headingWhite} <span className="text-gold-gradient">{featured.headingGold}</span>
        </h2>
        <span className="gold-divider mt-5" />
      </ScrollReveal>
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
      <div ref={ref} className="no-scrollbar mt-6 flex snap-x overflow-x-auto gap-6 px-6 pb-4 md:px-[max(1.5rem,calc(50vw-32rem))]">
        {featured.items.map((m) => (
          <figure key={m.id} className="flex min-w-[85vw] md:min-w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-muted md:rounded-[1.5rem]">
            <div className="px-4 py-3 text-center">
              <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
                {m.label}
              </span>
            </div>
            <div className="relative aspect-[9/11] overflow-hidden">
              <FeaturedMedia url={m.mediaUrl} type={m.mediaType} label={m.label} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="px-4 py-3 text-center">
              <p className="text-xs font-medium text-muted-foreground">{m.caption}</p>
            </div>
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
  const slides = pastEvents.items.length > 0
    ? pastEvents.items
    : [{ id: "past-main", mediaUrl: pastEvents.mediaUrl, mediaType: pastEvents.mediaType, label: pastEvents.headingGold, caption: pastEvents.description }];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const href = pastEvents.buttonHref && pastEvents.buttonHref !== "#works" ? pastEvents.buttonHref : "/past-events";
  const internal = href.startsWith("/");

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [slides.length, activeIndex]);

  const handleSlide = (nextIndex: number) => {
    if (isAnimating || nextIndex === activeIndex || slides.length <= 1) return;
    setActiveIndex(nextIndex);
    setIsAnimating(true);
  };

  const handlePrev = () => {
    if (activeIndex > 0) handleSlide(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) handleSlide(activeIndex + 1);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    setDragStartX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null || isAnimating) {
      setDragStartX(null);
      return;
    }

    const delta = event.clientX - dragStartX;
    const threshold = 50;
    setDragStartX(null);

    if (Math.abs(delta) < threshold) return;
    if (delta < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const handlePointerCancel = () => {
    setDragStartX(null);
  };

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
            {slides.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground shadow-lg transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground shadow-lg transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            ) : null}
            <div
              className="relative h-64 w-full overflow-hidden"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <div
                className="flex h-full transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                onTransitionEnd={() => setIsAnimating(false)}
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="min-w-full h-full flex-shrink-0">
                    <Media url={slide.mediaUrl} type={slide.mediaType} alt={slide.caption || slide.label} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
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
                  {w.thumbUrl ? (
                    <img src={w.thumbUrl} alt={w.title} loading="lazy" className="h-48 w-full object-cover" />
                  ) : (
                    <div className="h-48 w-full bg-slate-950" />
                  )}
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
  const [localItems, setLocalItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("testimonials") || "null");
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });
  const [showModal, setShowModal] = useState(false);
  const size = Math.max(1, Math.ceil(items.length / 3));
  const rows = [items.slice(0, size), items.slice(size, size * 2), items.slice(size * 2)];
  return (
    <section className="py-20">
      <ScrollReveal>
        <h2 className="text-center font-display text-4xl font-bold md:text-5xl">
          {testimonials.headingWhite} <span className="text-gold-gradient">{testimonials.headingGold}</span>
        </h2>
        {testimonials.subtext ? <p className="mt-4 text-center text-sm text-muted-foreground">{testimonials.subtext}</p> : null}
        {testimonials.showHoverNote ? <p className="mt-2 text-center text-xs text-gold">{testimonials.hoverNote}</p> : null}
      </ScrollReveal>
      {testimonials.buttonText ? (
        <div className="mt-6 text-center">
          <button onClick={() => setShowModal(true)} className="btn-gold inline-block rounded-md px-6 py-2 text-sm">{testimonials.buttonText}</button>
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
                {[...row, ...row, ...(localItems.length ? localItems : [])].map((t, i) => (
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
      {showModal ? (
        <ShareExperienceModal
          onClose={() => setShowModal(false)}
          onSubmit={(item) => {
            setLocalItems((s) => [item, ...s]);
            try {
              const stored = JSON.parse(localStorage.getItem("testimonials") || "null") || [];
              localStorage.setItem("testimonials", JSON.stringify([item, ...stored]));
            } catch (e) {
              /* ignore */
            }
            setShowModal(false);
          }}
        />
      ) : null}
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
