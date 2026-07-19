import { SectionLabel } from '@/components/ui/SectionLabel';
import { LedgerRow } from '@/components/ui/LedgerRow';
import { Tech } from '@/components/ui/Tech';
import { Links, ProjectLink } from '@/components/ui/Links';
import projectsData from '@/data/projects.json';
import { ProjectHeroItem, HeroProject } from './ProjectHeroItem';

interface ArchiveProject {
  id: string;
  title: string;
  description: string;
  narrative: string[];
  tech: string[];
  links: ProjectLink[];
}

export const Projects = () => {
  return (
    <section id="projects" className="relative bg-white py-24 md:py-40">
      <div className="mx-auto max-w-350 px-4 md:px-12">
        <SectionLabel>Projects</SectionLabel>

        <div className="mt-16 md:mt-32 space-y-32 md:space-y-40">
          {/* Hero Projects - Pinned Narrative */}
          <div className="space-y-32 md:space-y-40">
            {projectsData.hero.map((project: HeroProject) => (
              <ProjectHeroItem key={project.id} project={project} />
            ))}
          </div>

          {/* Archive - Ledger */}
          <div className="mt-40 md:mt-60">
            <div className="mb-8 md:mb-10 border-b border-zinc-900 pb-4 md:pb-5">
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-900">Archive</h3>
            </div>
            <div>
              {projectsData.archive.map((project: ArchiveProject, i) => (
                <LedgerRow
                  key={project.id}
                  number={projectsData.hero.length + i + 1}
                  title={project.title}
                >
                  {/* Description */}
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-500 md:text-[15px]">
                    {project.description}
                  </p>

                  {/* Narrative */}
                  <div className="mt-4 max-w-3xl space-y-3">
                    {project.narrative.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-sm leading-relaxed text-zinc-500 md:text-[15px]">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Tech tags + links */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
                    <div className="flex min-w-0 flex-1 flex-wrap gap-x-3 gap-y-1.5">
                      {project.tech.map((t) => (
                        <Tech key={t} label={t} />
                      ))}
                    </div>
                    <Links links={project.links} />
                  </div>
                </LedgerRow>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
