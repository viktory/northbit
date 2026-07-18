"use client";

import { motion } from "framer-motion";

interface NarrativeBlockProps {
  children: React.ReactNode;
  label: string;
}

/**
 * NarrativeBlock: For the scroll-telling reveal interaction.
 * Uses calibrated motion for a smooth editorial feel.
 */
export function NarrativeBlock({ children, label }: NarrativeBlockProps) {
  return (
    // Outer layer: opacity-only dim/undim. Safe to repeat on every viewport
    // crossing because opacity never changes layout geometry, so it can't feed
    // back into the intersection test that drives it.
    <motion.div
      initial={{ opacity: 0.15 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-[300px] last:mb-0"
    >
      {/* Inner layer: one-time slide-up entrance. `once` lets the transform
          settle at y:0 and never re-animate, so a scrolled-away block can't
          oscillate its own intersection ratio (the cause of the jitter). */}
      <motion.div
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#bbb] block mb-4">
          {label}
        </span>
        <div className="text-3xl font-medium leading-[1.25] tracking-tight text-[#333]">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
