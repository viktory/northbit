"use client";

import { motion } from "framer-motion";

const LOGOS = ["GOOGLE", "STRIPE", "META", "NETFLIX", "APPLE"];

/**
 * LogoCarousel: An infinite horizontal marquee for brand trust.
 */
export function LogoCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <motion.div 
        className="flex whitespace-nowrap gap-24 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 30, 
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        {/* Double the logos for seamless loop */}
        {[...LOGOS, ...LOGOS].map((logo, index) => (
          <span 
            key={index} 
            className="font-black text-xs tracking-[0.4em] text-white/30 hover:text-white/100 transition-colors cursor-default"
          >
            {logo}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
