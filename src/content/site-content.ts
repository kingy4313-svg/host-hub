import heroImg from "@/assets/hero-anchor.jpg";
import eventCorporate from "@/assets/event-corporate.jpg";
import eventCelebrity from "@/assets/event-celebrity.jpg";
import eventAwards from "@/assets/event-awards.jpg";
import eventWedding from "@/assets/event-wedding.jpg";

/* ------------------------------------------------------------------ types */

export type MediaType = "image" | "video";

export type NavItem = { id: string; label: string; href: string };
export type SocialLink = { id: string; platform: string; url: string };
export type StatItem = { id: string; icon: string; iconImageUrl?: string; value: string; label: string };
export type ReasonCard = { id: string; title: string; text: string; goldTitle: boolean };
export type MomentItem = {
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
  label: string;
  caption: string;
  overlayIcon: string;
  overlayLink: string;
};
export type PastEventItem = {
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
  label: string;
  caption: string;
};
export type ServiceItem = { id: string; icon: string; iconImageUrl?: string; label: string; href: string };
export type WorkItem = {
  id: string;
  thumbUrl: string;
  title: string;
  category: string;
  duration: string;
  videoUrl: string;
  openNewTab: boolean;
};
export type WorkTab = { id: string; name: string; items: WorkItem[] };
export type TestimonialItem = { id: string; name: string; role: string; text: string; photoUrl: string };
export type TextItem = { id: string; text: string };

export type TypoStyle = {
  fontSize: number;
  color: string;
  fontWeight: string;
  textAlign: string;
  gradientEnabled?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  gradientAngle?: number;
};

export type TypoPair = { desktop: TypoStyle; mobile: TypoStyle };

export type BrandTypography = {
  fontFamily: string;
  fontSize: number;
  fontSizeMobile: number;
  letterSpacing: number;
  fontWeight: string;
  color: string;
  gradientEnabled: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  highlightEnabled: boolean;
  highlightColor: string;
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowColor: string;
};

export type TypographySettings = {
  heroHeading: TypoPair;
  whyBookMe: TypoPair;
  featuredMoments: TypoPair;
  eventsSpecialize: TypoPair;
  pastEvents: TypoPair;
  myWork: TypoPair;
  testimonials: TypoPair;
  contactCta: TypoPair;
  brand: BrandTypography;
};

export type HeadingKey = Exclude<keyof TypographySettings, "brand">;


export type SiteContent = {
  settings: {
    siteName: string;
    logoUrl: string;
    faviconUrl: string;
    colors: { gold: string; background: string; foreground: string };
    fonts: { heading: string; body: string };
    floatingCall: { enabled: boolean; phone: string };
    whatsapp: string;
    email: string;
    phone: string;
    socials: SocialLink[];
    seo: { title: string; description: string; ogImage: string };
  };
  navbar: {
    logoText: string;
    items: NavItem[];
    contactText: string;
    contactHref: string;
    showLogin: boolean;
    loginText: string;
    loginHref: string;
  };
  hero: {
    mediaUrl: string;
    mediaUrlDesktop: string;
    mediaUrlMobile: string;
    mediaType: MediaType;
    mediaPositionX: number;
    mediaPositionY: number;
    mediaZoom: number;
    mediaPositionXDesktop: number;
    mediaPositionYDesktop: number;
    mediaZoomDesktop: number;
    mediaPositionXMobile: number;
    mediaPositionYMobile: number;
    mediaZoomMobile: number;
    line1: string;
    line2: string;
    subheading: string;
    buttons: { id: string; text: string; href: string }[];
  };
  intro: { heading: string; taglines: TextItem[]; stats: StatItem[] };
  whyBook: { heading: string; showDivider: boolean; cards: ReasonCard[] };
  featured: {
    headingWhite: string;
    headingGold: string;
    showArrows: boolean;
    autoplayMs: number;
    items: MomentItem[];
  };
  services: { headingWhite: string; headingGold: string; items: ServiceItem[]; trustLine: string };
  pastEvents: {
    headingWhite: string;
    headingGold: string;
    description: string;
    mediaUrl: string;
    mediaType: MediaType;
    buttonText: string;
    buttonHref: string;
    items: PastEventItem[];
  };
  works: { heading: string; tabs: WorkTab[] };
  testimonials: {
    headingWhite: string;
    headingGold: string;
    subtext: string;
    hoverNote: string;
    showHoverNote: boolean;
    buttonText: string;
    buttonHref: string;
    rowSpeeds: number[];
    items: TestimonialItem[];
  };
  contact: {
    headingWhite: string;
    headingGold: string;
    subtext: string;
    whatsappText: string;
    whatsappHref: string;
    emailText: string;
    emailHref: string;
    callText: string;
    callHref: string;
    boxText: string;
  };
  footer: {
    quote: string;
    bio: string;
    cities: TextItem[];
    quickLinks: NavItem[];
    getInTouchHeading: string;
    termsLabel: string;
    termsContent: string;
    privacyLabel: string;
    privacyContent: string;
    copyright: string;
    autoYear: boolean;
  };
  typography: TypographySettings;
};

export type SectionKey = keyof SiteContent;

export const SECTION_LABELS: Record<SectionKey, string> = {
  settings: "Global / Site Settings",
  navbar: "Navbar",
  hero: "Hero Section",
  intro: "Intro / Stats",
  whyBook: "Why People Book Me",
  featured: "Featured Moments",
  services: "My Services",
  pastEvents: "Past Events",
  works: "My Works",
  testimonials: "Testimonials",
  contact: "Contact / CTA",
  footer: "Footer",
  typography: "Typography & Text Styles",
};

export const ICON_OPTIONS = [
  "Mic", "Users", "Star", "Calendar", "Target", "PartyPopper", "Heart", "Rocket",
  "Clock", "Globe", "Globe2", "Instagram", "Facebook", "Youtube", "Linkedin",
  "Twitter", "MessageCircle", "Mail", "Phone", "Camera", "Video", "Music",
  "Award", "Sparkles", "Crown", "MapPin", "Briefcase", "Film", "Plane",
];

export const FONT_OPTIONS = [
  "Playfair Display", "Inter", "Cormorant Garamond", "Marcellus", "Cinzel",
  "Lora", "Montserrat", "Poppins", "Raleway", "Jost", "DM Serif Display", "Outfit",
];

const uid = (n: string) => n;

/* --------------------------------------------------------------- defaults */

export const DEFAULT_CONTENT: SiteContent = {
  settings: {
    siteName: "Sayanti Banerjee",
    logoUrl: "",
    faviconUrl: "",
    colors: { gold: "#D4A947", background: "#050505", foreground: "#FAFAFA" },
    fonts: { heading: "Playfair Display", body: "Inter" },
    floatingCall: { enabled: true, phone: "+91 97023 34193" },
    whatsapp: "https://wa.me/919702334193",
    email: "anchorsayantibanerjee@gmail.com",
    phone: "+91 97023 34193",
    socials: [{ id: uid("s1"), platform: "Instagram", url: "https://instagram.com" }],
    seo: {
      title: "Sayanti Banerjee — Anchor, Actor & Influencer",
      description:
        "Book Sayanti Banerjee, a premium event anchor with 900+ shows across India & abroad — corporate conferences, celebrity events, weddings and live shows.",
      ogImage: "",
    },
  },
  navbar: {
    logoText: "Sayanti Banerjee",
    items: [
      { id: "n1", label: "Portfolio", href: "#works" },
      { id: "n2", label: "Past Events", href: "#past-events" },
      { id: "n3", label: "About", href: "#about" },
      { id: "n4", label: "Contact Me", href: "#contact" },
    ],
    contactText: "Contact",
    contactHref: "#contact",
    showLogin: true,
    loginText: "Login",
    loginHref: "/login",
  },
  hero: {
    mediaUrl: heroImg,
    mediaUrlDesktop: "",
    mediaUrlMobile: "",
    mediaType: "image",
    mediaPositionX: 50,
    mediaPositionY: 50,
    mediaZoom: 1.05,
    // explicit desktop/mobile overrides (kept in sync with the above by default)
    mediaPositionXDesktop: 50,
    mediaPositionYDesktop: 50,
    mediaZoomDesktop: 1.05,
    mediaPositionXMobile: 50,
    mediaPositionYMobile: 50,
    mediaZoomMobile: 1.05,
    line1: "",
    line2: "",
    subheading: "",
    buttons: [],
  },
  intro: {
    heading: "Anchor ★ Actor ★ Influencer",
    taglines: [
      { id: "t1", text: "Journalist to Influencer, Actor and Anchor... Journey of Life Must Go ON..." },
      { id: "t2", text: "I bring stories to life on stage — with poise, spontaneity, and presence that holds the attention." },
    ],
    stats: [
      { id: "st1", icon: "Clock", value: "1+", label: "YRS" },
      { id: "st2", icon: "Globe", value: "", label: "INDIA & ABROAD" },
      { id: "st3", icon: "Mic", value: "3+", label: "EVENTS" },
      { id: "st4", icon: "Instagram", value: "1+", label: "FAMILY" },
      { id: "st5", icon: "Users", value: "11+", label: "HAPPY CLIENTS" },
      { id: "st6", icon: "Globe2", value: "", label: "GOOGLE PAGE" },
    ],
  },
  whyBook: {
    heading: "Why People Book Me",
    showDivider: true,
    cards: [
      { id: "w1", title: "Emotion Over Script", text: "Your event deserves real connection, not robotic hosting.", goldTitle: true },
      { id: "w2", title: "Energy That Lifts the Attention", text: "From shy crowds to wild parties — I match your vibe.", goldTitle: true },
      { id: "w3", title: "Flawless Stage Flow", text: "I handle last-minute changes with calm confidence.", goldTitle: true },
    ],
  },
  featured: {
    headingWhite: "Featured",
    headingGold: "Moments",
    showArrows: true,
    autoplayMs: 0,
    items: [
      {
        id: "f1", mediaUrl: eventCorporate, label: "Corporate Conference", caption: "Why Women Should Always Support Women Entrepreneurs", overlayIcon: "Instagram", overlayLink: "https://instagram.com",
        mediaType: "image"
      },
      {
        id: "f2", mediaUrl: eventCelebrity, label: "CELEBRITY EVENTS", caption: "Film premiere red carpet hosting", overlayIcon: "Instagram", overlayLink: "https://instagram.com",
        mediaType: "image"
      },
      {
        id: "f3", mediaUrl: eventAwards, label: "TTK Healthcare", caption: "Doctor's Day Celebration 2025", overlayIcon: "Instagram", overlayLink: "https://instagram.com",
        mediaType: "image"
      },
      {
        id: "f4", mediaUrl: eventWedding, label: "Destination Weddings", caption: "Sangeet night in Goa", overlayIcon: "Instagram", overlayLink: "https://instagram.com",
        mediaType: "image"
      },
      {
        id: "f5", mediaUrl: eventCelebrity, label: "CELEBRITY EVENTS", caption: "In conversation with Ram Gopal Sir", overlayIcon: "Instagram", overlayLink: "https://instagram.com",
        mediaType: "image"
      },
      {
        id: "f6",
        mediaUrl: "https://www.youtube.com/watch?v=BdvIeVgWNRk",
        label: "Baby Shower Mumbai",
        caption: "Baby Shower Mumbai emcee highlights",
        overlayIcon: "",
        overlayLink: "",
        mediaType: "video"
      },
    ],
  },
  services: {
    headingWhite: "My",
    headingGold: "Services",
    trustLine: "Trusted by clients in Mumbai, Goa, Pune, Delhi & Kolkata.",
    items: [
      { id: "sv1", icon: "Mic", label: "Anchoring Corporate Conference", href: "" },
      { id: "sv2", icon: "Users", label: "Dealers Meet", href: "" },
      { id: "sv3", icon: "Star", label: "Celebrity Events", href: "" },
      { id: "sv4", icon: "Calendar", label: "Live Shows", href: "" },
      { id: "sv5", icon: "Target", label: "Team Building Events", href: "" },
      { id: "sv6", icon: "PartyPopper", label: "Theme Parties", href: "" },
      { id: "sv7", icon: "Heart", label: "Destination Weddings", href: "" },
      { id: "sv8", icon: "Rocket", label: "Product Launches", href: "" },
    ],
  },
  pastEvents: {
    headingWhite: "Go Through Our",
    headingGold: "Past Events",
    description:
      "Swipe through our collection of memorable events, each card representing a unique moment captured in time.",
    mediaUrl: eventAwards,
    mediaType: "image",
    buttonText: "Explore More",
    buttonHref: "#works",
    items: [],
  },
  works: {
    heading: "My Works",
    tabs: [
      {
        id: "tb1", name: "Corporate Conference",
        items: [
          { id: "wk1", thumbUrl: eventCorporate, title: "Corporate Conference Event", category: "Corporate Conference", duration: "9:47", videoUrl: "", openNewTab: true },
          { id: "wk2", thumbUrl: eventAwards, title: "Business Conference Hosting", category: "Corporate Conference", duration: "6:12", videoUrl: "", openNewTab: true },
          { id: "wk3", thumbUrl: eventCelebrity, title: "Corporate Event Management", category: "Corporate Conference", duration: "4:38", videoUrl: "", openNewTab: true },
        ],
      },
      {
        id: "tb2", name: "Celebrity Events",
        items: [
          { id: "wk4", thumbUrl: eventCelebrity, title: "Film Premiere Red Carpet", category: "Celebrity Events", duration: "7:10", videoUrl: "", openNewTab: true },
          { id: "wk5", thumbUrl: eventAwards, title: "Awards Night Hosting", category: "Celebrity Events", duration: "9:02", videoUrl: "", openNewTab: true },
          { id: "wk6", thumbUrl: eventCelebrity, title: "Star Studded Launch", category: "Celebrity Events", duration: "4:55", videoUrl: "", openNewTab: true },
        ],
      },
      {
        id: "tb3", name: "Tourism",
        items: [
          { id: "wk7", thumbUrl: eventAwards, title: "Land of Adventure Showcase", category: "Tourism", duration: "5:26", videoUrl: "", openNewTab: true },
          { id: "wk8", thumbUrl: eventCorporate, title: "Tourism Board Roadshow", category: "Tourism", duration: "7:33", videoUrl: "", openNewTab: true },
        ],
      },
      {
        id: "tb4", name: "Acting Career",
        items: [
          { id: "wk9", thumbUrl: eventCelebrity, title: "Short Film Feature", category: "Acting Career", duration: "14:02", videoUrl: "", openNewTab: true },
          { id: "wk10", thumbUrl: eventAwards, title: "Web Series Cameo", category: "Acting Career", duration: "8:20", videoUrl: "", openNewTab: true },
        ],
      },
      {
        id: "tb5", name: "Wedding",
        items: [
          { id: "wk11", thumbUrl: eventWedding, title: "Destination Sangeet Night", category: "Wedding", duration: "10:22", videoUrl: "", openNewTab: true },
          { id: "wk12", thumbUrl: eventWedding, title: "Reception Grand Entry", category: "Wedding", duration: "7:48", videoUrl: "", openNewTab: true },
        ],
      },
    ],
  },
  testimonials: {
    headingWhite: "Loved by",
    headingGold: "Community",
    subtext: "What our clients say about our services",
    hoverNote: "Hover over testimonials to pause scrolling",
    showHoverNote: true,
    buttonText: "Share Your Experience",
    buttonHref: "#contact",
    rowSpeeds: [45, 55, 50],
    items: [
      { id: "ts1", name: "Arjun Reddy", role: "Product Launch Manager", photoUrl: "", text: "Our product launch was elevated to a whole new level with Sayanti's exceptional hosting skills." },
      { id: "ts2", name: "Kavya Nair", role: "Award Ceremony Organizer", photoUrl: "", text: "Sayanti hosted our industry awards night phenomenally and created an unforgettable experience for everyone." },
      { id: "ts3", name: "Rajesh Kumar", role: "Corporate Event Manager", photoUrl: "", text: "She's punctual and brings incredible energy to every corporate event." },
      { id: "ts4", name: "Anjali Patel", role: "Fashion Show Organizer", photoUrl: "", text: "She doesn't just host, she builds lasting relationships and helped make our fashion week a huge success." },
      { id: "ts5", name: "Aditya Verma", role: "Entertainment Professional", photoUrl: "", text: "Sayanti's hosting skills are truly world-class. She knows how to read the room perfectly." },
      { id: "ts6", name: "Neha Gupta", role: "Event Planning Consultant", photoUrl: "", text: "Every event feels special and memorable with her innovative hosting techniques." },
      { id: "ts7", name: "Karan Mehta", role: "Wedding Coordinator", photoUrl: "", text: "Sayanti made our wedding reception unforgettable and kept everyone engaged throughout the evening." },
      { id: "ts8", name: "Divya Sharma", role: "Corporate Communications", photoUrl: "", text: "Our international conference was engaging for all participants thanks to her." },
      { id: "ts9", name: "Deepika Sharma", role: "Business Consultant", photoUrl: "", text: "Sayanti's journey is truly inspiring — she understands the value of building relationships." },
      { id: "ts10", name: "Amit Patel", role: "Event Entrepreneur", photoUrl: "", text: "Consistent excellence in everything she does on stage." },
      { id: "ts11", name: "Rohan Kapoor", role: "Festival Organizer", photoUrl: "", text: "Her multilingual ability kept our cultural festival crowd entertained all night." },
      { id: "ts12", name: "Ananya Das", role: "Event Management Professional", photoUrl: "", text: "Working with Sayanti is effortless because of her exceptional preparation." },
    ],
  },
  contact: {
    headingWhite: "Let's Light Up Your Event",
    headingGold: "Together",
    subtext: "and create everlasting memories.......",
    whatsappText: "WhatsApp Now",
    whatsappHref: "",
    emailText: "Email",
    emailHref: "",
    callText: "Call",
    callHref: "",
    boxText: "Ready to connect? Reach out directly:",
  },
  footer: {
    quote: "Your story deserves the perfect voice.",
    bio: "Crafted with care to leave your audience smiling.",
    cities: [
      { id: "c1", text: "Mumbai" }, { id: "c2", text: "Goa" }, { id: "c3", text: "Pune" },
      { id: "c4", text: "Delhi" }, { id: "c5", text: "Kolkata" },
    ],
    quickLinks: [
      { id: "q1", label: "About", href: "#about" },
      { id: "q2", label: "Services", href: "#services" },
      { id: "q3", label: "Contact", href: "#contact" },
    ],
    getInTouchHeading: "Get in Touch",
    termsLabel: "Terms of Service",
    termsContent: "These are the terms of service. Edit this text from the admin dashboard.",
    privacyLabel: "Privacy Policy",
    privacyContent: "This is the privacy policy. Edit this text from the admin dashboard.",
    copyright: "© {year} Sayanti Banerjee. All rights reserved.",
    autoYear: true,
  },
  typography: {
    heroHeading: {
      desktop: { fontSize: 48, color: "#FFFFFF", fontWeight: "900", textAlign: "center" },
      mobile: { fontSize: 24, color: "#FFFFFF", fontWeight: "900", textAlign: "center" },
    },
    whyBookMe: {
      desktop: { fontSize: 36, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
      mobile: { fontSize: 20, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
    },
    featuredMoments: {
      desktop: { fontSize: 36, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
      mobile: { fontSize: 20, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
    },
    eventsSpecialize: {
      desktop: { fontSize: 36, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
      mobile: { fontSize: 20, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
    },
    pastEvents: {
      desktop: { fontSize: 36, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
      mobile: { fontSize: 20, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
    },
    myWork: {
      desktop: { fontSize: 36, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
      mobile: { fontSize: 20, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
    },
    testimonials: {
      desktop: { fontSize: 36, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
      mobile: { fontSize: 20, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
    },
    contactCta: {
      desktop: { fontSize: 40, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
      mobile: { fontSize: 22, color: "#FFFFFF", fontWeight: "700", textAlign: "center" },
    },
    brand: {
      fontFamily: "Playfair Display",
      fontSize: 18,
      fontSizeMobile: 14,
      letterSpacing: 4,
      fontWeight: "700",
      color: "#D4AF37",
      gradientEnabled: false,
      gradientFrom: "#F7E7A6",
      gradientTo: "#B8860B",
      gradientAngle: 90,
      highlightEnabled: false,
      highlightColor: "#000000",
      shadowEnabled: true,
      shadowX: 0,
      shadowY: 2,
      shadowBlur: 12,
      shadowColor: "#000000",
    },
  },

};

/* ---------------------------------------------------------------- helpers */

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep-merges stored content over defaults so new fields never break the site. */
export function mergeContent(stored: unknown): SiteContent {
  const merge = (base: unknown, override: unknown): unknown => {
    if (override === undefined || override === null) return base;
    if (Array.isArray(override)) return override;
    if (isPlainObject(base) && isPlainObject(override)) {
      const out: Record<string, unknown> = { ...base };
      for (const key of Object.keys(override)) out[key] = merge(base[key], override[key]);
      return out;
    }
    return override;
  };
  return merge(DEFAULT_CONTENT, stored) as SiteContent;
}

export function newId(prefix = "i") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
