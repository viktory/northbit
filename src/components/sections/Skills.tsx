"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import skillsData from "@/data/skills.json";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tech } from "@/components/ui/Tech";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.25,
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

const HighlightText = ({ text, highlights = [] }: { text: string; highlights?: string[] }) => {
  let parts: React.ReactNode[] = [text];

  highlights.forEach((keyword) => {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return part;
      const regex = new RegExp(`(${keyword})`, "gi");
      const pieces = part.split(regex);
      return pieces.map((piece, i) =>
        piece.toLowerCase() === keyword.toLowerCase() ? (
          <span key={`${piece}-${i}`} className="text-accent">
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

export function Skills() {
  return (
    <section id="skills" className="py-32 md:py-48 px-6 md:px-12 bg-substrate overflow-hidden">
      <div className="max-w-350 mx-auto">
        <SectionLabel>Expertise</SectionLabel>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 md:gap-x-12 lg:gap-y-40"
        >
          {skillsData.map((skill, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`col-span-1 ${skill.gridClass || ""} group relative`}
              >
                <div className="flex flex-col gap-4 md:gap-8">
                  {/* Category Header */}
                  <div className="relative flex flex-col gap-1 select-none w-max">
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black text-[#111]">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-[clamp(1.75rem,6vw,6rem)] font-black leading-[0.95] md:leading-[0.9] tracking-tighter text-[#111] max-w-[15ch] md:max-w-none">
                    <HighlightText text={skill.title} highlights={skill.highlights} />
                  </h3>

                  <div className="flex flex-col gap-4 mt-2">
                    {skill.items?.length ? (
                      <div className="flex flex-wrap gap-x-3 gap-y-1.5 max-w-xl">
                        {skill.items.map((item) => (
                          <Tech key={item} label={item} />
                        ))}
                      </div>
                    ) : null}
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
