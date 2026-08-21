import { createContext, useContext, type ReactNode } from "react";
import {
  Award,
  Briefcase,
  Calendar,
  Camera,
  Crown,
  Facebook,
  Film,
  Globe,
  Globe2,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Mic,
  Music,
  Plane,
  Phone,
  Rocket,
  Sparkles,
  Star,
  Target,
  Twitter,
  UserRound,
  Users,
  Video,
  Youtube,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DEFAULT_CONTENT, type SiteContent } from "@/content/site-content";
import { TypographyStyleInjector } from "./TypographyStyleInjector";

const ContentContext = createContext<SiteContent>(DEFAULT_CONTENT);

export function ContentProvider({ value, children }: { value: SiteContent; children: ReactNode }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

const ICONS: Record<string, LucideIcon> = {
  Award,
  Briefcase,
  Calendar,
  Camera,
  Clock,
  Crown,
  Facebook,
  Film,
  Globe,
  Globe2,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Mic,
  Music,
  Plane,
  Phone,
  Rocket,
  Sparkles,
  Star,
  Target,
  Twitter,
  UserRound,
  Users,
  Video,
  Youtube,
};

export function Icon({ name, className }: { name: string; className?: string | undefined }) {
  const Final = ICONS[name] ?? Sparkles;
  return <Final className={className} />;
}

/** Applies admin-configured colors, fonts, and typography settings as CSS variables. */
export function ThemeStyle({ content }: { content: SiteContent }) {
  const { colors, fonts } = content.settings;
  const css = `:root{--gold:${colors.gold};--primary:${colors.gold};--ring:${colors.gold};--background:${colors.background};--foreground:${colors.foreground};}
body{font-family:"${fonts.body}",ui-sans-serif,system-ui,sans-serif;}
h1,h2,h3,h4,.font-display{font-family:"${fonts.heading}",Georgia,serif;}`;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <TypographyStyleInjector typography={content.typography} />
    </>
  );
}
