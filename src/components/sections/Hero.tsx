"use client";

import { motion } from "framer-motion";
import { Island } from "@/components/ui/Island";
import { LogoCarousel } from "@/components/ui/LogoCarousel";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 bg-ink overflow-hidden">
      {/* Cinematic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Background Ambient Grain */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto text-center">
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3.5rem,10vw,7.5rem)] font-black tracking-tighter leading-[0.85] max-w-6xl mb-12 text-substrate selection:bg-accent/30"
        >
          Solving complex problems with <span className="text-substrate/40">elegant code.</span>
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-substrate/40 text-lg md:text-xl max-w-xl mb-24 leading-relaxed font-medium"
        >
          High-fidelity engineering for modern digital products. Focused on performance, clarity, and architectural integrity.
        </motion.p>
        
        {/* Trust Island */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 20 }}
          className="w-full max-w-3xl"
        >
          <Island>
            <LogoCarousel />
          </Island>
        </motion.div>
      </div>
    </section>
  );
}
