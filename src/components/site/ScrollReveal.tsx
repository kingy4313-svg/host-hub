import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + subtle upward slide when scrolled into view. Animates once. */
export function ScrollReveal({
  children,
  delay = 0,
  as = "div",
  className,
  y = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "span";
  className?: string;
  y?: number;
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </M>
  );
}

/** Staggers direct children (each wrapped in <RevealItem>). */
export function ScrollRevealGroup({
  children,
  className,
  stagger = 0.12,
  amount = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export const revealItemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={revealItemVariants}>
      {children}
    </motion.div>
  );
}

/** Counts numbers up from 0 when scrolled into view (once). Keeps prefixes/suffixes static. */
export function CountUp({ value, duration = 1800 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const match = value.match(/^(\D*)(\d[\d,.]*)(.*)$/);
  const target = match ? Number(match[2]!.replace(/[,.]/g, "")) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, match]);

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {match[1]}
      {n}
      {match[3]}
    </span>
  );
}
