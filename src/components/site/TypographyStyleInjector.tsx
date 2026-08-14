import type { TypographySettings } from "@/content/site-content";

/**
 * TypographyStyleInjector - Injects admin-controlled typography settings as CSS variables.
 *
 * It emits a fully self-contained block: the raw desktop/mobile values AND the
 * resolved `--typo-*-<prop>` variables inside their own media queries, so the
 * admin values always win over the static defaults in styles.css.
 */

const KEYS: { key: keyof TypographySettings; slug: string }[] = [
  { key: "heroHeading", slug: "hero" },
  { key: "whyBookMe", slug: "whybook" },
  { key: "featuredMoments", slug: "featured" },
  { key: "eventsSpecialize", slug: "events" },
  { key: "pastEvents", slug: "pastevents" },
  { key: "myWork", slug: "works" },
  { key: "testimonials", slug: "testimonials" },
  { key: "contactCta", slug: "contact" },
];

function sanitize(value: string | number | undefined, fallback: string): string {
  const raw = String(value ?? "").trim();
  // Block anything that could break out of a declaration.
  if (!raw || /[;{}<>]/.test(raw)) return fallback;
  return raw;
}

function block(typography: TypographySettings, device: "desktop" | "mobile") {
  return KEYS.map(({ key, slug }) => {
    const s = typography[key]?.[device];
    if (!s) return "";
    const fs = sanitize(s.fontSize, "36");
    return [
      `--typo-${slug}-fs: ${fs}px;`,
      `--typo-${slug}-color: ${sanitize(s.color, "#FFFFFF")};`,
      `--typo-${slug}-fw: ${sanitize(s.fontWeight, "700")};`,
      `--typo-${slug}-ta: ${sanitize(s.textAlign, "center")};`,
    ].join("");
  }).join("");
}

export function TypographyStyleInjector({ typography }: { typography?: TypographySettings }) {
  if (!typography) return null;

  const raw = KEYS.map(({ key, slug }) => {
    const d = typography[key]?.desktop;
    const m = typography[key]?.mobile;
    if (!d || !m) return "";
    return [
      `--typo-${slug}-fs-desktop: ${sanitize(d.fontSize, "36")}px;`,
      `--typo-${slug}-color-desktop: ${sanitize(d.color, "#FFFFFF")};`,
      `--typo-${slug}-fw-desktop: ${sanitize(d.fontWeight, "700")};`,
      `--typo-${slug}-ta-desktop: ${sanitize(d.textAlign, "center")};`,
      `--typo-${slug}-fs-mobile: ${sanitize(m.fontSize, "24")}px;`,
      `--typo-${slug}-color-mobile: ${sanitize(m.color, "#FFFFFF")};`,
      `--typo-${slug}-fw-mobile: ${sanitize(m.fontWeight, "700")};`,
      `--typo-${slug}-ta-mobile: ${sanitize(m.textAlign, "center")};`,
    ].join("");
  }).join("");

  const css =
    `:root{${raw}}` +
    `@media (max-width:768px){:root{${block(typography, "mobile")}}}` +
    `@media (min-width:769px){:root{${block(typography, "desktop")}}}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
