import { useEffect, useRef, useState, type CSSProperties, type LegacyRef } from "react";
import { detectVideo } from "./VideoPlayer";
import { isVideoUrl } from "@/lib/media";

export type MediaProps = {
  url?: string;
  type: string;
  alt?: string;
  className?: string | undefined;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
  preload?: "auto" | "metadata" | "none";
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
  onError?: () => void;
  onLoad?: () => void;
};

export function Media({
  url,
  type,
  alt = "",
  className,
  style,
  loading = "lazy",
  fetchPriority = "auto",
  width,
  height,
  sizes,
  srcSet,
  priority = false,
  preload,
  poster,
  controls = false,
  autoPlay = false,
  onError,
}: MediaProps) {
  const effectiveLoading = priority ? "eager" : loading;
  const [failed, setFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(effectiveLoading === "eager" || priority);
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldLoad = isVisible || effectiveLoading === "eager" || priority;
  const effectiveType = type === "video" || isVideoUrl(url ?? "") ? "video" : "image";

  useEffect(() => {
    if (shouldLoad || !url || typeof window === "undefined" || !ref.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shouldLoad, url]);

  const handleError = () => {
    setFailed(true);
    onError?.();
  };

  if (!url || failed) {
    return <div ref={ref} className={className} style={style} aria-hidden="true" />;
  }

  if (effectiveType === "video") {
    return (
      <video
        ref={ref as React.LegacyRef<HTMLVideoElement>}
        src={shouldLoad ? url : undefined}
        className={`${className ?? ""} block`}
        style={style}
        preload={preload ?? (priority ? "metadata" : "none")}
        playsInline
        muted={autoPlay ? true : undefined}
        loop={autoPlay ? true : undefined}
        autoPlay={autoPlay ? true : undefined}
        controls={controls}
        poster={poster}
        onError={handleError}
      />
    );
  }

  return shouldLoad ? (
    <img
      ref={ref as React.LegacyRef<HTMLImageElement>}
      src={url}
      alt={alt}
      className={`${className ?? ""} block`}
      style={style}
      width={width}
      height={height}
      sizes={sizes}
      srcSet={srcSet}
      loading={effectiveLoading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={handleError}
    />
  ) : (
    <div ref={ref} className={className} style={style} aria-hidden="true" />
  );
}
