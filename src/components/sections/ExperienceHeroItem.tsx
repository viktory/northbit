'use client';

import React, { useState } from 'react';
import { Pill } from 'components';
import { PinnedNarrative } from '@/components/ui/PinnedNarrative';

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

interface PeriodBadgeProps {
  period: string;
  isHovered: boolean;
}

const PeriodBadge = ({ period, isHovered }: PeriodBadgeProps) => (
  <Pill
    size="sm"
    leftIcon={
      <span
        className="inline-block w-1.5 h-1.5 rounded-full transition-colors duration-300"
        style={{
          backgroundColor: isHovered
            ? 'var(--ui-color-accent, #ff2a2a)'
            : '#ca5f5f',
        }}
      />
    }
    className={`w-fit border-zinc-200/60! transition-all duration-300 ${
      isHovered ? 'opacity-100' : 'opacity-60 saturate-50'
    }`}
  >
    <span className="font-mono text-[9px] md:text-[10px] font-medium tracking-[0.15em] uppercase">
      {period}
    </span>
  </Pill>
);

export const ExperienceHeroItem = ({ exp }: ExperienceHeroItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PinnedNarrative
      id={exp.id}
      title={exp.company}
      subtitle={exp.role}
      narrative={exp.narrative}
      setIsHovered={setIsHovered}
      badge={<PeriodBadge period={exp.period} isHovered={isHovered} />}
    />
  );
};
