const heroImg = "https://source.unsplash.com/1600x900/?stage,anchor,event";
const eventCorporate = "https://source.unsplash.com/800x450/?conference,corporate,event";
const eventCelebrity = "https://source.unsplash.com/800x450/?celebrity,redcarpet,event";
const eventAwards = "https://source.unsplash.com/800x450/?awards,stage,event";
const eventWedding = "https://source.unsplash.com/800x450/?wedding,celebration,event";

/* ------------------------------------------------------------------ types */

export type MediaType = "image" | "video";

export type NavItem = { id: string; label: string; href: string };
export type SocialLink = { id: string; platform: string; url: string };
export type StatItem = { id: string; icon: string; iconImageUrl?: string; value: string; label: string };
export type ReasonCard = { id: string; title: string; text: string; goldTitle: boolean };
export type MomentItem = {
  posterUrl: any;
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
  label: string;
  caption: string;
  overlayIcon: string;
  overlayLink: string;
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
    mediaType: MediaType;
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
    items: MomentItem[];
    archiveItems: MomentItem[];
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
    mediaType: "image",
    line1: "Anchor",
    line2: "Sayanti",
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
      { id: "st1", icon: "Clock", value: "9+", label: "YRS" },
      { id: "st2", icon: "Globe", value: "", label: "INDIA & ABROAD" },
      { id: "st3", icon: "Mic", value: "900+", label: "EVENTS" },
      { id: "st4", icon: "Instagram", value: "36K+", label: "FAMILY" },
      { id: "st5", icon: "Users", value: "1000+", label: "HAPPY CLIENTS" },
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
        id: "f1", mediaUrl: "https://ik.imagekit.io/c35lggggf/New%20Folder/1754227470618544.mp4?updatedAt=1754227938923", mediaType: "video", label: "Corporate Conference", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f2", mediaUrl: "https://ik.imagekit.io/c35lggggf/New%20Folder/1754230942576482.mp4?updatedAt=1754231155543", mediaType: "video", label: "CELEBRITY EVENTS", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f3", mediaUrl: "https://ik.imagekit.io/c35lggggf/New%20Folder/1754229141999439.mp4?updatedAt=1754229441129", mediaType: "video", label: "TTK Healthcare", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f4", mediaUrl: "https://ik.imagekit.io/c35lggggf/New%20Folder/Let%20rgv%20Sir%20explain%20how%20bold%20is%20BOLD%20in%202022%20_%20sayantibanerjee%20anchor%20emcee%20mumbaianchor%20love%20-%20SAYANTI%20BANERJEE%20_%20Anchor%20_%20Emcee%20%E2%9A%93Mumbai%20(360p,%20h264).mp4?updatedAt=1754230462630", mediaType: "video", label: "Team Building Games", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f5", mediaUrl: "https://ik.imagekit.io/c35lggggf/New%20Folder/1754229834143026.mp4?updatedAt=1754230171856", mediaType: "video", label: "Acting Career", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f6", mediaUrl: "https://ik.imagekit.io/gswp1sn65/New%20Folder/WhatsApp%20Video%202025-08-05%20at%2023.15.45%20(1).mp4?updatedAt=1754420341455", mediaType: "video", label: "Team Building Games", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f7", mediaUrl: "https://ik.imagekit.io/gswp1sn65/New%20Folder/WhatsApp%20Video%202025-08-05%20at%2023.27.01%20(1).mp4?updatedAt=1754420844406", mediaType: "video", label: "Team Building Games", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f8", mediaUrl: "https://ik.imagekit.io/gswp1sn65/New%20Folder/WhatsApp%20Video%202025-08-05%20at%2023.24.34%20(1).mp4?updatedAt=1754420901384", mediaType: "video", label: "Team Building Games", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f9", mediaUrl: "https://ik.imagekit.io/gswp1sn65/New%20Folder/WhatsApp%20Video%202025-08-05%20at%2023.19.15%20(1).mp4?updatedAt=1754420902384", mediaType: "video", label: "Team Building Games", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f10", mediaUrl: "https://youtu.be/BdvIeVgWNRk?si=x1iW-s6amr5P766c", mediaType: "video", label: "Team Building Games", caption: "", overlayIcon: "", overlayLink: "",
        posterUrl: undefined
      },
      {
        id: "f11",
        mediaUrl: "https://ik.imagekit.io/c35lggggf/videos/1754227470618544.mp4?updatedAt=1754227938923",
        mediaType: "video",
        label: "Corporate Conference (MP4)",
        caption: "",
        overlayIcon: "",
        overlayLink: "",
        posterUrl: undefined
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
    items: [
      { id: "pe1", posterUrl: undefined, mediaUrl: "https://i.ibb.co/M5fWpkWg.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe2", posterUrl: undefined, mediaUrl: "https://i.ibb.co/sfBdwWm.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe3", posterUrl: undefined, mediaUrl: "https://i.ibb.co/20wsjcXH.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe4", posterUrl: undefined, mediaUrl: "https://i.ibb.co/k2cYGQHh.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe5", posterUrl: undefined, mediaUrl: "https://i.ibb.co/VcP3967P.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe6", posterUrl: undefined, mediaUrl: "https://i.ibb.co/KjxzbM7J.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe7", posterUrl: undefined, mediaUrl: "https://i.ibb.co/DHSnfcV9.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe8", posterUrl: undefined, mediaUrl: "https://i.ibb.co/DSxKhHv.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe9", posterUrl: undefined, mediaUrl: "https://i.ibb.co/20c3mz8v.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe10", posterUrl: undefined, mediaUrl: "https://i.ibb.co/gM5N0jNv.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe11", posterUrl: undefined, mediaUrl: "https://i.ibb.co/S4Q9DXn3.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe12", posterUrl: undefined, mediaUrl: "https://i.ibb.co/3m8mXZC8.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe13", posterUrl: undefined, mediaUrl: "https://i.ibb.co/PZXK2Vx9.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe14", posterUrl: undefined, mediaUrl: "https://i.ibb.co/4nDZpq9k.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe15", posterUrl: undefined, mediaUrl: "https://i.ibb.co/YTNthjgs.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe16", posterUrl: undefined, mediaUrl: "https://i.ibb.co/hF9vLJxN.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe17", posterUrl: undefined, mediaUrl: "https://i.ibb.co/HLS8tRr2.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe18", posterUrl: undefined, mediaUrl: "https://i.ibb.co/PvSDX222.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe19", posterUrl: undefined, mediaUrl: "https://i.ibb.co/rfMm04Vz.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe20", posterUrl: undefined, mediaUrl: "https://i.ibb.co/84NRPx5B.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe21", posterUrl: undefined, mediaUrl: "https://i.ibb.co/ds6RBg6J.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe22", posterUrl: undefined, mediaUrl: "https://i.ibb.co/QF5ys3td.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe23", posterUrl: undefined, mediaUrl: "https://i.ibb.co/4RDyQBmy.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe24", posterUrl: undefined, mediaUrl: "https://i.ibb.co/MyQKzVPP.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe25", posterUrl: undefined, mediaUrl: "https://i.ibb.co/bRbCrMjk.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe26", posterUrl: undefined, mediaUrl: "https://i.ibb.co/tpj4nK0Z.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe27", posterUrl: undefined, mediaUrl: "https://i.ibb.co/rKkVdXk8.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe28", posterUrl: undefined, mediaUrl: "https://i.ibb.co/Zzc226bQ.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe29", posterUrl: undefined, mediaUrl: "https://i.ibb.co/pr6pT5QH.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe30", posterUrl: undefined, mediaUrl: "https://i.ibb.co/Zz3Sqv5S.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe31", posterUrl: undefined, mediaUrl: "https://i.ibb.co/pjsWy6dT.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe32", posterUrl: undefined, mediaUrl: "https://i.ibb.co/KgJwwpZ.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe33", posterUrl: undefined, mediaUrl: "https://i.ibb.co/67JRBC07.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
      { id: "pe34", posterUrl: undefined, mediaUrl: "https://i.ibb.co/Wpggpmkv.jpg", mediaType: "image", label: "Past Event", caption: "", overlayIcon: "", overlayLink: "" },
    ],
    archiveItems: [
      { id: "ar1", posterUrl: undefined, mediaUrl: eventCorporate, mediaType: "image", label: "Corporate Highlights", caption: "Corporate conferences and workshops.", overlayIcon: "", overlayLink: "" },
      { id: "ar2", posterUrl: undefined, mediaUrl: eventAwards, mediaType: "image", label: "Award Nights", caption: "Award ceremonies and gala evenings.", overlayIcon: "", overlayLink: "" },
    ],
  },
  works: {
    heading: "My Works",
    tabs: [
      {
        id: "tb1", name: "Corporate Conference",
        items: [
          { id: "wk1", thumbUrl: eventCorporate, title: "Corporate Conference Event", category: "Corporate Conference", duration: "9:47", videoUrl: "https://www.youtube.com/watch?v=gb1GC3GkA-U&t=7s", openNewTab: true },
          { id: "wk2", thumbUrl: eventAwards, title: "Business Conference Hosting", category: "Corporate Conference", duration: "3:30", videoUrl: "https://www.youtube.com/watch?v=Tf_wDyNqbN4", openNewTab: true },
          { id: "wk3", thumbUrl: eventCelebrity, title: "Corporate Event Management", category: "Corporate Conference", duration: "1:27", videoUrl: "https://www.youtube.com/watch?v=8j0E0bWlhpU&t=1s", openNewTab: true },
          { id: "wk4", thumbUrl: "https://i.ytimg.com/vi/lZZ4PK8J8tg/hqdefault.jpg", title: "IHFF Mumbai Anchoring🎤 @ihff_sheruclassic @RiteBiteMaxProteinTV  #anchormumbai #anchorsayanti #nesco", category: "Corporate Conference", duration: "", videoUrl: "https://www.youtube.com/watch?v=lZZ4PK8J8tg", openNewTab: true },
          { id: "wk5", thumbUrl: "https://i.ytimg.com/vi/fA-qUgjhX5E/hqdefault.jpg", title: "TITAN FESTIVE FUSION 🎤 Retailers, Dealers, CP Meet & Product Launch for ✨ Diwali & Festive Season ✨", category: "Corporate Conference", duration: "", videoUrl: "https://www.youtube.com/watch?v=fA-qUgjhX5E", openNewTab: true },
          { id: "wk6", thumbUrl: "https://i.ytimg.com/vi/pfNmAlN-bQ4/hqdefault.jpg", title: "🌀Ingredion Conference🎤 Knowledge Sharing & Collaborations #mumbaianchor #anchorsayanti #anchormumbai", category: "Corporate Conference", duration: "", videoUrl: "https://www.youtube.com/watch?v=pfNmAlN-bQ4&t=100s", openNewTab: true },
          { id: "wk7", thumbUrl: "https://i.ytimg.com/vi/tAo-JIHr5iU/hqdefault.jpg", title: "🎤NoTime Like #showtime 💚 #bwfm #bwbusinessworld #sayantibanerjee #bwfmexcellence #bwfmawards #awards", category: "Corporate Conference", duration: "", videoUrl: "https://www.youtube.com/watch?v=tAo-JIHr5iU", openNewTab: true },
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
