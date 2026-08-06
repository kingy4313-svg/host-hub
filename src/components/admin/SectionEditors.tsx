import { newId, type SiteContent } from "@/content/site-content";
import { TextField, AreaField, SwitchField, MediaField, IconPicker, ListEditor, VideoField, Field } from "./fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";

export type EditorProps = {
  content: SiteContent;
  patch: <K extends keyof SiteContent>(key: K, value: Partial<SiteContent[K]>) => void;
};

/* --------------------------------------------------------------- settings */

function SettingsEditor({ content, patch }: EditorProps) {
  const s = content.settings;
  return (
    <div className="space-y-4">
      <TextField label="Site name" value={s.siteName} onChange={(v) => patch("settings", { siteName: v })} />
      <MediaField label="Logo" value={s.logoUrl} onChange={(v) => patch("settings", { logoUrl: v })} accept="image/*" />
      <MediaField label="Favicon" value={s.faviconUrl} onChange={(v) => patch("settings", { faviconUrl: v })} accept="image/*" />
      <div className="grid gap-3 sm:grid-cols-3">
        {(["gold", "background", "foreground"] as const).map((k) => (
          <Field key={k} label={`${k} colour`}>
            <div className="flex gap-2">
              <input
                type="color"
                className="h-9 w-12 rounded border bg-background"
                value={s.colors[k]}
                onChange={(e) => patch("settings", { colors: { ...s.colors, [k]: e.target.value } })}
              />
              <Input
                value={s.colors[k]}
                onChange={(e) => patch("settings", { colors: { ...s.colors, [k]: e.target.value } })}
              />
            </div>
          </Field>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Heading font" value={s.fonts.heading} onChange={(v) => patch("settings", { fonts: { ...s.fonts, heading: v } })} />
        <TextField label="Body font" value={s.fonts.body} onChange={(v) => patch("settings", { fonts: { ...s.fonts, body: v } })} />
      </div>
      <TextField label="SEO title" value={s.seo.title} onChange={(v) => patch("settings", { seo: { ...s.seo, title: v } })} />
      <AreaField label="SEO description" value={s.seo.description} onChange={(v) => patch("settings", { seo: { ...s.seo, description: v } })} />
      <MediaField label="OG image" value={s.seo.ogImage} onChange={(v) => patch("settings", { seo: { ...s.seo, ogImage: v } })} accept="image/*" />
    </div>
  );
}

/* --------------------------------------------------------------- contact */

function ContactInfoEditor({ content, patch }: EditorProps) {
  const s = content.settings;
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Used site-wide: WhatsApp button, Call button, footer and the floating call icon.
      </p>
      <TextField label="WhatsApp link" value={s.whatsapp} onChange={(v) => patch("settings", { whatsapp: v })} placeholder="https://wa.me/91..." />
      <TextField label="Email" value={s.email} onChange={(v) => patch("settings", { email: v })} />
      <TextField label="Phone number" value={s.phone} onChange={(v) => patch("settings", { phone: v })} />
      <SwitchField
        label="Show floating call button"
        checked={s.floatingCall.enabled}
        onChange={(v) => patch("settings", { floatingCall: { ...s.floatingCall, enabled: v } })}
      />
      <TextField
        label="Floating call number"
        value={s.floatingCall.phone}
        onChange={(v) => patch("settings", { floatingCall: { ...s.floatingCall, phone: v } })}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="CTA heading (white)" value={content.contact.headingWhite} onChange={(v) => patch("contact", { headingWhite: v })} />
        <TextField label="CTA heading (gold)" value={content.contact.headingGold} onChange={(v) => patch("contact", { headingGold: v })} />
      </div>
      <TextField label="CTA subtext" value={content.contact.subtext} onChange={(v) => patch("contact", { subtext: v })} />
      <TextField label="Box text" value={content.contact.boxText} onChange={(v) => patch("contact", { boxText: v })} />
    </div>
  );
}

/* ----------------------------------------------------------------- navbar */

function NavbarEditor({ content, patch }: EditorProps) {
  const n = content.navbar;
  return (
    <div className="space-y-4">
      <TextField label="Logo text" value={n.logoText} onChange={(v) => patch("navbar", { logoText: v })} />
      <ListEditor
        items={n.items}
        onChange={(items) => patch("navbar", { items })}
        create={() => ({ id: newId("n"), label: "New link", href: "#" })}
        addLabel="Add nav link"
        render={(item, update) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="Label" value={item.label} onChange={(v) => update({ label: v })} />
            <TextField label="Link" value={item.href} onChange={(v) => update({ href: v })} />
          </div>
        )}
      />
      <SwitchField label="Show login button" checked={n.showLogin} onChange={(v) => patch("navbar", { showLogin: v })} />
    </div>
  );
}

/* ------------------------------------------------------------------- hero */

function HeroEditor({ content, patch }: EditorProps) {
  const h = content.hero;
  return (
    <div className="space-y-4">
      <MediaField label="Hero background (image or video)" value={h.mediaUrl} onChange={(v) => patch("hero", { mediaUrl: v })} />
      <Field label="Media type">
        <select
          className="h-9 w-full rounded-md border bg-background px-2 text-sm"
          value={h.mediaType}
          onChange={(e) => patch("hero", { mediaType: e.target.value as "image" | "video" })}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Heading line 1" value={h.line1} onChange={(v) => patch("hero", { line1: v })} />
        <TextField label="Heading line 2" value={h.line2} onChange={(v) => patch("hero", { line2: v })} />
      </div>
      <TextField label="Subheading" value={h.subheading} onChange={(v) => patch("hero", { subheading: v })} />
    </div>
  );
}

/* ------------------------------------------------------------------ intro */

function IntroEditor({ content, patch }: EditorProps) {
  const i = content.intro;
  return (
    <div className="space-y-4">
      <TextField label="Heading" value={i.heading} onChange={(v) => patch("intro", { heading: v })} />
      <Field label="Tagline paragraphs">
        <ListEditor
          items={i.taglines}
          onChange={(taglines) => patch("intro", { taglines })}
          create={() => ({ id: newId("t"), text: "" })}
          addLabel="Add paragraph"
          render={(item, update) => <AreaField label="Text" value={item.text} onChange={(v) => update({ text: v })} />}
        />
      </Field>
      <Field label="Stats">
        <ListEditor
          items={i.stats}
          onChange={(stats) => patch("intro", { stats })}
          create={() => ({ id: newId("st"), icon: "Star", value: "", label: "" })}
          addLabel="Add stat"
          render={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-3">
              <IconPicker label="Icon" value={item.icon} onChange={(v) => update({ icon: v })} />
              <TextField label="Value" value={item.value} onChange={(v) => update({ value: v })} />
              <TextField label="Label" value={item.label} onChange={(v) => update({ label: v })} />
            </div>
          )}
        />
      </Field>
    </div>
  );
}

/* ---------------------------------------------------------------- whyBook */

function WhyBookEditor({ content, patch }: EditorProps) {
  const w = content.whyBook;
  return (
    <div className="space-y-4">
      <TextField label="Heading" value={w.heading} onChange={(v) => patch("whyBook", { heading: v })} />
      <ListEditor
        items={w.cards}
        onChange={(cards) => patch("whyBook", { cards })}
        create={() => ({ id: newId("w"), title: "", text: "", goldTitle: true })}
        addLabel="Add card"
        render={(item, update) => (
          <div className="space-y-3">
            <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} />
            <AreaField label="Description" value={item.text} onChange={(v) => update({ text: v })} />
          </div>
        )}
      />
    </div>
  );
}

/* --------------------------------------------------------------- featured */

function FeaturedEditor({ content, patch }: EditorProps) {
  const f = content.featured;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Heading (white)" value={f.headingWhite} onChange={(v) => patch("featured", { headingWhite: v })} />
        <TextField label="Heading (gold)" value={f.headingGold} onChange={(v) => patch("featured", { headingGold: v })} />
      </div>
      <ListEditor
        items={f.items}
        onChange={(items) => patch("featured", { items })}
        create={() => ({ id: newId("f"), mediaUrl: "", mediaType: "image" as const, label: "", caption: "", overlayIcon: "Instagram", overlayLink: "" })}
        addLabel="Add moment"
        render={(item, update) => (
          <div className="space-y-3">
            <MediaField label="Image or video" value={item.mediaUrl} onChange={(v) => update({ mediaUrl: v })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Category label" value={item.label} onChange={(v) => update({ label: v })} />
              <TextField label="Link" value={item.overlayLink} onChange={(v) => update({ overlayLink: v })} />
            </div>
            <AreaField label="Caption" value={item.caption} onChange={(v) => update({ caption: v })} rows={2} />
          </div>
        )}
      />
    </div>
  );
}

/* --------------------------------------------------------------- services */

function ServicesEditor({ content, patch }: EditorProps) {
  const s = content.services;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Heading (white)" value={s.headingWhite} onChange={(v) => patch("services", { headingWhite: v })} />
        <TextField label="Heading (gold)" value={s.headingGold} onChange={(v) => patch("services", { headingGold: v })} />
      </div>
      <TextField label="Trust line" value={s.trustLine} onChange={(v) => patch("services", { trustLine: v })} />
      <ListEditor
        items={s.items}
        onChange={(items) => patch("services", { items })}
        create={() => ({ id: newId("sv"), icon: "Mic", label: "", href: "" })}
        addLabel="Add service"
        render={(item, update) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="Service name" value={item.label} onChange={(v) => update({ label: v })} />
            <IconPicker label="Icon" value={item.icon} onChange={(v) => update({ icon: v })} />
          </div>
        )}
      />
    </div>
  );
}

/* ------------------------------------------------------------- pastEvents */

function PastEventsEditor({ content, patch }: EditorProps) {
  const p = content.pastEvents;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Heading (white)" value={p.headingWhite} onChange={(v) => patch("pastEvents", { headingWhite: v })} />
        <TextField label="Heading (gold)" value={p.headingGold} onChange={(v) => patch("pastEvents", { headingGold: v })} />
      </div>
      <AreaField label="Description" value={p.description} onChange={(v) => patch("pastEvents", { description: v })} />
      <MediaField label="Featured image or video" value={p.mediaUrl} onChange={(v) => patch("pastEvents", { mediaUrl: v })} />
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Button text" value={p.buttonText} onChange={(v) => patch("pastEvents", { buttonText: v })} />
        <TextField label="Button link" value={p.buttonHref} onChange={(v) => patch("pastEvents", { buttonHref: v })} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ works */

function WorksEditor({ content, patch }: EditorProps) {
  const tabs = content.works.tabs;
  const first = tabs[0]?.id ?? "none";

  const setTabs = (next: typeof tabs) => patch("works", { tabs: next });

  return (
    <div className="space-y-4">
      <TextField label="Section heading" value={content.works.heading} onChange={(v) => patch("works", { heading: v })} />

      {tabs.length === 0 ? null : (
        <Tabs defaultValue={first}>
          <TabsList className="flex h-auto flex-wrap">
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>{t.name || "Untitled"}</TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-4 pt-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <TextField
                    label="Tab name"
                    value={tab.name}
                    onChange={(v) => setTabs(tabs.map((t) => (t.id === tab.id ? { ...t, name: v } : t)))}
                  />
                </div>
                <Button type="button" variant="ghost" size="icon" aria-label="Delete tab" onClick={() => setTabs(tabs.filter((t) => t.id !== tab.id))}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <ListEditor
                items={tab.items}
                onChange={(items) => setTabs(tabs.map((t) => (t.id === tab.id ? { ...t, items } : t)))}
                create={() => ({ id: newId("wk"), thumbUrl: "", title: "", category: tab.name, duration: "", videoUrl: "", openNewTab: true })}
                addLabel="Add entry"
                render={(item, update) => (
                  <div className="space-y-3">
                    <MediaField label="Thumbnail" value={item.thumbUrl} onChange={(v) => update({ thumbUrl: v })} accept="image/*" />
                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                      <TextField label="Category tag" value={item.category} onChange={(v) => update({ category: v })} />
                      <TextField label="Duration badge" value={item.duration} onChange={(v) => update({ duration: v })} />
                    </div>
                    <VideoField
                      value={item.videoUrl}
                      onChange={(v) => update({ videoUrl: v })}
                      onThumb={(t) => update({ thumbUrl: t })}
                    />
                  </div>
                )}
              />
            </TabsContent>
          ))}
        </Tabs>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setTabs([...tabs, { id: newId("tb"), name: "New tab", items: [] }])}
      >
        <Plus className="mr-1 h-4 w-4" /> Add tab
      </Button>
    </div>
  );
}

/* ----------------------------------------------------------- testimonials */

function TestimonialsEditor({ content, patch }: EditorProps) {
  const t = content.testimonials;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label="Heading (white)" value={t.headingWhite} onChange={(v) => patch("testimonials", { headingWhite: v })} />
        <TextField label="Heading (gold)" value={t.headingGold} onChange={(v) => patch("testimonials", { headingGold: v })} />
      </div>
      <TextField label="Subtext" value={t.subtext} onChange={(v) => patch("testimonials", { subtext: v })} />
      <ListEditor
        items={t.items}
        onChange={(items) => patch("testimonials", { items })}
        create={() => ({ id: newId("ts"), name: "", role: "", text: "", photoUrl: "" })}
        addLabel="Add testimonial"
        render={(item, update) => (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Name" value={item.name} onChange={(v) => update({ name: v })} />
              <TextField label="Role" value={item.role} onChange={(v) => update({ role: v })} />
            </div>
            <AreaField label="Testimonial" value={item.text} onChange={(v) => update({ text: v })} />
          </div>
        )}
      />
    </div>
  );
}

/* ----------------------------------------------------------------- footer */

function FooterEditor({ content, patch }: EditorProps) {
  const f = content.footer;
  return (
    <div className="space-y-4">
      <TextField label="Tagline / quote" value={f.quote} onChange={(v) => patch("footer", { quote: v })} />
      <AreaField label="Bio" value={f.bio} onChange={(v) => patch("footer", { bio: v })} rows={2} />
      <Field label="Quick links">
        <ListEditor
          items={f.quickLinks}
          onChange={(quickLinks) => patch("footer", { quickLinks })}
          create={() => ({ id: newId("q"), label: "", href: "#" })}
          addLabel="Add quick link"
          render={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Label" value={item.label} onChange={(v) => update({ label: v })} />
              <TextField label="Link" value={item.href} onChange={(v) => update({ href: v })} />
            </div>
          )}
        />
      </Field>
      <Field label="Social links">
        <ListEditor
          items={content.settings.socials}
          onChange={(socials) => patch("settings", { socials })}
          create={() => ({ id: newId("s"), platform: "Instagram", url: "" })}
          addLabel="Add social link"
          render={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <IconPicker label="Platform icon" value={item.platform} onChange={(v) => update({ platform: v })} />
              <TextField label="URL" value={item.url} onChange={(v) => update({ url: v })} />
            </div>
          )}
        />
      </Field>
      <TextField label="Copyright" value={f.copyright} onChange={(v) => patch("footer", { copyright: v })} />
      <AreaField label="Terms of Service content" value={f.termsContent} onChange={(v) => patch("footer", { termsContent: v })} rows={5} />
      <AreaField label="Privacy Policy content" value={f.privacyContent} onChange={(v) => patch("footer", { privacyContent: v })} rows={5} />
    </div>
  );
}

/* ------------------------------------------------------------------ index */

export type AdminSection = {
  key: string;
  label: string;
  icon: string;
  Editor: (props: EditorProps) => JSX.Element;
};

export const ADMIN_SECTIONS: AdminSection[] = [
  { key: "settings", label: "Global Settings", icon: "Settings", Editor: SettingsEditor },
  { key: "navbar", label: "Navbar", icon: "Menu", Editor: NavbarEditor },
  { key: "hero", label: "Hero", icon: "Image", Editor: HeroEditor },
  { key: "intro", label: "Intro / Stats", icon: "BarChart3", Editor: IntroEditor },
  { key: "whyBook", label: "Why People Book Me", icon: "Sparkles", Editor: WhyBookEditor },
  { key: "featured", label: "Featured Moments", icon: "Film", Editor: FeaturedEditor },
  { key: "services", label: "Services", icon: "Mic", Editor: ServicesEditor },
  { key: "pastEvents", label: "Past Events", icon: "Calendar", Editor: PastEventsEditor },
  { key: "works", label: "My Works", icon: "Video", Editor: WorksEditor },
  { key: "testimonials", label: "Testimonials", icon: "Quote", Editor: TestimonialsEditor },
  { key: "contact", label: "Contact Info", icon: "Phone", Editor: ContactInfoEditor },
  { key: "footer", label: "Footer", icon: "PanelBottom", Editor: FooterEditor },
];
