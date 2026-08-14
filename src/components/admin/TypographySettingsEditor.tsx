import { useEffect, useRef, useState } from "react";
import type { EditorProps } from "./SectionEditors";
import { DEFAULT_CONTENT, type BrandTypography, type HeadingKey, type TypoPair, type TypographySettings } from "@/content/site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface HeadingConfig {
  key: HeadingKey;
  label: string;
  sampleText: string;
  description?: string;
}

const HEADINGS: HeadingConfig[] = [
  {
    key: "heroHeading",
    label: "Hero Heading",
    sampleText: "Award Winning Anchor ★ Actor ★ Content Creator",
    description: "Main headline in the hero section",
  },
  {
    key: "whyBookMe",
    label: "Why People Book Me",
    sampleText: "Why People Book Me",
    description: "Primary section heading",
  },
  {
    key: "featuredMoments",
    label: "Featured Moments",
    sampleText: "Featured Moments",
    description: "Section heading with two-tone text",
  },
  {
    key: "eventsSpecialize",
    label: "Events I Specialize In",
    sampleText: "Events I Specialize In",
    description: "Services section heading",
  },
  {
    key: "pastEvents",
    label: "Go Through Our Past Events",
    sampleText: "Go Through Our Past Events",
    description: "Past events section heading",
  },
  {
    key: "myWork",
    label: "A Glimpse of My Work",
    sampleText: "A Glimpse of My Work",
    description: "Works/portfolio section heading",
  },
  {
    key: "testimonials",
    label: "Loved by Community",
    sampleText: "Loved by Community",
    description: "Testimonials section heading",
  },
  {
    key: "contactCta",
    label: "Let's Light Up Your Event Together",
    sampleText: "Let's Light Up Your Event Together",
    description: "Contact CTA section heading",
  },
];

const FONT_WEIGHTS = [
  { value: "400", label: "Normal (400)" },
  { value: "500", label: "Medium (500)" },
  { value: "600", label: "Semibold (600)" },
  { value: "700", label: "Bold (700)" },
  { value: "800", label: "Extra Bold (800)" },
  { value: "900", label: "Black (900)" },
];

const TEXT_ALIGNS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

function TypographyControl({
  label,
  value,
  onChange,
  min = 10,
  max = 72,
  type = "number",
}: {
  label: string;
  value: string | number;
  onChange: (val: string | number) => void;
  min?: number;
  max?: number;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs font-semibold uppercase tracking-wide">{label}</Label>
      {type === "number" ? (
        <div className="flex gap-2">
          <Input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-2 flex-1"
          />
          <Input
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-16 text-center"
          />
        </div>
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function PreviewBox({
  label,
  sampleText,
  fontSize,
  color,
  fontWeight,
  textAlign,
  width,
  height,
}: {
  label: string;
  sampleText: string;
  fontSize: number;
  color: string;
  fontWeight: string;
  textAlign: string;
  width: number;
  height: number;
  gradient?: string;
}) {
  const isDesktop = width >= 1000;
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [available, setAvailable] = useState(isDesktop ? 640 : 300);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => setAvailable(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Never scale the phone up past its real size; desktop always scales down to fit.
  const maxFrame = isDesktop ? available : Math.min(available, width);
  const scale = Math.min(1, maxFrame / width);
  const frameHeight = Math.round(height * scale);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>

      <div ref={outerRef} className="w-full">
        <div
          className="mx-auto overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-lg"
          style={{ width: Math.round(width * scale) }}
        >
          {isDesktop ? (
            <div className="flex h-6 items-center gap-1.5 border-b border-slate-700 bg-slate-900 px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="ml-auto font-mono text-[10px] text-slate-500">1200 × {height} px</span>
            </div>
          ) : (
            <div className="flex h-6 items-center justify-center border-b border-slate-700 bg-slate-900">
              <span className="h-1.5 w-12 rounded-full bg-slate-700" />
            </div>
          )}

          {/* Real-size stage, uniformly scaled down to fit the card. */}
          <div style={{ height: frameHeight, overflow: "hidden" }} className="bg-black">
            <div
              style={{
                width,
                height,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: isDesktop ? "40px 60px" : "20px 16px",
                boxSizing: "border-box",
              }}
            >
              <div
                className="font-display w-full"
                style={{
                  fontSize: `${fontSize}px`,
                  color,
                  ...(gradient
                    ? {
                        backgroundImage: gradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : {}),
                  fontWeight,
                  textAlign: textAlign as "left" | "center" | "right",
                  fontFamily: "Playfair Display, Georgia, serif",
                  lineHeight: 1.2,
                  overflowWrap: "break-word",
                }}
              >
                {sampleText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

function gradientCss(s: { gradientEnabled?: boolean; gradientFrom?: string; gradientTo?: string; gradientAngle?: number }) {
  if (!s.gradientEnabled) return undefined;
  return `linear-gradient(${s.gradientAngle ?? 90}deg, ${s.gradientFrom ?? "#F7E7A6"}, ${s.gradientTo ?? "#B8860B"})`;
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs font-semibold uppercase tracking-wide">{label}</Label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded border border-blue-200 bg-white"
        />
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1" />
      </div>
    </div>
  );
}

/** Gradient text controls for a single heading + device. */
function GradientControls({
  value,
  onUpdate,
}: {
  value: { gradientEnabled?: boolean; gradientFrom?: string; gradientTo?: string; gradientAngle?: number };
  onUpdate: (property: string, val: string | number | boolean) => void;
}) {
  const enabled = Boolean(value.gradientEnabled);
  return (
    <div className="space-y-4 rounded-lg border border-blue-100 bg-blue-50/40 p-3">
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={enabled} onChange={(e) => onUpdate("gradientEnabled", e.target.checked)} />
        Gradient text effect
      </label>
      {enabled ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <ColorField label="Gradient Start" value={value.gradientFrom ?? "#F7E7A6"} onChange={(v) => onUpdate("gradientFrom", v)} />
            <ColorField label="Gradient End" value={value.gradientTo ?? "#B8860B"} onChange={(v) => onUpdate("gradientTo", v)} />
          </div>
          <TypographyControl
            label="Gradient Angle (deg)"
            value={value.gradientAngle ?? 90}
            min={0}
            max={360}
            onChange={(v) => onUpdate("gradientAngle", v)}
          />
        </>
      ) : (
        <p className="text-xs text-muted-foreground">When off, the heading uses the solid colour above.</p>
      )}
    </div>
  );
}

function HeadingSettingBlock({
  heading,
  settings,
  onUpdate,
}: {
  heading: HeadingConfig;
  settings: TypoPair;
  onUpdate: (
    device: "desktop" | "mobile",
    property: string,
    value: string | number | boolean
  ) => void;
}) {
  return (
    <AccordionItem value={heading.key}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-3 text-left">
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
          <div>
            <p className="font-semibold text-foreground">{heading.label}</p>
            {heading.description && (
              <p className="text-xs text-muted-foreground">{heading.description}</p>
            )}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-4">
        <Tabs defaultValue="desktop" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="desktop">Desktop Settings</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Settings</TabsTrigger>
          </TabsList>

          {/* Desktop Settings */}
          <TabsContent value="desktop" className="space-y-6">
            <Card className="p-4 space-y-4">
              <h4 className="text-sm font-semibold">Desktop Controls</h4>
              <div className="grid grid-cols-2 gap-4">
                <TypographyControl
                  label="Font Size"
                  value={settings.desktop.fontSize}
                  onChange={(val) => onUpdate("desktop", "fontSize", val)}
                />
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide">
                    Color
                  </Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.desktop.color}
                      onChange={(e) => onUpdate("desktop", "color", e.target.value)}
                      className="h-9 w-12 rounded border border-blue-200 bg-white cursor-pointer"
                    />
                    <Input
                      value={settings.desktop.color}
                      onChange={(e) => onUpdate("desktop", "color", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide">
                    Font Weight
                  </Label>
                  <Select
                    value={settings.desktop.fontWeight}
                    onValueChange={(val) => onUpdate("desktop", "fontWeight", val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_WEIGHTS.map((fw) => (
                        <SelectItem key={fw.value} value={fw.value}>
                          {fw.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide">
                    Text Align
                  </Label>
                  <Select
                    value={settings.desktop.textAlign}
                    onValueChange={(val) => onUpdate("desktop", "textAlign", val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TEXT_ALIGNS.map((ta) => (
                        <SelectItem key={ta.value} value={ta.value}>
                          {ta.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <GradientControls
                value={settings.desktop}
                onUpdate={(property, val) => onUpdate("desktop", property, val)}
              />
            </Card>

            <PreviewBox
              label="Desktop Preview (1200px)"
              sampleText={heading.sampleText}
              fontSize={settings.desktop.fontSize}
              color={settings.desktop.color}
              fontWeight={settings.desktop.fontWeight}
              textAlign={settings.desktop.textAlign}
              gradient={gradientCss(settings.desktop)}
              width={1200}
              height={200}
            />
          </TabsContent>

          {/* Mobile Settings */}
          <TabsContent value="mobile" className="space-y-6">
            <Card className="p-4 space-y-4">
              <h4 className="text-sm font-semibold">Mobile Controls</h4>
              <div className="grid grid-cols-2 gap-4">
                <TypographyControl
                  label="Font Size"
                  value={settings.mobile.fontSize}
                  onChange={(val) => onUpdate("mobile", "fontSize", val)}
                />
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide">
                    Color
                  </Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={settings.mobile.color}
                      onChange={(e) => onUpdate("mobile", "color", e.target.value)}
                      className="h-9 w-12 rounded border border-blue-200 bg-white cursor-pointer"
                    />
                    <Input
                      value={settings.mobile.color}
                      onChange={(e) => onUpdate("mobile", "color", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide">
                    Font Weight
                  </Label>
                  <Select
                    value={settings.mobile.fontWeight}
                    onValueChange={(val) => onUpdate("mobile", "fontWeight", val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_WEIGHTS.map((fw) => (
                        <SelectItem key={fw.value} value={fw.value}>
                          {fw.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-wide">
                    Text Align
                  </Label>
                  <Select
                    value={settings.mobile.textAlign}
                    onValueChange={(val) => onUpdate("mobile", "textAlign", val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TEXT_ALIGNS.map((ta) => (
                        <SelectItem key={ta.value} value={ta.value}>
                          {ta.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <GradientControls
                value={settings.mobile}
                onUpdate={(property, val) => onUpdate("mobile", property, val)}
              />
            </Card>

            <PreviewBox
              label="Mobile Preview (375px)"
              sampleText={heading.sampleText}
              fontSize={settings.mobile.fontSize}
              color={settings.mobile.color}
              fontWeight={settings.mobile.fontWeight}
              textAlign={settings.mobile.textAlign}
              gradient={gradientCss(settings.mobile)}
              width={375}
              height={300}
            />
          </TabsContent>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
}

const BRAND_FONTS = [
  "Playfair Display",
  "Cormorant Garamond",
  "Georgia",
  "Poppins",
  "Montserrat",
  "Great Vibes",
  "Cinzel",
  "Space Grotesk",
];

/** Header brand name (e.g. "Sayanti Banerjee") styling panel. */
function BrandPanel({ brand, onChange }: { brand: BrandTypography; onChange: (b: BrandTypography) => void }) {
  const set = <K extends keyof BrandTypography>(key: K, value: BrandTypography[K]) => onChange({ ...brand, [key]: value });
  const gradient = brand.gradientEnabled
    ? `linear-gradient(${brand.gradientAngle}deg, ${brand.gradientFrom}, ${brand.gradientTo})`
    : undefined;

  return (
    <Card className="space-y-5 p-4">
      <div>
        <h3 className="text-sm font-semibold">Header Brand Name</h3>
        <p className="text-xs text-muted-foreground">Font style, colour, gradient, highlight and drop shadow for the name in the site header.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-semibold uppercase tracking-wide">Font Style</Label>
          <Select value={brand.fontFamily} onValueChange={(v) => set("fontFamily", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BRAND_FONTS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-semibold uppercase tracking-wide">Font Weight</Label>
          <Select value={brand.fontWeight} onValueChange={(v) => set("fontWeight", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_WEIGHTS.map((fw) => (
                <SelectItem key={fw.value} value={fw.value}>
                  {fw.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TypographyControl label="Desktop Size" value={brand.fontSize} min={10} max={64} onChange={(v) => set("fontSize", Number(v))} />
        <TypographyControl label="Mobile Size" value={brand.fontSizeMobile} min={8} max={48} onChange={(v) => set("fontSizeMobile", Number(v))} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TypographyControl label="Letter Spacing" value={brand.letterSpacing} min={0} max={20} onChange={(v) => set("letterSpacing", Number(v))} />
        <ColorField label="Font Colour" value={brand.color} onChange={(v) => set("color", v)} />
      </div>

      <GradientControls
        value={brand}
        onUpdate={(property, val) => onChange({ ...brand, [property]: val } as BrandTypography)}
      />

      <div className="space-y-4 rounded-lg border border-blue-100 bg-blue-50/40 p-3">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={brand.highlightEnabled} onChange={(e) => set("highlightEnabled", e.target.checked)} />
          Highlight background
        </label>
        {brand.highlightEnabled ? (
          <ColorField label="Highlight Colour" value={brand.highlightColor} onChange={(v) => set("highlightColor", v)} />
        ) : null}
      </div>

      <div className="space-y-4 rounded-lg border border-blue-100 bg-blue-50/40 p-3">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={brand.shadowEnabled} onChange={(e) => set("shadowEnabled", e.target.checked)} />
          Drop shadow
        </label>
        {brand.shadowEnabled ? (
          <>
            <div className="grid grid-cols-3 gap-4">
              <TypographyControl label="Offset X" value={brand.shadowX} min={-20} max={20} onChange={(v) => set("shadowX", Number(v))} />
              <TypographyControl label="Offset Y" value={brand.shadowY} min={-20} max={20} onChange={(v) => set("shadowY", Number(v))} />
              <TypographyControl label="Blur" value={brand.shadowBlur} min={0} max={40} onChange={(v) => set("shadowBlur", Number(v))} />
            </div>
            <ColorField label="Shadow Colour" value={brand.shadowColor} onChange={(v) => set("shadowColor", v)} />
          </>
        ) : null}
      </div>

      <div className="rounded-xl border border-slate-700 bg-black p-6 text-center">
        <span
          className="inline-block rounded-md uppercase"
          style={{
            backgroundColor: brand.highlightEnabled ? brand.highlightColor : "transparent",
            padding: brand.highlightEnabled ? "0.15em 0.45em" : 0,
          }}
        >
          <span
            style={{
              fontFamily: `"${brand.fontFamily}", Georgia, serif`,
              fontSize: brand.fontSize,
              fontWeight: brand.fontWeight as never,
              letterSpacing: `${brand.letterSpacing / 10}em`,
              color: brand.color,
              ...(gradient
                ? { backgroundImage: gradient, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
                : {}),
              textShadow: brand.shadowEnabled
                ? `${brand.shadowX}px ${brand.shadowY}px ${brand.shadowBlur}px ${brand.shadowColor}`
                : "none",
            }}
          >
            Sayanti Banerjee
          </span>
        </span>
      </div>
    </Card>
  );
}

export function TypographySettingsEditor({ content, patch }: EditorProps) {
  const typography = content.typography;
  const [isResetting, setIsResetting] = useState(false);

  const handleUpdate = (
    headingKey: HeadingKey,
    device: "desktop" | "mobile",
    property: string,
    value: string | number | boolean
  ) => {
    const currentHeading = typography[headingKey];
    const updated = {
      ...typography,
      [headingKey]: {
        ...currentHeading,
        [device]: {
          ...currentHeading[device],
          [property]: value,
        },
      },
    };
    patch("typography", updated);
  };

  const resetToDefaults = () => {
    setIsResetting(true);
    patch("typography", DEFAULT_CONTENT.typography);
    setTimeout(() => setIsResetting(false), 400);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <p className="font-semibold mb-2">Live preview</p>
        <p>
          Edit font size, colour, weight and alignment for each heading. The previews below show the
          real 1200px desktop and 375px mobile rendering, scaled to fit. Press <strong>Save Changes</strong>{" "}
          (with “Save as draft only” unchecked) to apply them to the live website.
        </p>
      </div>


      <BrandPanel
        brand={{ ...DEFAULT_CONTENT.typography.brand, ...(typography.brand ?? {}) }}
        onChange={(b) => patch("typography", { ...typography, brand: b })}
      />

      <Accordion type="single" collapsible className="w-full space-y-3">
        {HEADINGS.map((heading) => (
          <HeadingSettingBlock
            key={heading.key}
            heading={heading}
            settings={typography[heading.key]}
            onUpdate={(device, property, value) =>
              handleUpdate(heading.key, device, property, value)
            }
          />
        ))}
      </Accordion>

      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" onClick={resetToDefaults} disabled={isResetting}>
          {isResetting ? "Resetting..." : "Reset to Defaults"}
        </Button>
        <div className="flex-1 text-right text-xs text-muted-foreground">
          Changes are saved automatically when you save the admin panel.
        </div>
      </div>
    </div>
  );
}
