'use client';

import { ArrowUpRightIcon } from '@phosphor-icons/react';

export interface ProjectLink {
  label: string;
  href: string;
}

/**
 * Links: a row of underlined project links with a trailing up-right arrow.
 * Shared by the project hero footer and the archive rows.
 */
export const Links = ({ links }: { links: ProjectLink[] }) => (
  <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-2">
    {links.map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs font-medium tracking-tight text-zinc-900 no-underline"
      >
        {link.label}
        <ArrowUpRightIcon size={14} />
      </a>
    ))}
  </div>
);
