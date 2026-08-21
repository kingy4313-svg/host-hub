import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

interface ResponsiveHeroImageProps {
  desktopUrl?: string;
  mobileUrl?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Responsive hero image component using picture element.
 * Loads desktop image on screens >= 768px, mobile image on smaller screens.
 * Prevents unnecessary downloads by using media queries.
 */
export function ResponsiveHeroImage({
  desktopUrl,
  mobileUrl,
  alt,
  className,
  style,
}: ResponsiveHeroImageProps) {
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Use desktop image as fallback if mobile not provided
  const effectiveMobileUrl = mobileUrl || desktopUrl;
  const effectiveDesktopUrl = desktopUrl || mobileUrl;

  if (!effectiveMobileUrl || !effectiveDesktopUrl || failed) {
    return <div ref={containerRef} className={className} style={style} aria-hidden="true" />;
  }

  return (
    <picture>
      {/* Desktop: 1920x1080 (16:9) - load on screens >= 768px */}
      <source media="(min-width: 768px)" srcSet={effectiveDesktopUrl} />
      
      {/* Mobile: 1080x1920 (9:16) - load on screens < 768px */}
      <source media="(max-width: 767px)" srcSet={effectiveMobileUrl} />
      
      {/* Fallback for browsers that don't support picture element */}
      <img
        ref={imgRef}
        src={effectiveDesktopUrl}
        alt={alt}
        className={`${className ?? ""} block`}
        style={style}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={() => setFailed(true)}
      />
    </picture>
  );
}
