import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { projectsData } from "../data/projects";
import { getTechLogo } from "../utils/techLogos";
import { Github } from "./SocialIcons";

const homeProjects = projectsData.slice(0, 4);

export default function ProjectList() {
  const [activeProject, setActiveProject] = useState(homeProjects[0] || projectsData[0]);
  const cardRefs = useRef([]);

  // Sync active project reliably on scroll
  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let activeIndex = 0;

      for (let i = 0; i < cardRefs.current.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY + 120) {
          activeIndex = i;
        }
      }

      if (homeProjects[activeIndex]) {
        setActiveProject(homeProjects[activeIndex]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="work" className="relative px-4 sm:px-6 mx-auto md:mt-16 w-full max-w-7xl py-10">
      <SectionHeading
        watermark="PROJECTS"
        title="Projects"
        subtitle="FEATURED CASE STUDIES"
      />

      <div className="relative mx-auto flex items-stretch w-full">
        {/* Left Column: Scrolling Project Cards (60% width on desktop) */}
        <div className="mx-auto flex max-w-2xl flex-col gap-y-12 md:gap-y-24 lg:max-w-[60%] w-full">
          {homeProjects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              initial={{ opacity: 0, y: 35, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <ProjectCard
                project={project}
                index={index}
                isActive={activeProject.id === project.id}
                onMouseEnter={() => setActiveProject(project)}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Column: Sticky Project Details (40% width on desktop) */}
        <div className="hidden lg:block lg:w-[40%] pl-8 xl:pl-12 relative self-stretch">
          <div className="sticky top-24 xl:top-28 transition-all duration-300">
            <div className="flex">
              {/* Colored vertical bar matching active project accent */}
              <div
                aria-hidden="true"
                className="my-2.5 mr-4 h-1 min-w-6 rounded-full transition-colors duration-500"
                style={{ backgroundColor: activeProject.accentColor }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-start lg:min-h-[460px]"
                >
                  {/* Project Title & GitHub Link */}
                  <div className="flex items-center gap-3">
                    {activeProject.liveUrl ? (
                      <Link
                        to={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/title inline-flex items-center hover:opacity-90 transition-opacity"
                        title={`Open ${activeProject.title} Live`}
                      >
                        <h3 className="text-white text-2xl lg:text-3xl font-bold tracking-wide decoration-white/30 underline-offset-4 flex items-center flex-wrap">
                          {activeProject.title.split("").map((char, charIdx) => (
                            <motion.span
                              key={charIdx}
                              initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{
                                duration: 0.35,
                                delay: charIdx * 0.025,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="inline-block"
                            >
                              {char === " " ? "\u00A0" : char}
                            </motion.span>
                          ))}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="text-white text-2xl lg:text-3xl font-bold tracking-wide flex items-center flex-wrap">
                        {activeProject.title.split("").map((char, charIdx) => (
                          <motion.span
                            key={charIdx}
                            initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                              duration: 0.35,
                              delay: charIdx * 0.025,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block"
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </h3>
                    )}

                    {activeProject.githubUrl && (
                      <Link
                        to={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-80 transition-opacity flex items-center justify-center shrink-0"
                        title="View Source on GitHub"
                        aria-label="View Source on GitHub"
                      >
                        <Github size={24} className="text-white" />
                      </Link>
                    )}
                  </div>

                  {/* Project Type */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="text-gray-400 my-2 text-sm font-medium"
                  >
                    {activeProject.type}
                  </motion.p>

                  {/* Short Description with blur-to-sharp reveal */}
                  <motion.p
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-gray-300 my-2 text-sm lg:text-base font-normal leading-relaxed"
                  >
                    {activeProject.description}
                  </motion.p>

                  {/* Feature Bullet Points with Staggered Word Reveal */}
                  <ul className="text-gray-300 mt-4 flex flex-col gap-y-2.5 text-sm font-rajdhani text-base tracking-wide">
                    {activeProject.bullets.map((bullet, idx) => (
                      <motion.li
                        key={`${activeProject.id}-bullet-${idx}`}
                        initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{
                          duration: 0.45,
                          delay: 0.12 + idx * 0.065,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-start text-sm sm:text-base font-rajdhani"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -60 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.1 + idx * 0.065,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="shrink-0"
                        >
                          <HiSparkles
                            className="mt-0.5 mr-2.5 size-4 sm:size-4.5 transition-colors duration-500"
                            style={{ color: activeProject.accentColor }}
                          />
                        </motion.div>
                        <span className="font-medium text-gray-200 flex flex-wrap items-center">
                          {bullet.split(" ").map((word, wIdx) => (
                            <motion.span
                              key={`${activeProject.id}-b-${idx}-w-${wIdx}`}
                              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{
                                duration: 0.35,
                                delay: 0.14 + idx * 0.065 + wIdx * 0.02,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="inline-block mr-1.5"
                            >
                              {word}
                            </motion.span>
                          ))}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech Stack Icons with Staggered Pop-In Transition */}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {activeProject.techBadges.map((badge, idx) => {
                      const logo = badge.logo || getTechLogo(badge.name);
                      return (
                        <motion.div
                          key={`${activeProject.id}-tech-${idx}`}
                          initial={{ opacity: 0, scale: 0.6, y: 12 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.28 + idx * 0.045,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          whileHover={{ scale: 1.15, y: -2 }}
                          title={badge.name}
                          className="group relative flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
                        >
                          {logo ? (
                            <img
                              src={logo}
                              alt={badge.name}
                              className="size-5 object-contain flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <span className="text-xs font-bold text-white">
                              {badge.name.slice(0, 2)}
                            </span>
                          )}

                          {/* Hover Tooltip showing Tech Name */}
                          <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-top-9 z-20">
                            <div className="whitespace-nowrap rounded-md bg-gray-900 border border-white/10 px-2 py-0.5 text-[11px] font-medium text-white shadow-lg">
                              {badge.name}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Case study link with entrance transition */}
                  <motion.div
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.45,
                      delay: 0.42 + (activeProject.techBadges?.length || 0) * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-8"
                  >
                    <Link
                      to={`/work/${activeProject.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-all hover:translate-x-1"
                      style={{ color: activeProject.accentColor }}
                    >
                      <span>Read full case study</span>
                      <FiChevronRight size={16} />
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* "See more projects" bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center mt-10 md:mt-16"
      >
        <Link
          to="/work"
          className="flex items-center gap-2 text-gray-300 transition-colors hover:text-white group px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm"
        >
          <span className="text-sm font-medium">See more projects</span>
          <div className="rounded-full bg-white/10 p-1 group-hover:translate-x-1 transition-transform">
            <FiChevronRight className="size-4" />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
