"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Certificate, GraduationCap, SealCheck } from "@phosphor-icons/react";
import educationData from "@/data/education.json";

/**
 * Education & Certifications: Cinematic degree hero and "Side-Scrub" certification list.
 * Adheres to high-end design standards with tactical depth and fluid motion.
 */
export default function Education() {
  const [activeCert, setActiveCert] = useState(educationData.certifications[0]);

  return (
    <section className="py-24 md:py-40 max-w-[1400px] mx-auto px-6 lg:px-12 overflow-hidden">
      <SectionLabel index="05">Education & Recognition</SectionLabel>

      {/* University Degree: Cinematic Hero */}
      <div className="mb-32 md:mb-48">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-100 pb-12">
            <div className="max-w-[800px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-50 rounded-lg ring-1 ring-zinc-100">
                  <GraduationCap size={24} weight="light" className="text-zinc-500" />
                </div>
                <span className="text-[12px] font-mono tracking-widest text-zinc-400 uppercase">
                  Higher Education
                </span>
              </div>
              <h3 className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9] text-zinc-900 mb-8">
                {educationData.degree.title}
              </h3>
              <p className="text-xl md:text-2xl text-zinc-500 font-light max-w-[600px]">
                {educationData.degree.school}
              </p>
            </div>
            <div className="text-right">
              <span className="text-4xl md:text-6xl font-mono tracking-tighter text-zinc-200">
                {educationData.degree.period}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certifications: Side-Scrub Interaction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Side: Minimalist List */}
        <div>
          <div className="mb-12">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">
              Professional Certifications
            </h4>
            <div className="h-px w-12 bg-zinc-200" />
          </div>

          <div className="space-y-2">
            {educationData.certifications.map((cert, idx) => (
              <motion.button
                key={cert.id}
                onMouseEnter={() => setActiveCert(cert)}
                className="group w-full flex items-center text-left py-6 border-b border-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-8 w-full">
                  <span className={`text-[11px] font-mono transition-colors ${activeCert.id === cert.id ? 'text-zinc-900' : 'text-zinc-300 group-hover:text-zinc-500'}`}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h5 className={`text-lg md:text-xl lg:text-2xl font-medium transition-colors ${activeCert.id === cert.id ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'}`}>
                      {cert.name}
                    </h5>
                    <p className={`text-[13px] transition-colors ${activeCert.id === cert.id ? 'text-zinc-500' : 'text-zinc-300'}`}>
                      {cert.provider}
                    </p>
                  </div>
                  <motion.div
                    animate={{ x: activeCert.id === cert.id ? 0 : -10, opacity: activeCert.id === cert.id ? 1 : 0 }}
                    className="text-zinc-900"
                  >
                    <Certificate size={24} weight="light" />
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Side: Sticky Focus Area */}
        <div className="hidden lg:block">
          <div className="sticky top-40 h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCert.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[440px]"
              >
                <div className="bg-zinc-50/50 p-2 rounded-[3rem] ring-1 ring-zinc-100/50 backdrop-blur-sm relative">
                  <div className="bg-white p-12 rounded-[calc(3rem-0.5rem)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-zinc-100 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-8">
                      <SealCheck size={48} weight="thin" className="text-zinc-900" />
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                        Verification Record
                      </p>
                      <h6 className="text-2xl font-medium tracking-tight text-zinc-900">
                        {activeCert.name}
                      </h6>
                      <p className="text-zinc-500 text-sm">
                        Authenticated by {activeCert.provider}
                      </p>
                    </div>

                    <div className="pt-8 border-t border-zinc-50 w-full">
                      <span className="text-[10px] font-mono tracking-widest text-zinc-300 block mb-2">
                        CREDENTIAL_ID
                      </span>
                      <code className="text-[11px] font-mono text-zinc-400 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                        {activeCert.ref}
                      </code>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-zinc-100/30 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-zinc-50/50 blur-3xl rounded-full pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
