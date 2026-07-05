"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "components";

// --- Types ---

interface NavLink {
  readonly name: string;
  readonly href: string;
}

// --- Configuration ---

const NAV_LINKS: readonly NavLink[] = [
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#experience" },
  { name: "History", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
] as const;

const SCROLL_THRESHOLD = 50;

// --- Hooks ---

/**
 * Manages scroll and section detection.
 */
const useNavbarScroll = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);

  useEffect(() => {
    // Scroll threshold for border/shadow
    const unsubScroll = scrollY.on("change", (latest) => {
      setIsScrolled(latest > SCROLL_THRESHOLD);
    });

    // Intersection observer for Hero section
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We consider we are "on Hero" if it's mostly visible
        setIsOnHero(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    const heroSection = document.getElementById("hero");
    if (heroSection) observer.observe(heroSection);

    return () => {
      unsubScroll();
      if (heroSection) observer.unobserve(heroSection);
    };
  }, [scrollY]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollY, scrollYProgress, isScrolled, isOnHero, scrollToSection };
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
  onClick,
  dark
}: { 
  name: string; 
  href: string; 
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  dark: boolean;
}) => (
  <Link
    href={href}
    onClick={(e) => onClick(e, href)}
    underline="none"
    className={`
      px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-widest 
      transition-all duration-300 active:scale-95 whitespace-nowrap
      ${dark 
        ? "text-substrate/50! hover:text-accent!" 
        : "text-caption! hover:text-accent!"}
    `}
  >
    {name}
  </Link>
));
NavLinkItem.displayName = "NavLinkItem";

// --- Main Component ---

/**
 * Global Navbar: Solid surface that adapts to section.
 */
export const Navbar = () => {
  const { isScrolled, isOnHero, scrollToSection } = useNavbarScroll();

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
          className={`
            pointer-events-auto
            w-full flex items-center justify-between
            px-6 md:px-12 lg:px-20 py-4
            transition-all duration-500
            ${isOnHero ? "bg-ink" : "bg-substrate"}
            ${isScrolled 
              ? isOnHero 
                ? "border-b border-substrate/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]" 
                : "border-b border-ink/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
              : "border-b border-transparent"}
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
                dark={isOnHero}
              />
            ))}
          </div>
        </motion.nav>
      </header>
    </>
  );
};
