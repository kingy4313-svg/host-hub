import { motion } from "framer-motion";
import { useRef } from "react";

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

/** Renders numeric stat values reliably without animation glitches. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)(\d[\d,.]*)(.*)$/);

  if (!match) return <span ref={ref} className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {match[1]}
      {match[2]}
      {match[3]}
    </span>
  );
}
