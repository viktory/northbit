"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LOGOS = [
  { name: "Medallia", src: "/logos/medallia.svg", width: 107, height: 24 },
  { name: "Daytrip", src: "/logos/daytrip.svg", width: 84, height: 26, top: 8 },
  { name: "HelpCrunch", src: "/logos/helpcrunch.svg", width: 118, height: 34, top: 8 },
  { name: "SoftServe", src: "/logos/softserve.svg", width: 140, height: 20 },
  { name: "GreenIce", src: "/logos/greenice.svg", width: 74, height: 30, top: 8 },
];

/**
 * LogoCarousel: An infinite horizontal marquee for brand trust.
 */
export function LogoCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            className="cursor-default"
            title={logo.name}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image 
              src={logo.src} 
              alt={logo.name} 
              width={logo.width} 
              height={logo.height}
              style={{ height: logo.height, marginTop: logo.top ?? 0 }}
              className={`w-auto transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 brightness-100 invert-0' : 'opacity-40 brightness-0 invert'}`}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
