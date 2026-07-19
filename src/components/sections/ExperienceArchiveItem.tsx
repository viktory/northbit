import { LedgerRow } from '@/components/ui/LedgerRow';

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
    <LedgerRow
      number={number}
      title={role.company}
      subtitle={role.role}
      meta={
        <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase transition-colors duration-300 group-hover:text-zinc-900 md:text-[11px]">
          {role.period}
        </span>
      }
    >
      {/* Merged detail line, always visible */}
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-500 md:text-[15px]">
        {`${role.mission} ${role.outcome}`}
      </p>
    </LedgerRow>
  );
};
