import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: HostingLanding,
});

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
        N
      </span>
      <span className="text-lg font-semibold tracking-tight">Nimbus</span>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="text-foreground">
          <Logo />
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-hero text-hero-foreground"
    >
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-hero-border bg-white/5 px-3 py-1 text-xs font-medium text-hero-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            New: Global edge network in 38 regions
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Cloud hosting built for{" "}
            <span className="text-accent">speed</span> and scale.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-hero-muted">
            Deploy in seconds with one-click setups, automatic SSL, and a
            global CDN that keeps your site fast everywhere. No DevOps degree
            required.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#pricing"
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
            >
              Start free for 14 days
            </a>
            <a
              href="#features"
              className="rounded-lg border border-hero-border bg-white/5 px-5 py-3 text-sm font-semibold text-hero-foreground backdrop-blur transition-colors hover:bg-white/10"
            >
              See how it works
            </a>
          </div>
          <p className="mt-4 text-xs text-hero-muted">
            No credit card required · Cancel anytime
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            ["99.99%", "Uptime SLA"],
            ["38", "Edge regions"],
            ["<40ms", "Avg. response"],
            ["24/7", "Expert support"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                {value}
              </div>
              <div className="mt-1 text-xs text-hero-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <img
        src={heroImg}
        alt="Global cloud hosting network spanning 38 edge regions"
        width={1600}
        height={1000}
        className="relative mx-auto block w-full max-w-6xl px-5"
        fetchPriority="high"
      />
    </section>
  );
}

function TrustBar() {
  const names = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "Raycast"];
  return (
    <div className="border-b border-border/70 bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-8">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by teams at
        </span>
        {names.map((n) => (
          <span
            key={n}
            className="text-lg font-semibold text-muted-foreground/70"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    title: "One-click deploys",
    body: "Connect your repo and ship to production in seconds. Automatic builds, rollbacks, and preview URLs on every push.",
    icon: (
      <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
    ),
  },
  {
    title: "Global edge CDN",
    body: "Your content is cached in 38 regions worldwide, so visitors get sub-40ms responses no matter where they are.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
  },
  {
    title: "Automatic SSL",
    body: "Free, auto-renewing TLS certificates on every domain. No manual setup, no expiry headaches, ever.",
    icon: (
      <>
        <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Instant scaling",
    body: "Traffic spikes handled automatically. Scale from one visitor to a million without touching a config file.",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M21 9h-4M21 9v4" />
      </>
    ),
  },
  {
    title: "Daily backups",
    body: "Automatic encrypted backups with one-click restore. Keep your data safe and sleep well at night.",
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
        <path d="M21 3v5h-5" />
      </>
    ),
  },
  {
    title: "24/7 human support",
    body: "Real engineers, not chatbots, available around the clock. Average first response under 5 minutes.",
    icon: (
      <>
        <path d="M21 11.5a8.5 8.5 0 1 1-2.5-6L21 4" />
        <path d="M21 1v4h-4" />
      </>
    ),
  },
];

function Features() {
  return (
    <section id="features" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Everything included
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Hosting that handles the hard parts for you
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Stop babysitting servers. Nimbus automates deploys, security, and
            scaling so you can focus on building.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  {f.icon}
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Starter",
    price: "$4",
    tagline: "For personal sites and side projects",
    features: [
      "1 website",
      "10 GB SSD storage",
      "Unmetered bandwidth",
      "Free SSL certificate",
      "Community support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "$12",
    tagline: "For growing businesses and apps",
    features: [
      "10 websites",
      "50 GB SSD storage",
      "Global edge CDN (38 regions)",
      "Daily automatic backups",
      "Staging environments",
      "Priority 24/7 support",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "$39",
    tagline: "For high-traffic and teams",
    features: [
      "Unlimited websites",
      "200 GB SSD storage",
      "Dedicated edge nodes",
      "Team access & roles",
      "Advanced analytics",
      "Dedicated account manager",
    ],
    featured: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="border-y border-border/70 bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Start free for 14 days. No credit card needed. Upgrade, downgrade,
            or cancel anytime.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                p.featured
                  ? "border-primary bg-card shadow-xl shadow-primary/10 lg:-translate-y-3"
                  : "border-border bg-card"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  {p.price}
                </span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    >
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    <span className="text-foreground/90">{feat}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-7 block rounded-lg px-4 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  p.featured
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "border border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                Choose {p.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    ["2.4M+", "Sites hosted"],
    ["180+", "Countries served"],
    ["12B", "Requests / day"],
    ["4.9/5", "Customer rating"],
  ];
  return (
    <section className="bg-background py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="text-center">
            <div className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              {value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "We migrated from a legacy host and cut our page load times in half. Deploys that used to take an afternoon now take 30 seconds.",
    name: "Priya Sharma",
    role: "CTO, Loopcart",
  },
  {
    quote:
      "The edge CDN alone is worth it. Our customers in Asia finally get the same speed as the ones next door to our office.",
    name: "Marcus Bell",
    role: "Founder, Northwind",
  },
  {
    quote:
      "Support actually knows what they're talking about. I asked about a weird caching edge case and got a real engineer in minutes.",
    name: "Elena Costa",
    role: "Lead Dev, Verdant",
  },
];

function Testimonials() {
  return (
    <section className="border-t border-border/70 bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Loved by builders
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            What our customers say
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-primary/30"
                fill="currentColor"
              >
                <path d="M7 7h4v4c0 3-1.5 5-4 6l-1-1c1.5-1 2-2 2-3H7V7Zm8 0h4v4c0 3-1.5 5-4 6l-1-1c1.5-1 2-2 2-3h-1V7Z" />
              </svg>
              <blockquote className="mt-4 text-pretty text-[15px] leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Can I try Nimbus before paying?",
    a: "Yes. Every plan starts with a 14-day free trial. No credit card required — you can explore all Pro features and only enter billing details if you decide to stay.",
  },
  {
    q: "Do you charge for bandwidth overages?",
    a: "No. All plans include unmetered bandwidth. We don't believe in surprise overage fees — the price you see is the price you pay.",
  },
  {
    q: "How fast can I migrate an existing site?",
    a: "Most sites migrate in under an hour. Our free migration plugin handles WordPress, static, and Node apps automatically, and our team will help with anything custom.",
  },
  {
    q: "What if I outgrow my plan?",
    a: "Upgrading is instant and prorated — your site keeps running with zero downtime. You can also downgrade anytime if your needs change.",
  },
  {
    q: "Is my data backed up?",
    a: "Pro and Scale plans include daily encrypted automatic backups with 30-day retention and one-click restore. You can also create manual snapshots anytime.",
  },
];

function Faq() {
  return (
    <section id="faq" className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            FAQ
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Questions, answered
          </h2>
        </div>
        <div className="mt-12 divide-y divide-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                {f.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="bg-background pb-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-3xl bg-hero px-6 py-14 text-center text-hero-foreground sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to ship faster?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-hero-muted">
              Join 2.4 million sites running on Nimbus. Start your free trial
              today — no credit card, no commitment.
            </p>
            <a
              href="#pricing"
              className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              Start free trial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact", "Press"],
    },
    {
      title: "Resources",
      links: ["Docs", "API reference", "Community", "Tutorials", "Migration"],
    },
  ];
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Cloud hosting built for speed, scale, and the people who actually
              have to use it.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nimbus Hosting, Inc. All rights
            reserved.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HostingLanding() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <Pricing />
        <Stats />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
