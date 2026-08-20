import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { detectVideo, VideoPlayer } from "./VideoPlayer";
import { Media } from "./Media";

export type CarouselItem = {
  id: string;
  mediaUrl: string;
  mediaType: string;
  label?: string;
  caption?: string;
};

/**
 * Full-width, scroll-snapping video carousel.
 * Only the slide centered in the viewport plays; scrolling pauses the previous video.
 */
export function VideoCarousel({ items }: { items: CarouselItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // Pause every video except the given index.
  const activate = useCallback(
    (index: number, shouldPlay: boolean) => {
      videoRefs.current.forEach((video, i) => {
        if (!video) return;
        if (i !== index) {
          video.pause();
          video.currentTime = 0;
        }
      });
      const current = videoRefs.current[index];
      if (current && shouldPlay) {
        current.muted = muted;
        void current.play().catch(() => undefined);
      }
    },
    [muted],
  );

  // Horizontal intersection observer: root is the scroll track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-slide-index]"));
    const observer = new IntersectionObserver(
      (entries) => {
        let best: { index: number; ratio: number } | null = null;
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset["slideIndex"]);
          if (!entry.isIntersecting) {
            videoRefs.current[index]?.pause();
            continue;
          }
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { index, ratio: entry.intersectionRatio };
          }
        }
        if (best && best.ratio >= 0.6) setActiveIndex(best.index);
      },
      { root: track, threshold: [0, 0.25, 0.6, 0.9, 1] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [items.length]);

  // Pause immediately while the user is scrolling; resume when it settles.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      videoRefs.current.forEach((video) => video?.pause());
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (!paused) activate(activeIndex, true);
      }, 140);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [activeIndex, activate, paused]);

  // Reset pause state whenever the active slide changes so a new video autoplays.
  useEffect(() => {
    setPaused(false);
  }, [activeIndex]);

  useEffect(() => {
    if (paused) return;
    activate(activeIndex, true);
  }, [activeIndex, paused, activate]);

  useEffect(() => {
    const current = videoRefs.current[activeIndex];
    if (current) current.muted = muted;
  }, [muted, activeIndex]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>(`[data-slide-index="${index}"]`);
    if (!track || !slide) return;
    const activeSlide = track.querySelector<HTMLElement>(`[data-slide-index="${activeIndex}"]`);
    const distance = activeSlide
      ? Math.abs(slide.offsetLeft - activeSlide.offsetLeft)
      : slide.offsetWidth;
    if (distance === 0) return;
    track.scrollBy({
      left: index > activeIndex ? distance : -distance,
      behavior: "smooth",
    });
  };

  const toggleOverlay = () => {
    setShowOverlay(true);
    window.setTimeout(() => setShowOverlay(false), 1800);
  };

  if (items.length === 0) return null;

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6">
      <button
        type="button"
        aria-label="Previous video"
        onClick={() => goTo(Math.max(0, activeIndex - 1))}
        className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-black/60 p-2 text-gold backdrop-blur transition hover:bg-black/80 sm:left-2 sm:p-3"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        type="button"
        aria-label="Next video"
        onClick={() => goTo(Math.min(items.length - 1, activeIndex + 1))}
        className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-black/60 p-2 text-gold backdrop-blur transition hover:bg-black/80 sm:right-2 sm:p-3"
      >
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <div
        ref={trackRef}
        className="no-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth"
      >
        {items.map((item, index) => {
          const kind = detectVideo(item.mediaUrl).kind;
          const isEmbedVideo = kind === "youtube" || kind === "vimeo" || kind === "instagram";
          const isFileVideo =
            item.mediaType === "video"
              ? kind !== "youtube" && kind !== "vimeo" && kind !== "instagram"
              : kind === "file";
          return (
            <div
              key={item.id}
              data-slide-index={index}
              className="relative w-[82vw] max-w-[300px] shrink-0 snap-center lg:w-[calc((100%-2rem)/3)] lg:max-w-none"
            >
              {item.label ? (
                <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground">
                  {item.label}
                </p>
              ) : null}
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-border bg-black">
                {isEmbedVideo ? (
                  <VideoPlayer
                    url={item.mediaUrl}
                    title={item.label || "Featured video"}
                    className="absolute inset-0 h-full w-full"
                    ratio="aspect-[9/16]"
                  />
                ) : isFileVideo ? (
                  <>
                    <video
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      src={item.mediaUrl}
                      className="absolute inset-0 h-full w-full object-cover"
                      loop
                      playsInline
                      muted={muted}
                      preload="metadata"
                    />
                    <button
                      type="button"
                      aria-label={paused ? "Play video" : "Pause video"}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleOverlay();
                        const video = videoRefs.current[index];
                        if (!video) return;
                        if (video.paused) {
                          video.muted = muted;
                          void video.play().catch(() => undefined);
                          setPaused(false);
                        } else {
                          video.pause();
                          setPaused(true);
                        }
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        className={`flex h-16 w-16 items-center justify-center rounded-full bg-black/55 text-white transition-opacity duration-300 ${
                          showOverlay || (paused && index === activeIndex)
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        {paused ? <Play className="h-7 w-7" /> : <Pause className="h-7 w-7" />}
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label={muted ? "Unmute video" : "Mute video"}
                      onClick={(event) => {
                        event.stopPropagation();
                        setMuted((m) => !m);
                      }}
                      className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                    >
                      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                  </>
                ) : (
                  <Media
                    url={item.mediaUrl}
                    type={item.mediaType}
                    alt={item.label ?? ""}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
              {item.caption ? (
                <p className="mt-3 text-sm text-muted-foreground">{item.caption}</p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-6 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
