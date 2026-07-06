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
  narrative: { label: string; content: string }[];
}

interface ExperienceHeroItemProps {
  exp: HeroRole;
}

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
      rootMargin: '-35% 0px -45% 0px', // Focus window centered vertically
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute('data-index');
          if (indexAttr !== null) {
            setActiveIdx(parseInt(indexAttr, 10));
          }
        }
      });
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
      const top = block.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };

  const isPresent = exp.period.toUpperCase().includes('PRESENT');

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
            <span className="font-mono text-[9px] md:text-[10px] font-medium tracking-[0.15em] text-zinc-550 uppercase">
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
              className="narrative-block-wrapper last:mb-0 mb-32 md:mb-48 lg:mb-75"
              data-index={idx}
            >
              <NarrativeBlock label={item.label}>
                {item.content}
              </NarrativeBlock>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
