'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight } from '@phosphor-icons/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { NarrativeBlock } from '@/components/ui/NarrativeBlock';
import projectsData from '@/data/projects.json';

interface HeroProject {
  id: string;
  title: string;
  tech: string[];
  narrative: { label: string; content: string }[];
}

interface ArchiveProject {
  id: string;
  title: string;
  tech: string[];
  mission: string;
  outcome: string;
}

const ProjectArchiveItem = ({ project }: { project: ArchiveProject }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-zinc-200 py-8 first:border-t-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between text-left focus:outline-none"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-12">
          <h4 className="text-xl font-medium tracking-tight text-zinc-900 md:text-2xl">
            {project.title}
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
                {t}
              </span>
            ))}
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
            <div className="grid grid-cols-1 gap-12 pt-10 md:grid-cols-2">
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                  The Mission
                </span>
                <p className="text-base leading-relaxed text-zinc-600">{project.mission}</p>
              </div>
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                  The Outcome
                </span>
                <p className="text-base leading-relaxed text-zinc-600">{project.outcome}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="relative bg-white py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionLabel index="04">Projects</SectionLabel>

        <div className="mt-24 space-y-40 md:mt-32">
          {/* Hero Projects - Pinned Narrative */}
          <div className="space-y-60">
            {projectsData.hero.map((project: HeroProject) => (
              <div key={project.id} className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-24">
                {/* Sticky Left Column */}
                <div className="md:sticky md:top-32 md:col-span-5">
                  <div className="space-y-8">
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t) => (
                        <span key={t} className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-4xl font-medium leading-[1.1] tracking-tighter text-zinc-900 md:text-6xl">
                      {project.title}
                    </h3>
                    <div className="inline-flex items-center gap-2 border-b border-zinc-900 pb-1 font-mono text-xs font-medium tracking-tight text-zinc-900 transition-colors hover:border-zinc-400 hover:text-zinc-500">
                      TECHNICAL SPEC
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Narrative Right Column */}
                <div className="md:col-span-7">
                  <div className="space-y-16">
                    {project.narrative.map((item, idx) => (
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
            <div className="mb-16 flex items-baseline justify-between border-b border-zinc-100 pb-10">
              <h3 className="text-3xl font-medium tracking-tight text-zinc-900">Project Archive</h3>
              <span className="font-mono text-xs text-zinc-400 uppercase">
                {projectsData.archive.length} Selected Artifacts
              </span>
            </div>
            <div className="divide-y divide-zinc-100">
              {projectsData.archive.map((project: ArchiveProject) => (
                <ProjectArchiveItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
