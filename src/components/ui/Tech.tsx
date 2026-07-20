interface TechProps {
  label: string;
  /**
   * Forces the darkened (hovered) style. The project hero drives block-hover via
   * React state and passes it here; the archive omits it and relies on its
   * `group` ancestor's `:hover` instead.
   */
  isHovered: boolean;
}

/**
 * Tech: a single technology tag — mono, uppercase, wide-tracked.
 * Darkens either when `active` is set, or when an unnamed `group` ancestor is
 * hovered (the archive row). Inert where neither applies (e.g. Skills).
 */
export const Tech = ({ label, isHovered = false }: TechProps) => (
  <span
    className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
      isHovered ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-900'
    }`}
  >
    {label}
  </span>
);
