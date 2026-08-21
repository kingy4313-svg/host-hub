import { motion } from "framer-motion";

export type IconGridItem = {
  id: string;
  badge: React.ReactNode;
  label: React.ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Reusable staggered icon grid with gold hover glow.
 * Used by the Intro stats row and the Services row.
 */
export function AnimatedIconGrid({
  items,
  className,
  itemClassName,
  badgeClassName,
  stagger = 0.1,
  filled = false,
}: {
  items: IconGridItem[];
  className?: string;
  itemClassName?: string;
  badgeClassName?: string;
  stagger?: number;
  filled?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {items.map((it) => (
        <motion.div
          key={it.id}
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease } },
          }}
        >
          <span className={`${badgeClassName ?? ""} ${filled ? "icon-badge-filled" : "icon-badge"}`}>{it.badge}</span>
          <span className="icon-grid-label">{it.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
