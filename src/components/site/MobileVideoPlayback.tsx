import { useEffect } from "react";

const MOBILE_QUERY = "(max-width: 768px)";

export function MobileVideoPlayback() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    const observedVideos = new Set<HTMLVideoElement>();

    const syncVideos = () => {
      if (!observer || !mediaQuery.matches) return;

      document.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
        if (video.closest("[data-carousel-video]") || observedVideos.has(video)) return;
        video.muted = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        observedVideos.add(video);
        observer?.observe(video);
      });
    };

    const stopObserving = () => {
      observedVideos.forEach((video) => observer?.unobserve(video));
      observedVideos.clear();
    };

    const updateMode = () => {
      if (mediaQuery.matches) {
        syncVideos();
        return;
      }

      stopObserving();
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (!mediaQuery.matches) return;

        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          video.muted = true;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    mutationObserver = new MutationObserver(() => {
      observedVideos.forEach((video) => {
        if (!video.isConnected) {
          observer?.unobserve(video);
          observedVideos.delete(video);
        }
      });
      syncVideos();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    mediaQuery.addEventListener("change", updateMode);
    updateMode();

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
      mutationObserver?.disconnect();
      observer?.disconnect();
      observedVideos.clear();
    };
  }, []);

  return null;
}
