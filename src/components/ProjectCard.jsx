import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiExternalLink, FiChevronRight } from "react-icons/fi";
import { Github } from "./SocialIcons";
import SpotlightCard from "./reactbits/SpotlightCard";
import ScrollFloat from "./reactbits/ScrollFloat";
import ScrollReveal from "./reactbits/ScrollReveal";
import { getTechLogo } from "../utils/techLogos";

export default function ProjectCard({ project, isActive, onMouseEnter }) {
  return (
    <div
      className="project-card flex w-full flex-col"
      onMouseEnter={() => onMouseEnter && onMouseEnter(project)}
    >
      <div className="flex flex-col lg:mx-2 lg:w-full">
        {/* Main Display Card with ReactBits SpotlightCard */}
        <SpotlightCard
          spotlightColor="rgba(255, 78, 205, 0.22)"
          className="w-full"
        >
          <Link
            to={project.liveUrl || `/work/${project.slug}`}
            target={project.liveUrl ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`relative cursor-pointer overflow-hidden rounded-2xl border bg-white/[0.03] p-1.5 shadow-2xl lg:h-[520px] lg:rounded-3xl lg:p-2 block group transition-all duration-300 ${isActive
              ? "border-white/30 shadow-[0_0_35px_rgba(0,0,0,0.6)] lg:scale-[1.008]"
              : "border-white/10 opacity-90 hover:opacity-100 hover:border-white/25"
              }`}
          >
            {/* Top subtle highlight shimmer border */}
            <div
              className="absolute inset-x-8 top-0 h-px z-10"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0) 5%, rgba(255,255,255,0.8) 50%, rgba(0,0,0,0) 95%)",
              }}
            />

            {/* Inner card container */}
            <div className="relative flex size-full flex-col items-center justify-between overflow-hidden rounded-xl lg:rounded-2xl transition-all duration-300">
              {/* Project specific gradient background */}
              <div
                className="absolute inset-0 -z-10 transition-transform duration-300 group-hover:scale-105"
                style={{ background: project.gradient }}
              />

              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

              {/* Desktop header description & arrow */}
              <div
                className={`w-full flex-row items-center justify-between px-8 sm:px-12 py-7 hidden md:flex ${project.textColor} opacity-95`}
              >
                <div className="max-w-[85%] text-xl lg:text-2xl font-bold leading-snug tracking-wide">
                  <ScrollFloat
                    containerClassName="my-0"
                    textClassName="text-xl lg:text-2xl font-bold leading-snug tracking-wide "
                    scrollStart="top bottom-=10%"
                    scrollEnd="center center"
                    stagger={0.015}
                  >
                    {project.tagline}
                  </ScrollFloat>
                </div>
                <div className="size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:translate-x-1.5 group-hover:bg-white group-hover:text-black">
                  <FiArrowRight className="size-5 transition-colors group-hover:text-black text-white" />
                </div>
              </div>

              {/* Project mockup / screenshot preview */}
              <div className="w-full flex justify-center mt-4 md:mt-0">
                <div
                  className="w-full max-w-[90%] md:max-w-[85%] translate-y-5 -rotate-2 rounded-t-xl border-[1.5px] border-white/20 transition-all duration-300 ease-out will-change-transform group-hover:scale-105 group-hover:rotate-0 overflow-hidden"
                  style={{
                    boxShadow: `0 0 35px ${project.shadowColor}`,
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover max-h-[350px] transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Link>
        </SpotlightCard>

        {/* Mobile Info view (visible only on mobile) */}
        <div className="mt-6 mb-16 flex flex-col px-2 lg:hidden">
          <div className="flex items-center gap-2.5">
            <Link
              to={project.liveUrl || `/work/${project.slug}`}
              target={project.liveUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <h2 className="text-xl font-bold text-white">
                <ScrollFloat
                  containerClassName="my-0"
                  textClassName="text-xl font-bold text-white"
                  scrollStart="top bottom-=5%"
                  scrollEnd="center center"
                  stagger={0.02}
                >
                  {project.title}
                </ScrollFloat>
              </h2>
            </Link>
            {project.githubUrl && (
              <Link
                to={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-75 transition-opacity"
                title="View Source on GitHub"
                aria-label="View Source on GitHub"
              >
                <Github size={18} className="text-white" />
              </Link>
            )}
            <div
              aria-hidden="true"
              className="ml-2 h-1 w-6 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-400 mt-1.5 text-sm font-medium"
          >
            {project.type}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrollReveal
              containerClassName="my-2"
              textClassName="text-gray-300 text-sm leading-relaxed"
              scrollStart="top bottom-=5%"
              scrollEnd="bottom bottom-=15%"
            >
              {project.description}
            </ScrollReveal>
          </motion.div>

          {/* Tech pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="my-4 flex flex-wrap items-center gap-1.5"
          >
            {project.technologies.map((tech, techIdx) => {
              const logo = getTechLogo(tech);
              return (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: techIdx * 0.03 }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-xs font-medium backdrop-blur-sm bg-white/5 text-gray-200"
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
                </motion.span>
              );
            })}
          </motion.div>

          {/* Action buttons on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 mt-2"
          >
            {/* Source & Live Site buttons */}
            <div className="flex w-full gap-3">
              {project.githubUrl && (
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex h-fit w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-white shadow-md active:scale-95 hover:bg-white/10 transition-colors"
                  >
                    <Github size={16} className="text-white" />
                    <span>Source</span>
                  </Link>
                </motion.div>
              )}
              {project.liveUrl && (
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex h-fit w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-white shadow-md active:scale-95 hover:bg-white/10 transition-colors"
                  >
                    <FiExternalLink size={16} />
                    <span>Live Site</span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Read full case study link below Source & Live Site */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="pt-0.5"
            >
              <Link
                to={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-all hover:translate-x-1"
                style={{ color: project.accentColor }}
              >
                <span>Read full case study</span>
                <FiChevronRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
