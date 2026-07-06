'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TimelineStepProps {
  index: number;
  isActive: boolean;
  expId: string;
  label: string;
  onClick: () => void;
}

export const TimelineStep = ({ index, isActive, expId, label, onClick }: TimelineStepProps) => {
  const parts = label.split(' / ');
  const numStr = parts[0] || `0${index + 1}`;
  const titleStr = parts[1] || label;

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-row items-baseline gap-2.5 text-left focus:outline-none w-full cursor-pointer"
    >
      {/* Active Indicator Bar on the border line */}
      {isActive && (
        <motion.div
           layoutId={`active-bar-${expId}`}
          className="absolute left-[-25.5px] top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full"
          style={{ backgroundColor: 'var(--ui-color-accent, #ff2a2a)' }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      )}

      <span
        className={`font-mono text-[9px] md:text-[10px] tracking-widest uppercase transition-colors duration-300 ${
          isActive 
            ? 'text-accent' 
            : 'text-zinc-400 group-hover:text-(--ui-color-accent,#ff2a2a)'
        }`}
        style={{ color: isActive ? 'var(--ui-color-accent, #ff2a2a)' : undefined }}
      >
        {numStr}
      </span>
      <span
        className={`text-sm font-medium tracking-tight transition-all duration-300 ${
          isActive
            ? 'text-zinc-950 font-semibold translate-x-1'
            : 'text-zinc-500 group-hover:text-zinc-950 group-hover:translate-x-0.5'
        }`}
      >
        {titleStr}
      </span>
    </button>
  );
};
