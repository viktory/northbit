'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NarrativeBlock } from '@/components/ui/NarrativeBlock';
import { TimelineStep } from '@/components/ui/TimelineStep';

export interface NarrativeEntry {
  label: string;
  content: string[];
}

interface PinnedNarrativeProps {
  id: string;
  narrative: NarrativeEntry[];
  // Left-column header. `title` is the company (Experience) or project name;
  // `subtitle` is the role (Experience) and is omitted for projects.
  title: string;
  subtitle?: string;
  // Optional content rendered above the title (e.g. Experience's period Pill).
  badge?: React.ReactNode;
  // Called when the whole block is hovered/unhovered, so the parent can own
  // the hover state and drive hover-dependent left-column content (the Pill).
  setIsHovered?: (isHovered: boolean) => void;
  // Optional content for the scrolling right column: `description` renders as a
  // standfirst line above the narrative blocks; `footer` sits below them (e.g.
  // a tech + links meta row).
  description?: string;
  footer?: React.ReactNode;
}

// The viewport region where a narrative block is considered "in focus",
// expressed as fractions of the viewport height from the top. The
// IntersectionObserver and the click-to-scroll target share these so a
// clicked step reliably lands inside the detection band.
const FOCUS_TOP = 0.35; // top of the focus band (35% down the viewport)
const FOCUS_BOTTOM = 0.45; // inset from the bottom (band ends at 55% down)

// Tracks which `.narrative-block-wrapper` inside `containerRef` currently
// covers the most of the viewport's focus band, and returns its index. Coverage
// is measured in pixels (intersectionRect.height), not intersectionRatio, so a
// short block sitting fully inside the band can't outrank a tall block that
// fills it. The coverage map persists across callbacks because the observer
// only reports blocks whose intersection changed.
const useActiveNarrativeIndex = (containerRef: React.RefObject<HTMLElement | null>) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const coverage = new Map<number, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number(entry.target.getAttribute('data-index'));
          coverage.set(idx, entry.isIntersecting ? entry.intersectionRect.height : 0);
        }

        let bestIdx = -1;
        let bestCoverage = 0;
        for (const [idx, height] of coverage) {
          if (height > bestCoverage) {
            bestCoverage = height;
            bestIdx = idx;
          }
        }
        if (bestIdx !== -1) setActiveIdx(bestIdx);
      },
      {
        rootMargin: `-${FOCUS_TOP * 100}% 0px -${FOCUS_BOTTOM * 100}% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    container.querySelectorAll('.narrative-block-wrapper').forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [containerRef]);

  return activeIdx;
};

export const PinnedNarrative = ({
  id,
  narrative,
  title,
  subtitle,
  badge,
  setIsHovered = () => {},
  description,
  footer,
}: PinnedNarrativeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIdx = useActiveNarrativeIndex(containerRef);

  const handleScrollToBlock = (index: number) => {
    // Scroll the block itself into view (anchor-based, no position math and no
    // URL change). Each block's `scroll-margin-top` is set to FOCUS_TOP, so its
    // top lands at the top of the observer's focus band and the clicked step is
    // the one detected as active.
    const block = containerRef.current?.querySelector(`[data-index="${index}"]`);
    block?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          {badge}
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tighter text-zinc-900 leading-none">
              {title}
            </h3>
            {subtitle ? (
              <p className="text-lg md:text-xl text-zinc-500 font-normal tracking-tight">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        {/* Dynamic Stepper timeline */}
        <div className="relative border-l border-zinc-200/80 pl-6 py-1 space-y-6">
          {narrative.map((item, idx) => (
            <TimelineStep
              key={idx}
              index={idx}
              isActive={idx === activeIdx}
              groupId={id}
              label={item.label}
              onClick={() => handleScrollToBlock(idx)}
            />
          ))}
        </div>
      </div>

      {/* Narrative Right Column */}
      <div className="lg:col-span-8">
        {description ? (
          <p className="mb-16 md:mb-20 max-w-2xl text-xl md:text-2xl font-normal leading-snug tracking-tight text-zinc-400">
            {description}
          </p>
        ) : null}
        <div className="space-y-12 md:space-y-16">
          {narrative.map((item, idx) => (
            <div
              key={idx}
              className="narrative-block-wrapper last:mb-0 mb-16 md:mb-24 lg:mb-40"
              data-index={idx}
              style={{ scrollMarginTop: `${FOCUS_TOP * 100}vh` }}
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
        {footer}
      </div>
    </div>
  );
};
