import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { PROJECTS_LIST } from "@/utils/data";

const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
    window.scrollTo(0, window.scrollY + 200);
  };

  const handleShowLess = () => {
    setVisibleCount(3);
    window.location.href = "#projects";
  };

  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="projects"
      className="w-full px-[8%] sm:px-[10%] md:px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        My portfolio
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        My latest work
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
      >
        Welcome to my web development portfolio! Explore a collection of
        projects showcasing my expertise in full stack development.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-10"
      >
        {PROJECTS_LIST.slice(0, visibleCount).map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-600 dark:border-white/80 rounded-lg p-4 hover:shadow-[2px_2px_0_#000] hover:scale-105 duration-300 dark:hover:shadow-white dark:hover:bg-darkHover/50 "
          >
            <div className="relative aspect-[5/3] md:aspect-[4/2] rounded-md overflow-hidden">
              <Image
                src={project.thumbnail}
                fill={true}
                alt={project.title}
                className="object-cover"
              />
            </div>

            <div className="mt-4 px-1 flex justify-between items-center">
              <div className="w-full">
                <h2 className="text-lg text-gray-800 dark:text-white font-semibold">
                  {project.title}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-gray-800 dark:text-white/80 leading-normal mt-1 text-[15px]">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                className="duration-300 hover:scale-105 flex-1 border dark:border-white dark:text-white rounded-lg border-black shadow-[2px_2px_0_#000] bg-white text-gray-900 py-1 dark:hover:shadow-white dark:bg-transparent"
                onClick={() => handleRedirect(project.liveUrl)}
              >
                Preview
              </button>

              <button
                className="duration-300 hover:scale-105 flex-1 border dark:border-white dark:text-white rounded-lg border-black shadow-[2px_2px_0_#000] bg-white text-gray-900 py-1 dark:hover:shadow-white dark:bg-transparent"
                onClick={() => handleRedirect(project.githubUrl)}
              >
                GitHub
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {visibleCount < PROJECTS_LIST.length && (
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-max flex items-center justify-center gap-2 text-gray-700 dark:border-[1px] border-[0.5px] border-gray-700 rounded-full py-3 px-8 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover"
          onClick={handleShowMore}
        >
          Show more
          <ArrowDown className="size-5" />
        </motion.button>
      )}

      {visibleCount == PROJECTS_LIST.length && (
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:border-[1pxs] dark:hover:bg-darkHover"
          onClick={handleShowLess}
        >
          Show Less
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Projects;
