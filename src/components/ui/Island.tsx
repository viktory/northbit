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
    <div className={`bg-white/5 p-1.5 rounded-full ring-1 ring-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group ${className}`}>
      {/* Subtle Refraction Border */}
      <div className="absolute inset-0 border border-white/20 rounded-full pointer-events-none z-20" />
      
      <motion.div 
        className="bg-zinc-900/50 rounded-full py-6 px-12 relative overflow-hidden"
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
