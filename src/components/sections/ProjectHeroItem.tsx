'use client';

import React, { useState } from 'react';
import { PinnedNarrative } from '@/components/ui/PinnedNarrative';
import { Tech } from '@/components/ui/Tech';
import { Links, ProjectLink } from '@/components/ui/Links';

export interface HeroProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  narrative: { label: string; content: string[] }[];
}

interface ProjectHeroItemProps {
  project: HeroProject;
}

const TechStack = ({ tech, isHovered }: { tech: string[]; isHovered: boolean }) => (
  <div className="flex min-w-0 flex-1 flex-wrap gap-x-3 gap-y-1.5">
    {tech.map((t) => (
      <Tech key={t} label={t} isHovered={isHovered} />
    ))}
  </div>
);

export const ProjectHeroItem = ({ project }: ProjectHeroItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PinnedNarrative
      id={project.id}
      title={project.title}
      narrative={project.narrative}
      description={project.description}
      setIsHovered={setIsHovered}
      footer={
        <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-zinc-200 pt-8">
          <TechStack tech={project.tech} isHovered={isHovered} />
          <Links links={project.links} />
        </div>
      }
    />
  );
};
