"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LOGOS = [
  { name: "Medallia", src: "/logos/medallia.svg", width: 107, height: 24 },
  { name: "Daytrip", src: "/logos/daytrip.svg", width: 84, height: 24 },
  { name: "HelpCrunch", src: "/logos/helpcrunch.svg", width: 118, height: 24 },
  { name: "SoftServe", src: "/logos/softserve.svg", width: 140, height: 24 },
  { name: "GreenIce", src: "/logos/greenice.svg", width: 74, height: 24 },
];

/**
 * LogoCarousel: An infinite horizontal marquee for brand trust.
 */
export function LogoCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <motion.div 
        className="flex items-center whitespace-nowrap gap-24 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 30, 
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        {/* Double the logos for seamless loop */}
        {[...LOGOS, ...LOGOS].map((logo, index) => (
          <div 
            key={index} 
            className="transition-all duration-300 cursor-default opacity-30 hover:opacity-100"
            title={logo.name}
          >
            <Image 
              src={logo.src} 
              alt={logo.name} 
              width={logo.width} 
              height={logo.height}
              className="h-6 w-auto brightness-0 invert"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
