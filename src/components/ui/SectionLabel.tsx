interface SectionLabelProps {
  children: React.ReactNode;
}

/**
 * SectionLabel: high-contrast, wide-tracked editorial section heading.
 */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-16">
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-black block mb-4">
        {children}
      </span>
    </div>
  );
}
