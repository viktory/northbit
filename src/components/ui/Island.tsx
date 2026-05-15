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
        className="bg-white rounded-[calc(2rem-0.375rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] shadow-sm"
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
