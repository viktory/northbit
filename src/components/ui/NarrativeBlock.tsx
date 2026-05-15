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
    <motion.div 
      initial={{ opacity: 0.15, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.6 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-[300px] last:mb-0"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#bbb] block mb-4">
        {label}
      </span>
      <div className="text-3xl font-medium leading-[1.25] tracking-tight text-[#333]">
        {children}
      </div>
    </motion.div>
  );
}
