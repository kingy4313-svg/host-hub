import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Loader2, RotateCcw } from "lucide-react";

export type VideoKind = "youtube" | "vimeo" | "instagram" | "file" | "unknown";

const YT =
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/i;
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/i;
const IG = /instagram\.com\/(p|reel|reels|tv)\/([\w-]+)/i;
const FILE = /\.(mp4|webm|ogv|ogg|mov|m4v)(\?|#|$)/i;

export function getVideoPoster(url: string): string | undefined {
  if (!url.includes("ik.imagekit.io/") || !FILE.test(url)) return undefined;
  return url.replace(/(\.(?:mp4|webm|ogv|ogg|mov|m4v))(\?|#|$)/i, "$1/ik-thumbnail.jpg$2");
}

export function detectVideo(url: string): { kind: VideoKind; id?: string } {
  const u = (url || "").trim();
  if (!u) return { kind: "unknown" };
  const yt = u.match(YT);
  if (yt?.[1]) return { kind: "youtube", id: yt[1] };
  const vm = u.match(VIMEO);
  if (vm?.[1]) return { kind: "vimeo", id: vm[1] };
  const ig = u.match(IG);
  if (ig?.[2]) return { kind: "instagram", id: ig[2] };
  if (FILE.test(u) || u.startsWith("/api/public/media/") || u.startsWith("blob:"))
    return { kind: "file" };
  return { kind: "unknown" };
}

function mimeFor(url: string) {
  const ext = url.split("?")[0]?.split(".").pop()?.toLowerCase();
  if (ext === "webm") return "video/webm";
  if (ext === "ogv" || ext === "ogg") return "video/ogg";
  if (ext === "mov" || ext === "m4v") return "video/mp4";
  return "video/mp4";
}

function Shell({
  children,
  aspectClass = "aspect-video",
}: {
  children: React.ReactNode;
  aspectClass?: string;
}) {
  return (
    <div
      className={`relative ${aspectClass} w-full overflow-hidden rounded-xl border border-border bg-black`}
    >
      {children}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry?: (() => void) | undefined }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
      <AlertTriangle className="size-7 text-gold" />
      <p className="font-display text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="btn-gold inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs"
        >
          <RotateCcw className="size-3.5" /> Retry
        </button>
      ) : null}
    </div>
  );
}

function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
      <Loader2 className="size-7 animate-spin text-gold" />
    </div>
  );
}

function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="instagram.com/embed.js"]',
    );
    const process = () => {
      const ig = (window as unknown as { instgrm?: { Embeds: { process: () => void } } }).instgrm;
      if (ig) ig.Embeds.process();
      else setFailed(true);
    };
    if (existing) {
      process();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = process;
    s.onerror = () => setFailed(true);
    document.body.appendChild(s);
  }, [ready]);

  if (failed) {
    return (
      <div className="relative min-h-[320px] rounded-xl border border-border bg-black">
        <ErrorState message="This Instagram post can't be embedded. It may be private or blocked." />
      </div>
    );
  }

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-black">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#000", margin: 0, width: "100%" }}
      />
    </div>
  );
}

export function VideoPlayer({
  url,
  poster,
  title,
  autoPlay,
  className,
  ratio,
}: {
  url: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
  ratio?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const { kind, id } = detectVideo(url);
  const aspectClass = ratio ?? "aspect-video";
  const videoPoster = poster ?? getVideoPoster(url);

  const handleMouseEnter = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    void video.play().catch(() => undefined);
  };

  const handleMouseLeave = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.muted = true;
  };

  useEffect(() => {
    setState("loading");
  }, [url, attempt]);

  if (!url) {
    return (
      <Shell>
        <ErrorState message="No video source provided." />
      </Shell>
    );
  }

  if (kind === "instagram") {
    return (
      <div className={className}>
        <InstagramEmbed url={url} />
      </div>
    );
  }

  if (kind === "youtube" || kind === "vimeo") {
    const src =
      kind === "youtube"
        ? `https://www.youtube.com/embed/${id}?rel=0&playsinline=1&enablejsapi=1${autoPlay ? "&autoplay=1" : ""}`
        : `https://player.vimeo.com/video/${id}?api=1${autoPlay ? "&autoplay=1" : ""}`;
    return (
      <div className={className}>
        <Shell aspectClass={aspectClass}>
          {state === "loading" ? <Loading /> : null}
          <iframe
            key={attempt}
            src={src}
            title={title || "Video"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            onLoad={() => setState("ready")}
            className="absolute inset-0 h-full w-full"
          />
        </Shell>
      </div>
    );
  }

  if (kind === "unknown") {
    return (
      <div className={className}>
        <Shell>
          <ErrorState message="Unsupported or private video link. Use a direct MP4/WebM file, YouTube, Vimeo or a public Instagram post." />
        </Shell>
      </div>
    );
  }

  return (
    <div className={className}>
      <Shell aspectClass={aspectClass}>
        {state === "loading" ? <Loading /> : null}
        {state === "error" ? (
          <ErrorState
            message="This video failed to load. The file may be missing or blocked."
            onRetry={() => setAttempt((a) => a + 1)}
          />
        ) : (
          <video
            key={attempt}
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            {...(videoPoster ? { poster: videoPoster } : {})}
            {...(autoPlay ? { autoPlay: true, muted: true } : {})}
            onLoadedMetadata={() => setState("ready")}
            onCanPlay={() => setState("ready")}
            onError={() => setState("error")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-0 h-full w-full bg-black object-contain"
          >
            <source src={url} type={mimeFor(url)} />
          </video>
        )}
      </Shell>
    </div>
  );
}
