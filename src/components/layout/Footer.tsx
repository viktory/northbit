'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Footer: Minimalist row with initials, social links, and copyright.
 * Adheres to high-end design standards with extreme typographic contrast.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-100 py-12 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo / Initials */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-black tracking-tighter text-zinc-900"
          >
            VB<span className="text-zinc-300">.</span>
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-8 md:gap-12">
            {[
              { label: 'GitHub', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'X (Twitter)', href: '#' },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 transition-colors hover:text-zinc-400"
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
            © {currentYear} NorthBit / V. Lysenko — ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};
