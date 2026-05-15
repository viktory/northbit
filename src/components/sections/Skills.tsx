"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import skillsData from "@/data/skills.json";
import { SectionLabel } from "@/components/ui/SectionLabel";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const keywords = [
  "Frontend Architecture",
  "Monorepos",
  "Design Systems",
  "React",
  "TypeScript",
  "Redux",
  "AI-assisted",
  "Node.js",
  "GraphQL",
  "Leadership",
  "Full-Stack",
];

const HighlightText = ({ text }: { text: string }) => {
  let parts: React.ReactNode[] = [text];

  keywords.forEach((keyword) => {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return part;
      const regex = new RegExp(`(${keyword})`, "gi");
      const pieces = part.split(regex);
      return pieces.map((piece, i) =>
        piece.toLowerCase() === keyword.toLowerCase() ? (
          <span key={`${piece}-${i}`} className="text-[#FF2A2A]">
            {piece}
          </span>
        ) : (
          piece
        )
      );
    });
  });

  return <>{parts}</>;
};

/**
 * Skills: Asymmetric Typography Wall
 * Highlights technical leadership and AI-assisted engineering expertise.
 * Uses Cabinet Grotesk at massive scale with staggered entry animations.
 */
export function Skills() {
  return (
    <section id="skills" className="py-32 md:py-48 px-6 md:px-12 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel index="02">Expertise</SectionLabel>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 md:gap-x-12 lg:gap-y-40"
        >
          {skillsData.map((skill, index) => {
            // Refined asymmetric grid for better tablet/mobile balance
            const gridClasses = [
              "lg:col-span-8 lg:col-start-1",
              "lg:col-span-7 lg:col-start-6",
              "lg:col-span-9 lg:col-start-1",
              "lg:col-span-6 lg:col-start-5",
            ];

            return (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                className={`col-span-1 ${gridClasses[index % gridClasses.length]} group relative`}
              >
                <div className="flex flex-col gap-4 md:gap-8">
                  {/* Category Header */}
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] md:text-[10px] font-mono text-[#888] tabular-nums tracking-widest">
                      ({skill.id})
                    </span>
                    <span className="h-[1px] w-6 md:w-8 bg-[#DDD] group-hover:w-12 md:group-hover:w-16 group-hover:bg-[#FF2A2A] transition-all duration-700 ease-[0.16,1,0.3,1]" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black text-[#111]">
                      {skill.category}
                    </span>
                  </div>

                  {/* Massive Typography Headline */}
                  <h3 className="text-[clamp(1.75rem,6vw,6rem)] font-black leading-[0.95] md:leading-[0.9] tracking-tighter text-[#111] max-w-[15ch] md:max-w-none">
                    <HighlightText text={skill.title} />
                  </h3>

                  {/* Pills & Metadata */}
                  <div className="flex flex-col gap-4 mt-2">
                    {skill.pills && (
                      <div className="flex flex-wrap gap-2">
                        {skill.pills.map((pill) => (
                          <span
                            key={pill}
                            className="px-3 py-1 bg-[#F5F2ED] border border-[#EBE8E2] text-[9px] uppercase tracking-widest font-black rounded-sm group-hover:border-[#FF2A2A]/30 transition-colors duration-500"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}

                    {skill.metadata && (
                      <div className="flex items-start gap-2">
                         <span className="text-[#FF2A2A] font-mono text-[10px] mt-1.5">›</span>
                         <p className="font-mono text-[11px] md:text-xs text-[#666] leading-relaxed max-w-xl">
                           {skill.metadata}
                         </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
