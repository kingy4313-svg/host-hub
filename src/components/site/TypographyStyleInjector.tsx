import type { HeadingKey, TypoStyle, TypographySettings } from "@/content/site-content";
import { DEFAULT_CONTENT } from "@/content/site-content";

/**
 * TypographyStyleInjector - Injects admin-controlled typography settings as CSS variables.
 *
 * It emits a fully self-contained block: the raw desktop/mobile values AND the
 * resolved `--typo-*-<prop>` variables inside their own media queries, so the
 * admin values always win over the static defaults in styles.css.
 *
 * Gradient text is expressed as two variables per heading:
 *   --typo-<slug>-bg    → the linear-gradient (or `none`)
 *   --typo-<slug>-fill  → `transparent` when a gradient is on, else `currentColor`
 */

const KEYS: { key: HeadingKey; slug: string }[] = [
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

function num(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) ? Number(value) : fallback;
}

function gradientOf(s: TypoStyle | undefined): string {
  if (!s?.gradientEnabled) return "none";
  const angle = num(s.gradientAngle, 90);
  return `linear-gradient(${angle}deg, ${sanitize(s.gradientFrom, "#F7E7A6")}, ${sanitize(s.gradientTo, "#B8860B")})`;
}

function block(typography: TypographySettings, device: "desktop" | "mobile") {
  return KEYS.map(({ key, slug }) => {
    const s = typography[key]?.[device];
    if (!s) return "";
    const bg = gradientOf(s);
    return [
      `--typo-${slug}-fs: ${sanitize(s.fontSize, "36")}px;`,
      `--typo-${slug}-color: ${sanitize(s.color, "#FFFFFF")};`,
      `--typo-${slug}-fw: ${sanitize(s.fontWeight, "700")};`,
      `--typo-${slug}-ta: ${sanitize(s.textAlign, "center")};`,
      `--typo-${slug}-bg: ${bg};`,
      `--typo-${slug}-fill: ${bg === "none" ? "currentColor" : "transparent"};`,
    ].join("");
  }).join("");
}

function brandBlock(typography: TypographySettings) {
  const b = { ...DEFAULT_CONTENT.typography.brand, ...(typography.brand ?? {}) };
  const bg = b.gradientEnabled
    ? `linear-gradient(${num(b.gradientAngle, 90)}deg, ${sanitize(b.gradientFrom, "#F7E7A6")}, ${sanitize(b.gradientTo, "#B8860B")})`
    : "none";
  const shadow = b.shadowEnabled
    ? `${num(b.shadowX, 0)}px ${num(b.shadowY, 2)}px ${num(b.shadowBlur, 12)}px ${sanitize(b.shadowColor, "#000000")}`
    : "none";
  return [
    `--brand-ff: "${sanitize(b.fontFamily, "Playfair Display").replace(/"/g, "")}", Georgia, serif;`,
    `--brand-fs: ${num(b.fontSizeMobile, 14)}px;`,
    `--brand-ls: ${num(b.letterSpacing, 4) / 10}em;`,
    `--brand-fw: ${sanitize(b.fontWeight, "700")};`,
    `--brand-color: ${sanitize(b.color, "#D4AF37")};`,
    `--brand-bg: ${bg};`,
    `--brand-fill: ${bg === "none" ? "currentColor" : "transparent"};`,
    `--brand-shadow: ${shadow};`,
    `--brand-highlight: ${b.highlightEnabled ? sanitize(b.highlightColor, "#000000") : "transparent"};`,
    `--brand-highlight-pad: ${b.highlightEnabled ? "0.15em 0.45em" : "0"};`,
  ].join("");
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

  const brandFs = num(typography.brand?.fontSize, DEFAULT_CONTENT.typography.brand.fontSize);

  const css =
    `:root{${raw}${brandBlock(typography)}}` +
    `@media (max-width:768px){:root{${block(typography, "mobile")}}}` +
    `@media (min-width:769px){:root{${block(typography, "desktop")}--brand-fs:${brandFs}px;}}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
