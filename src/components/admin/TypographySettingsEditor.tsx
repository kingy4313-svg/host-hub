import { useState } from "react";
import type { EditorProps } from "./SectionEditors";
import type { TypographySettings } from "@/content/site-content";
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
  key: keyof TypographySettings;
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
}) {
  const isDesktop = width === 1200;
  
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex gap-3 w-full justify-center">
        {/* Outer container for the preview - provides max width and centers content */}
        <div 
          className="rounded-lg border-8 border-slate-800 bg-slate-950 shadow-2xl overflow-hidden"
          style={{
            width: isDesktop ? '100%' : 'fit-content',
            maxWidth: isDesktop ? '600px' : '200px',
            aspectRatio: isDesktop ? '16 / 9' : '9 / 11',
          }}
        >
          {/* Browser chrome for desktop */}
          {isDesktop && (
            <div className="h-6 border-b border-slate-700 bg-slate-900 flex items-center px-3 gap-1.5 shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <div className="flex-1" />
              <div className="text-xs text-slate-500 font-mono">localhost:8081</div>
            </div>
          )}

          {/* Phone notch for mobile */}
          {!isDesktop && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-slate-900 rounded-b-2xl z-10" />
          )}

          {/* Scaled preview content container */}
          <div 
            className="w-full h-full flex items-center justify-center bg-black overflow-hidden"
            style={{
              paddingTop: isDesktop ? '0' : '0',
            }}
          >
            {/* Inner content that gets scaled */}
            <div
              style={{
                width: isDesktop ? `${width}px` : `${width}px`,
                minHeight: isDesktop ? '600px' : `${height}px`,
                transform: isDesktop ? `scale(${600 / width})` : 'scale(1)',
                transformOrigin: 'top center',
                display: 'flex',
                alignItems: isDesktop ? 'flex-start' : 'center',
                justifyContent: 'center',
                paddingTop: isDesktop ? '80px' : '0',
                paddingBottom: isDesktop ? '80px' : '0',
              }}
            >
              <div
                style={{
                  fontSize: `${fontSize}px`,
                  color,
                  fontWeight,
                  textAlign: textAlign as any,
                  fontFamily: 'Playfair Display, Georgia, serif',
                  lineHeight: '1.2',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  maxWidth: '90%',
                  padding: '0 20px',
                }}
                className="font-display"
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

function HeadingSettingBlock({
  heading,
  settings,
  onUpdate,
}: {
  heading: HeadingConfig;
  settings: TypographySettings[keyof TypographySettings];
  onUpdate: (
    device: "desktop" | "mobile",
    property: string,
    value: string | number
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
            </Card>

            <PreviewBox
              label="Desktop Preview (1200px)"
              sampleText={heading.sampleText}
              fontSize={settings.desktop.fontSize}
              color={settings.desktop.color}
              fontWeight={settings.desktop.fontWeight}
              textAlign={settings.desktop.textAlign}
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
            </Card>

            <PreviewBox
              label="Mobile Preview (375px)"
              sampleText={heading.sampleText}
              fontSize={settings.mobile.fontSize}
              color={settings.mobile.color}
              fontWeight={settings.mobile.fontWeight}
              textAlign={settings.mobile.textAlign}
              width={375}
              height={300}
            />
          </TabsContent>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
}

export function TypographySettingsEditor({ content, patch }: EditorProps) {
  const typography = content.typography;
  const [isResetting, setIsResetting] = useState(false);

  const handleUpdate = (
    headingKey: keyof TypographySettings,
    device: "desktop" | "mobile",
    property: string,
    value: string | number
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
    // Reset to defaults - you can implement this with your DEFAULT_CONTENT
    // For now, just show a toast-like behavior
    setTimeout(() => setIsResetting(false), 500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <p className="font-semibold mb-2">💡 Live Preview Features</p>
        <p>Edit the font size, color, weight, and alignment for each heading. Preview updates instantly for both desktop (1200px) and mobile (375px) viewports.</p>
      </div>

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
