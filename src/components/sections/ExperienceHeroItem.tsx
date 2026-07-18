'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NarrativeBlock } from '@/components/ui/NarrativeBlock';
import { Pill } from 'components';
import { TimelineStep } from './ExperienceTimelineStep';

export interface HeroRole {
  id: string;
  company: string;
  role: string;
  period: string;
  narrative: { label: string; content: string[] }[];
}

interface ExperienceHeroItemProps {
  exp: HeroRole;
}

// The viewport region where a narrative block is considered "in focus",
// expressed as fractions of the viewport height from the top. The
// IntersectionObserver and the click-to-scroll target share these so a
// clicked step reliably lands inside the detection band.
const FOCUS_TOP = 0.35; // top of the focus band (35% down the viewport)
const FOCUS_BOTTOM = 0.45; // inset from the bottom (band ends at 55% down)

export const ExperienceHeroItem = ({ exp }: ExperienceHeroItemProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect which narrative block is in the focal area of the viewport
    const narrativeBlocks = container.querySelectorAll('.narrative-block-wrapper');
    const observerOptions = {
      root: null,
      rootMargin: `-${FOCUS_TOP * 100}% 0px -${FOCUS_BOTTOM * 100}% 0px`, // Focus window centered vertically
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    };

    // Track how much of the focus band each block covers, in pixels. Using the
    // intersection height (not intersectionRatio, which is measured relative to
    // each block's own height) keeps the comparison fair across blocks of
    // different sizes, so a short block sitting fully inside the band can't
    // outrank a tall block that fills it.
    const coverage = new Map<number, number>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const indexAttr = entry.target.getAttribute('data-index');
        if (indexAttr === null) return;
        coverage.set(
          parseInt(indexAttr, 10),
          entry.isIntersecting ? entry.intersectionRect.height : 0,
        );
      });

      let bestIdx = -1;
      let bestCoverage = 0;
      coverage.forEach((height, idx) => {
        if (height > bestCoverage) {
          bestCoverage = height;
          bestIdx = idx;
        }
      });

      if (bestIdx !== -1) {
        setActiveIdx(bestIdx);
      }
    }, observerOptions);

    narrativeBlocks.forEach((block) => observer.observe(block));

    return () => {
      narrativeBlocks.forEach((block) => observer.unobserve(block));
      observer.disconnect();
    };
  }, []);

  const handleScrollToBlock = (index: number) => {
    const block = containerRef.current?.querySelector(`[data-index="${index}"]`);
    if (block) {
      // Land the block's top at the top of the observer's focus band so the
      // clicked step is the one detected as active.
      const top =
        block.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight * FOCUS_TOP;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-24 transition-all duration-300"
    >
      {/* Sticky Left Column */}
      <div className="lg:sticky lg:top-36 lg:col-span-4 space-y-8">
        <div className="space-y-4">
          {/* Period Badge */}
          <Pill 
            size="sm"
            leftIcon={
              <span
                className="inline-block w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{ 
                  backgroundColor: isHovered 
                    ? 'var(--ui-color-accent, #ff2a2a)' 
                    : '#ca5f5f' 
                }}
              />
            }
            className={`w-fit border-zinc-200/60! transition-all duration-300 ${
              isHovered 
                ? 'opacity-100' 
                : 'opacity-60 saturate-50'
            }`}
          >
            <span className="font-mono text-[9px] md:text-[10px] font-medium tracking-[0.15em] uppercase">
              {exp.period}
            </span>
          </Pill>

          {/* Company & Role Info */}
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tighter text-zinc-900 leading-none">
              {exp.company}
            </h3>
            <p className="text-lg md:text-xl text-zinc-500 font-normal tracking-tight">
              {exp.role}
            </p>
          </div>
        </div>

        {/* Dynamic Stepper timeline */}
        <div className="relative border-l border-zinc-200/80 pl-6 py-1 space-y-6">
          {exp.narrative.map((item, idx) => (
            <TimelineStep
              key={idx}
              index={idx}
              isActive={idx === activeIdx}
              expId={exp.id}
              label={item.label}
              onClick={() => handleScrollToBlock(idx)}
            />
          ))}
        </div>
      </div>

      {/* Narrative Right Column */}
      <div className="lg:col-span-8">
        <div className="space-y-12 md:space-y-16">
          {exp.narrative.map((item, idx) => (
            <div
              key={idx}
              className="narrative-block-wrapper last:mb-0 mb-16 md:mb-24 lg:mb-40"
              data-index={idx}
            >
              <NarrativeBlock label={item.label}>
                {item.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className={pIdx > 0 ? 'mt-6' : undefined}>
                    {paragraph}
                  </p>
                ))}
              </NarrativeBlock>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
