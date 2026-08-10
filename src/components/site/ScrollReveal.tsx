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

/** Render value exactly as provided by admin (no automatic counting). */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return <span ref={ref}>{value}</span>;
}
