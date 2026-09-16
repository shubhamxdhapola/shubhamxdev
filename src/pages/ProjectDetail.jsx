import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiExternalLink,
  FiCalendar,
  FiBriefcase,
  FiLayers,
  FiAlertCircle,
  FiTrendingUp,
  FiCheckCircle,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import { HiSparkles, HiLightBulb } from "react-icons/hi2";
import { Github } from "../components/SocialIcons";
import { projectsData } from "../data/projects";
import { getTechLogo } from "../utils/techLogos";
import Footer from "../components/Footer";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData.find(
    (p) =>
      p.slug === slug ||
      (p.altSlugs && p.altSlugs.includes(slug)) ||
      p.id.toString() === slug
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-6">
          The project you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] px-6 py-2.5 text-sm font-bold text-slate-950"
        >
          <FiArrowLeft className="size-4" />
          Back to Work
        </Link>
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-300 overflow-x-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-[150px] opacity-25 pointer-events-none -z-10"
        style={{ backgroundColor: project.accentColor || "#FF4ECD" }}
      />
      <div className="absolute top-80 right-10 h-80 w-80 rounded-full bg-[#FF4ECD]/10 blur-[130px] pointer-events-none -z-10" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-14"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors border border-white/10 rounded-full p-2 md:px-4 md:py-1.5 bg-white/[0.02] hover:border-white/20 backdrop-blur-md"
          >
            <FiArrowLeft className="size-4" />
            <span className="hidden md:inline">Back to Work</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF4ECD]/30 bg-[#FF4ECD]/10 px-3.5 py-1 text-xs font-semibold text-[#FFD6F4]">
              <FiBriefcase className="size-3.5 text-[#FF4ECD]" />
              {project.type}
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <FiCalendar className="size-3.5 text-gray-400" />
              {project.year}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed font-normal"
          >
            {caseStudy?.subtitle || project.tagline}
          </motion.p>

          {/* Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {project.liveUrl && (
              <Link
                to={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-[#FF4ECD]/20 hover:shadow-[#FF4ECD]/30 transition hover:scale-[1.02] active:scale-95"
              >
                <span>Visit Live Site</span>
                <FiExternalLink className="size-4" />
              </Link>
            )}
            {project.githubUrl && (
              <Link
                to={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:border-white/30 hover:bg-white/[0.08] transition active:scale-95"
              >
                <Github className="size-4" />
                <span>Source Code</span>
              </Link>
            )}
          </motion.div>

          {/* Featured Hero Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pt-6"
          >
            <div
              className="relative overflow-hidden rounded-3xl border border-white/15 p-4 sm:p-8 shadow-2xl"
              style={{
                background: project.gradient || "linear-gradient(180deg, #111827 0%, #030712 100%)",
              }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-950/60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Quick Facts Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Role", value: caseStudy?.role || "Full Stack Developer" },
            { label: "Duration", value: caseStudy?.duration || "3 Months" },
            { label: "Team Size", value: caseStudy?.team || "Solo project" },
            { label: "Year", value: caseStudy?.year || project.year },
          ].map((fact, idx) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md hover:border-white/20 transition"
            >
              <span className="text-[13px] uppercase tracking-wider text-gray-400">{fact.label}</span>
              <p className="mt-2 text-base font-bold text-white">{fact.value}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Problem, Solution, Impact */}
        {caseStudy && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid md:grid-cols-3 gap-6"
          >
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 sm:p-7 backdrop-blur-md hover:border-[#FF4ECD]/30 transition"
            >
              <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 mb-5">
                <FiAlertCircle className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">The Problem</h3>
              <p className="text-sm font-semibold leading-relaxed text-gray-400/80">
                {caseStudy.problem}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 sm:p-7 backdrop-blur-md hover:border-[#FF4ECD]/30 transition"
            >
              <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-[#FF4ECD]/20 bg-[#FF4ECD]/10 text-[#FF4ECD] mb-5">
                <HiLightBulb className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">The Solution</h3>
              <p className="text-sm font-semibold leading-relaxed text-gray-400/80">
                {caseStudy.solution}
              </p>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 sm:p-7 backdrop-blur-md hover:border-[#FF4ECD]/30 transition"
            >
              <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 mb-5">
                <FiTrendingUp className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Key Impact</h3>
              <p className="text-sm font-semibold leading-relaxed text-gray-400/80">
                {caseStudy.impact}
              </p>
            </motion.div>
          </motion.section>
        )}

        {/* Tech Stack & Process */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid md:grid-cols-2 gap-8"
        >
          {/* Tech Stack */}
          <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-6">
              <FiLayers className="size-5 text-[#FF4ECD]" />
              <h2 className="text-xl font-bold text-white">Tech Stack & Tools</h2>
            </div>
            <p className="text-sm font-semibold text-gray-400/80 mb-6">
              Carefully chosen technologies to deliver performance, security, and developer ergonomics.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => {
                const logo = getTechLogo(tech);
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:scale-105"
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={tech}
                        className="size-4 object-contain flex-shrink-0"
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

            {project.techBadges && (
              <div className="mt-6 pt-6 border-t border-white/5">
                <span className="text-xs uppercase tracking-wider text-gray-400 block mb-3">
                  Core Frameworks
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.techBadges.map((badge) => {
                    const logo = badge.logo || getTechLogo(badge.name);
                    return (
                      <div
                        key={badge.name}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-transform duration-200 hover:scale-105"
                        style={{ borderColor: `${badge.color}33` }}
                      >
                        {logo ? (
                          <img
                            src={logo}
                            alt={badge.name}
                            className="size-4 object-contain flex-shrink-0"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <span
                            className="size-2 rounded-full"
                            style={{ backgroundColor: badge.color }}
                          />
                        )}
                        <span className="text-white">{badge.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Development Process */}
          <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-6">Development Process</h2>
            <div className="space-y-4">
              {(caseStudy?.process || [
                "Requirements scoping and wireframing",
                "Frontend architecture and reusable components",
                "Backend API and database integration",
                "Testing, optimization, and deployment",
              ]).map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#FF4ECD]/30 bg-[#FF4ECD]/10 text-xs font-bold text-[#FFD6F4]">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold leading-relaxed text-gray-400/80 pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Key Features, Challenges, and Learnings */}
        {caseStudy && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid md:grid-cols-3 gap-6"
          >
            {/* Key Features */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 sm:p-7 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <FiCheckCircle className="size-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Key Features</h3>
              </div>
              <ul className="space-y-3">
                {caseStudy.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-semibold text-gray-400/80">
                    <span className="text-emerald-400 mt-0.5">●</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 sm:p-7 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <FiShield className="size-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Challenges Solved</h3>
              </div>
              <ul className="space-y-3">
                {caseStudy.challenges.map((ch, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-semibold text-gray-400/80">
                    <span className="text-amber-400 mt-0.5">●</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learnings */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 sm:p-7 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <HiSparkles className="size-5 text-[#FF4ECD]" />
                <h3 className="text-base font-bold text-white">Key Learnings</h3>
              </div>
              <ul className="space-y-3">
                {caseStudy.learnings.map((lr, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-semibold text-gray-400/80">
                    <span className="text-[#FF4ECD] mt-0.5">●</span>
                    <span>{lr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}

        {/* Bottom CTA Card */}
        <motion.section
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950/80 p-8 sm:p-12 text-center backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FF4ECD]/15 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Want to build something like this?
          </h2>
          <p className="mt-3 font-semibold text-sm sm:text-base text-gray-400 max-w-lg mx-auto">
            I’m available for full-time engineering roles, freelance contracts, and interesting collaborations.
          </p>
          <div className="mt-6">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] px-7 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-[#FF4ECD]/25 hover:shadow-[#FF4ECD]/40 transition hover:scale-105 active:scale-95"
            >
              <span>Get in Touch</span>
              <FiArrowRight className="size-4" />
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
