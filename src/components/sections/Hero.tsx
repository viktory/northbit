"use client";
import { motion } from "framer-motion";
import { Island } from "@/components/ui/Island";

/**
 * Design Plan:
 * - Architecture: Cinematic Center with Asymmetric Negative Space.
 * - Typography: Cabinet Grotesk (Black weight for H1).
 * - Motion: Fluid Spring Physics (100/20) + Cinematic Blur Reveal.
 * - Materiality: Double-Bezel Island with tactile inversion.
 */

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 md:px-10 py-32 text-center bg-substrate overflow-hidden">
      {/* Background Ambient Grain/Noise - Pointer events none */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3.5rem,10vw,8rem)] font-black tracking-tighter leading-[0.85] max-w-5xl mb-24 text-foreground selection:bg-accent selection:text-white"
        >
          Solving complex problems with elegant code.
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
          className="w-full max-w-2xl px-4"
        >
          <Island>
            <div className="flex justify-between items-center px-4 md:px-8 py-2 opacity-30 grayscale invert brightness-0 select-none">
               {/* Authentic heavy weights for authority */}
               <span className="font-black text-xs md:text-sm tracking-[0.2em]">GOOGLE</span>
               <span className="font-black text-xs md:text-sm tracking-[0.2em]">STRIPE</span>
               <span className="font-black text-xs md:text-sm tracking-[0.2em]">META</span>
               <span className="font-black text-xs md:text-sm tracking-[0.2em]">NETFLIX</span>
            </div>
          </Island>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase font-black tracking-[0.4em] text-foreground/60">
          Scroll to explore
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
