'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NarrativeBlock } from '@/components/ui/NarrativeBlock';
import experienceData from '@/data/experience.json';

interface HeroRole {
  id: string;
  company: string;
  role: string;
  period: string;
  narrative: { label: string; content: string }[];
}

interface ArchiveRole {
  id: string;
  company: string;
  role: string;
  period: string;
  mission: string;
  outcome: string;
}

const ArchiveItem = ({ role }: { role: ArchiveRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-zinc-200 py-6 first:border-t-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-baseline justify-between text-left focus:outline-none"
      >
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
          <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
            {role.period}
          </span>
          <div className="flex flex-col">
            <h4 className="text-xl font-medium tracking-tight text-zinc-900 md:text-2xl">
              {role.company}
            </h4>
            <span className="text-sm text-zinc-500">{role.role}</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-100 bg-zinc-50 transition-colors group-hover:bg-zinc-100"
        >
          <Plus size={20} className="text-zinc-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
              <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                  The Mission
                </span>
                <p className="text-base leading-relaxed text-zinc-600">{role.mission}</p>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                  The Outcome
                </span>
                <p className="text-base leading-relaxed text-zinc-600">{role.outcome}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="relative bg-white py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionLabel index="03">Experience</SectionLabel>

        <div className="mt-24 space-y-40 md:mt-32">
          {/* Hero Roles - Pinned Narrative */}
          <div className="space-y-40">
            {experienceData.hero.map((exp: HeroRole) => (
              <div key={exp.id} className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-24">
                {/* Sticky Left Column */}
                <div className="md:sticky md:top-32 md:col-span-4">
                  <div className="space-y-4">
                    <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
                      {exp.period}
                    </span>
                    <h3 className="text-4xl font-medium tracking-tighter text-zinc-900 md:text-5xl">
                      {exp.company}
                    </h3>
                    <p className="text-xl text-zinc-500">{exp.role}</p>
                  </div>
                </div>

                {/* Narrative Right Column */}
                <div className="md:col-span-8">
                  <div className="space-y-12">
                    {exp.narrative.map((item, idx) => (
                      <NarrativeBlock
                        key={idx}
                        label={item.label}
                      >
                        {item.content}
                      </NarrativeBlock>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Archive - Accordion */}
          <div className="mt-60">
            <div className="mb-12 flex items-baseline justify-between border-b border-zinc-100 pb-8">
              <h3 className="text-3xl font-medium tracking-tight text-zinc-900">Archive</h3>
              <span className="font-mono text-xs text-zinc-400 uppercase">
                {experienceData.archive.length} Positions
              </span>
            </div>
            <div className="divide-y divide-zinc-100">
              {experienceData.archive.map((role: ArchiveRole) => (
                <ArchiveItem key={role.id} role={role} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
