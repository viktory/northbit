"use client";

import { motion } from "framer-motion";

interface IslandProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Island: A tactile, nested container with internal refraction borders.
 * Uses the "Double-Bezel" (Doppelrand) technique for premium depth.
 */
export function Island({ children, className = "" }: IslandProps) {
  return (
    <div className={`bg-black/5 p-1.5 rounded-[2rem] ring-1 ring-black/5 ${className}`}>
      <motion.div 
        className="bg-surface rounded-[calc(2rem-0.375rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] shadow-sm relative overflow-hidden"
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Subtle Refraction Border */}
        <div className="absolute inset-0 border border-white/40 rounded-[inherit] pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
