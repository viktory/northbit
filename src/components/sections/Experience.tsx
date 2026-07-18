'use client';

import { SectionLabel } from '@/components/ui/SectionLabel';
import experienceData from '@/data/experience.json';
import { ExperienceHeroItem, HeroRole } from './ExperienceHeroItem';
import { ExperienceArchiveItem, ArchiveRole } from './ExperienceArchiveItem';

export const Experience = () => {
  return (
    <section id="experience" className="relative bg-white py-24 md:py-40">
      <div className="mx-auto max-w-350 px-4 md:px-12">
        <SectionLabel index="03">Experience</SectionLabel>

        <div className="mt-16 md:mt-32 space-y-32 md:space-y-40">
          {/* Hero Roles - Pinned Narrative */}
          <div className="space-y-32 md:space-y-40">
            {experienceData.hero.map((exp: HeroRole) => (
              <ExperienceHeroItem key={exp.id} exp={exp} />
            ))}
          </div>

          {/* Archive - Ledger */}
          <div className="mt-40 md:mt-60">
            <div className="mb-8 md:mb-10 border-b border-zinc-900 pb-4 md:pb-5">
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900">Archive</h3>
            </div>
            <div>
              {experienceData.archive.map((role: ArchiveRole, i) => (
                <ExperienceArchiveItem
                  key={role.id}
                  role={role}
                  number={experienceData.hero.length + i + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
