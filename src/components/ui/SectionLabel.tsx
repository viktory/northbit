interface SectionLabelProps {
  children: React.ReactNode;
  index: string;
}

/**
 * SectionLabel: Numbered indices with high-contrast accent color.
 * Designed for editorial-style hierarchy.
 */
export function SectionLabel({ children, index }: SectionLabelProps) {
  return (
    <div className="mb-16">
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-black block mb-4">
        {children}
      </span>
    </div>
  );
}
