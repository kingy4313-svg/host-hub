import { createContext, useContext, type ReactNode } from "react";
import * as Lucide from "lucide-react";
import { DEFAULT_CONTENT, type SiteContent } from "@/content/site-content";

const ContentContext = createContext<SiteContent>(DEFAULT_CONTENT);

export function ContentProvider({ value, children }: { value: SiteContent; children: ReactNode }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

export function Icon({ name, className }: { name: string; className?: string | undefined }) {
  const Cmp = (Lucide as unknown as Record<string, React.ComponentType<{ className?: string | undefined }>>)[name];
  const Final = Cmp ?? Lucide.Sparkles;
  return <Final className={className} />;
}

/** Applies admin-configured colors and fonts as CSS variables. */
export function ThemeStyle({ content }: { content: SiteContent }) {
  const { colors, fonts } = content.settings;
  const css = `:root{--gold:${colors.gold};--primary:${colors.gold};--ring:${colors.gold};--background:${colors.background};--foreground:${colors.foreground};}
body{font-family:"${fonts.body}",ui-sans-serif,system-ui,sans-serif;}
h1,h2,h3,h4,.font-display{font-family:"${fonts.heading}",Georgia,serif;}`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
