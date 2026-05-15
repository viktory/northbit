"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Link } from "components";

// --- Types ---

interface NavLink {
  readonly name: string;
  readonly href: string;
}

// --- Configuration ---

const NAV_LINKS: readonly NavLink[] = [
  { name: "Work", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "History", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
] as const;

const SCROLL_THRESHOLD = 50;
const SCROLL_OFFSET = 100;

// --- Hooks ---

/**
 * Manages scroll-related state and interactions.
 */
const useNavbarScroll = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > SCROLL_THRESHOLD);
    });
  }, [scrollY]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollY, scrollYProgress, isScrolled, scrollToSection };
};

/**
 * Computes Liquid Glass styling based on scroll position.
 */
const useNavbarStyles = (scrollY: MotionValue<number>) => {
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(253, 251, 247, 0)", "rgba(253, 251, 247, 0.7)"]
  );
  
  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    [
      "0 0 0 0 rgba(0,0,0,0)",
      "0 20px 40px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)"
    ]
  );

  return useMemo(() => ({
    backgroundColor,
    backdropFilter,
    boxShadow,
  }), [backgroundColor, backdropFilter, boxShadow]);
};

// --- Sub-components ---

/**
 * Visual progress indicator for page scroll.
 */
export const ScrollIndicator = React.memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-indicator"
      style={{ scaleX }}
    />
  );
});
ScrollIndicator.displayName = "ScrollIndicator";

/**
 * Individual navigation link with smooth scroll behavior.
 */
const NavLinkItem = React.memo(({ 
  name, 
  href, 
  onClick 
}: { 
  name: string; 
  href: string; 
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void 
}) => (
  <Link
    href={href}
    onClick={(e) => onClick(e, href)}
    underline="none"
    className="px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-widest text-zinc-600! hover:text-accent! transition-all duration-300 active:scale-95 whitespace-nowrap"
  >
    {name}
  </Link>
));
NavLinkItem.displayName = "NavLinkItem";

// --- Main Component ---

/**
 * Global Navbar: Floating Liquid Glass Pill.
 * Implements Rule 4: Liquid Glass Refraction.
 */
export const Navbar = () => {
  const { scrollY, isScrolled, scrollToSection } = useNavbarScroll();
  const styles = useNavbarStyles(scrollY);

  return (
    <>
      <ScrollIndicator />

      <header className="fixed top-0 left-0 right-0 z-50 flex w-full pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2
          }}
          style={styles}
          className={`
            pointer-events-auto
            w-full flex items-center justify-between
            px-6 md:px-12 lg:px-20 py-4
            border-b transition-colors duration-500
            ${isScrolled ? "border-zinc-200/50" : "border-transparent"}
          `}
        >
          {/* Support for potential Logo here */}
          <div className="flex-1 hidden md:block" />

          {/* Navigation Links */}
          <div className="flex items-center gap-2 md:gap-4 justify-center md:justify-end">
            {NAV_LINKS.map((link) => (
              <NavLinkItem
                key={link.name}
                name={link.name}
                href={link.href}
                onClick={scrollToSection}
              />
            ))}
          </div>
        </motion.nav>
      </header>
    </>
  );
};
