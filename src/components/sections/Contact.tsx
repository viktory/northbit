'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, PaperPlaneTilt } from '@phosphor-icons/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Island } from '@/components/ui/Island';

/**
 * Contact: Split Contrast layout with high-authority CTA.
 * Left: Massive typography and direct email.
 * Right: Minimalist form within a Double-Bezel Island.
 */
export const Contact = () => {
  return (
    <section id="contact" className="relative bg-white py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionLabel index="06">Contact</SectionLabel>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-24">
          {/* Left Column: Massive CTA */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.9] tracking-tighter text-zinc-900">
                Let's Build <br className="hidden md:block" /> Together.
              </h2>
              
              <div className="mt-8 md:mt-16 lg:mt-24">
                <p className="text-[10px] md:text-sm font-mono tracking-widest text-zinc-400 uppercase mb-4">
                  Direct Line
                </p>
                <a 
                  href="mailto:v.lysenko@northbit.dev"
                  className="group inline-flex items-center gap-4 text-xl md:text-2xl lg:text-4xl font-medium tracking-tight text-zinc-900 transition-colors hover:text-zinc-500"
                >
                  v.lysenko@northbit.dev
                  <motion.div
                    whileHover={{ x: 5, y: -5 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white md:h-10 md:w-10 lg:h-12 lg:w-12 shrink-0"
                  >
                    <ArrowUpRight size={20} weight="bold" />
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Simple Form */}
          <div className="lg:col-span-5 w-full max-w-xl mx-auto lg:max-w-none">
            <Island>
              <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="name" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jane Cooper"
                    className="w-full border-b border-zinc-200 bg-transparent py-3 md:py-4 text-base md:text-lg font-medium tracking-tight text-zinc-900 placeholder:text-zinc-300 focus:border-zinc-900 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="email" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jane@example.com"
                    className="w-full border-b border-zinc-200 bg-transparent py-3 md:py-4 text-base md:text-lg font-medium tracking-tight text-zinc-900 placeholder:text-zinc-300 focus:border-zinc-900 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="message" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="How can we help?"
                    className="w-full border-b border-zinc-200 bg-transparent py-3 md:py-4 text-base md:text-lg font-medium tracking-tight text-zinc-900 placeholder:text-zinc-300 focus:border-zinc-900 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-between rounded-full bg-zinc-900 py-3 md:py-4 pl-6 md:pl-8 pr-3 md:pr-4 text-xs md:text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
                >
                  Send Inquiry
                  <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:scale-110">
                    <PaperPlaneTilt size={18} weight="bold" />
                  </div>
                </button>
              </form>
            </Island>
          </div>
        </div>
      </div>
    </section>
  );
};
