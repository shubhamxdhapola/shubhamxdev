import { motion } from "motion/react";
import { SKILLS, INFO } from "@/utils/data";

const About = ({ isDarkMode }) => {
  return (
    <motion.div
      id="about"
      className="w-full px-[8%] sm:px-[10%] md:px-[12%] py-10 scroll-mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        Introduction
      </motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        About me
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col lg:flex-row items-center gap-20 my-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full sm:w-80 rounded-3xl max-w-none"
        >
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center flex-col gap-6 max-w-2xl"
          >
            {INFO.map(({ Icon, title, description }, index) => (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="border border-gray-500 rounded-xl p-4 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
                key={index}
              >
                <Icon className="text-gray-800 dark:text-white size-6" />

                <h3 className="font-semibold text-gray-700 dark:text-white">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm dark:text-white/80 mt-1">
                  {description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex-1"
        >
          <p className="mb-10 max-w-2xl font-Ovo text-justify">
            Hello, I am Shubham Dhapola, a Full-Stack Web Developer and software
            enthusiast passionate about technology and driven by curiosity. I am
            currently pursuing my Master of Computer Applications (MCA) from
            SAGE University (Sunstone), Indore, and hold a BCA degree. I have
            hands-on experience in building efficient, user-friendly web
            applications that solve real word problems.
          </p>
          <motion.h4
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="my-6 text-gray-700 font-Ovo dark:text-white/80 underline"
          >
            Technologies I use
          </motion.h4>

          <motion.ul
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center  md:justify-start gap-4 sm:gap-5 flex-wrap"
          >
            {SKILLS.map((skill, index) => (
              <motion.li
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center w-14 aspect-square border border-gray-500 rounded-lg cursor-pointer hover:-translate-y-1 duration-500 dark:border-white group relative dark:hover:bg-darkHover"
                key={index}
              >
                <img
                  src={
                    (isDarkMode &&
                      skill.title == "GitHub" &&
                      "/logos/githubdark.svg") ||
                    (isDarkMode &&
                      skill.title == "Express" &&
                      "/logos/expressdark.svg") ||
                    skill.src
                  }
                  alt={skill.title}
                  className="w-6"
                />
                <span className="dark:bg-gray-800 border-[0.5px] bg-white border-gray-500 absolute -top-8 text-xs px-2 py-1 rounded opacity-0 duration-300 group-hover:opacity-100 whitespace-nowrap">
                  {skill.title}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
