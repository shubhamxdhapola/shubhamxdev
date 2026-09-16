import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBriefcase, FiArrowRight, FiExternalLink, FiCalendar } from "react-icons/fi";
import Footer from "../components/Footer";
import { projectsData } from "../data/projects";
import { getTechLogo } from "../utils/techLogos";

export default function Work() {
  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden text-gray-300">
      {/* Background ambient radial glow */}
      <div className="absolute left-1/2 top-20 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#FF4ECD]/10 blur-[140px] pointer-events-none" />
      <div className="absolute right-10 top-64 -z-10 h-72 w-72 rounded-full bg-[#B3168A]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 -z-10 h-72 w-72 rounded-full bg-slate-500/5 blur-[120px] pointer-events-none" />

      <main className="relative px-4 sm:px-6 pb-24 pt-32 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#FF4ECD]/15 bg-[#FF4ECD]/5 px-3 py-1 text-sm font-medium text-[#FFD6F4]"
          >
            <FiBriefcase className="size-3.5" />
            <span>Project Case Studies</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Work that tells a{" "}
            <span className="bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] bg-clip-text text-transparent">
              real story
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-300 font-normal"
          >
            A closer look at the problems I solved, the decisions I made, and the
            lessons I learned while building full-stack products, dashboards, and
            client-focused web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex justify-center"
          >
            <Link
              to="#case-studies"
              onClick={(e) => {
                const el = document.getElementById("case-studies");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-[#FF4ECD]/25 active:scale-95"
            >
              <span>Browse case studies</span>
              <FiArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>

        {/* Case Studies Grid */}
        <div id="case-studies" className="mt-20">
          <div className="grid gap-8 md:grid-cols-2">
            {projectsData.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 35, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 p-4 sm:p-5 shadow-2xl shadow-black/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4ECD]/35 hover:bg-slate-950/70"
              >
                {/* Ambient corner blur */}
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#FF4ECD]/10 blur-3xl transition group-hover:bg-[#FF4ECD]/20 pointer-events-none" />

                <Link to={`/work/${project.slug}`} className="relative block">
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-[#FF4ECD]/20 bg-slate-950/70 px-3 py-1 text-xs font-medium text-[#FFD6F4] backdrop-blur-sm">
                      {project.type}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-5 space-y-3.5 p-1">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 font-semibold">
                      <span className="inline-flex items-center gap-1.5">
                        <FiCalendar className="size-3.5 text-[#FF4ECD]" />
                        {project.year}
                      </span>
                      <span>•</span>
                      <span>Full Stack Developer</span>
                    </div>

                    <h2 className="text-2xl font-bold text-white transition group-hover:text-[#FFD6F4]">
                      {project.title}
                    </h2>

                    <p className="text-sm font-semibold leading-relaxed text-gray-400/80 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.slice(0, 5).map((tech) => {
                        const logo = getTechLogo(tech);
                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300 transition-transform duration-200 hover:scale-105"
                          >
                            {logo && (
                              <img
                                src={logo}
                                alt={tech}
                                className="size-3.5 object-contain flex-shrink-0"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            )}
                            <span>{tech}</span>
                          </span>
                        );
                      })}
                    </div>

                    {/* Bottom CTA bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFD6F4]">
                        <span>Read case study</span>
                        <FiArrowRight className="size-4 transition group-hover:translate-x-1" />
                      </span>
                      <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 group-hover:text-white">
                        <FiExternalLink className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
