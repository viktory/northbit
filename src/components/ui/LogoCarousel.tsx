"use client";

import { useState } from "react";
import Image from "next/image";
import { Carousel } from "components";

const LOGOS = [
  { name: "Medallia", src: "/logos/medallia.svg", width: 107, height: 24 },
  { name: "Daytrip", src: "/logos/daytrip.svg", width: 84, height: 26, top: 8 },
  { name: "HelpCrunch", src: "/logos/helpcrunch.svg", width: 118, height: 34, top: 8 },
  { name: "SoftServe", src: "/logos/softserve.svg", width: 140, height: 20 },
  { name: "GreenIce", src: "/logos/greenice.svg", width: 74, height: 30, top: 8 },
];

/**
 * LogoCarousel: An infinite horizontal marquee for brand trust,
 * powered by the Carousel component from the components library.
 */
export function LogoCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Carousel 
      speed={30}
      fadeEdges={true}
      innerClassName="gap-12 [&>div]:gap-12 [&>div]:items-center"
    >
      {LOGOS.map((logo, index) => (
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
    </Carousel>
  );
}
