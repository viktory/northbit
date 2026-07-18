export interface ArchiveRole {
  id: string;
  company: string;
  role: string;
  period: string;
  mission: string;
  outcome: string;
}

interface ExperienceArchiveItemProps {
  role: ArchiveRole;
  number: number;
}

export const ExperienceArchiveItem = ({ role, number }: ExperienceArchiveItemProps) => {
  return (
    <div className="group border-b border-zinc-200 py-6 last:border-b-0 md:py-7">
      <div className="grid grid-cols-[1.75rem_1fr] items-baseline gap-x-4 md:grid-cols-[2.5rem_1fr] md:gap-x-6">
        {/* Ledger index */}
        <span className="font-mono text-[11px] text-zinc-400 transition-colors duration-300 group-hover:text-accent">
          {String(number).padStart(2, '0')}
        </span>

        <div>
          {/* Company + role + period on one line */}
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
              <h4 className="text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl">
                {role.company}
              </h4>
              <span className="text-base text-zinc-500 md:text-lg">{role.role}</span>
            </div>
            <span className="shrink-0 font-mono text-[10px] tracking-widest text-zinc-400 uppercase transition-colors duration-300 group-hover:text-zinc-900 md:text-[11px]">
              {role.period}
            </span>
          </div>

          {/* Merged detail line, always visible */}
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-500 md:text-[15px]">
            {role.mission} {role.outcome}
          </p>
        </div>
      </div>
    </div>
  );
};
