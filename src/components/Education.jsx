import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./reactbits/SpotlightCard";
import { educationData } from "../data/education";

export default function Education() {
  return (
    <section id="education" className="relative overflow-hidden py-20 text-gray-300">
      {/* Background radial blurs */}
      <div className="absolute top-20 right-10 -z-10 h-64 w-64 rounded-full bg-[#FF4ECD]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 -z-10 h-72 w-72 rounded-full bg-[#B3168A]/5 blur-3xl pointer-events-none" />

      {/* Section Heading */}
      <SectionHeading
        watermark="EDUCATION"
        title="Education"
        subtitle="ACADEMIC JOURNEY"
      />

      {/* Timeline Container */}
      <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6">
        <div className="relative pl-8 md:pl-12">
          {/* Vertical gradient connecting line */}
          <div className="absolute left-3.5 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-[#FF4ECD]/80 via-[#B3168A]/45 to-transparent" />

          {/* List of Education Cards */}
          <div className="space-y-6 md:space-y-8">
            {educationData.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 35, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {/* Timeline node icon with pulse */}
                <div className="absolute -left-[2.05rem] top-7 z-20 flex size-7 items-center justify-center rounded-full border border-[#FF4ECD]/50 bg-slate-950 shadow-[0_0_20px_rgba(255,78,205,0.3)] md:-left-[3.05rem] md:size-8">
                  <span className="size-2.5 rounded-full bg-gradient-to-r from-[#FFD6F4] to-[#FF4ECD] md:size-3 animate-pulse" />
                </div>

                {/* Card with ReactBits SpotlightCard */}
                <SpotlightCard
                  spotlightColor="rgba(255, 78, 205, 0.18)"
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/45 p-5 sm:p-6 shadow-2xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF4ECD]/35 hover:bg-slate-950/65 md:p-7"
                >
                  {/* Subtle inner card corner glow */}
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#FF4ECD]/10 blur-3xl transition-all duration-300 group-hover:bg-[#FF4ECD]/15 pointer-events-none" />

                  <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2.5">
                      {/* Education badge */}
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#FF4ECD]/15 bg-[#FF4ECD]/5 px-3 py-1 text-xs font-medium text-[#FFD6F4]">
                        <FaGraduationCap className="size-3.5" />
                        <span>Education</span>
                      </div>

                      {/* Degree & Institution */}
                      <div>
                        <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
                          {item.degree}
                        </h3>
                        <p className="mt-1.5 text-sm sm:text-base font-medium text-gray-300">
                          {item.institution}
                        </p>
                      </div>
                    </div>

                    {/* Date Pill */}
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs sm:text-sm text-[#FFD6F4] shrink-0">
                      <FiCalendar className="size-3.5 sm:size-4 text-[#FF4ECD]" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Grade / CGPA tag if available */}
                  {item.grade && (
                    <div className="relative mt-5 flex flex-wrap items-center gap-3">
                      <div className="h-px w-10 bg-gradient-to-r from-[#FF4ECD]/60 to-transparent" />
                      <p className="rounded-full border border-[#FF4ECD]/15 bg-[#FF4ECD]/10 px-4 py-1 text-xs sm:text-sm font-medium text-[#FFD6F4]">
                        {item.grade}
                      </p>
                    </div>
                  )}
                </SpotlightCard>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
