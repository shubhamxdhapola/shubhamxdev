import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <div
      className="w-11/12 max-w-3xl text-center mx-auto min-h-[85vh] flex flex-col items-center justify-center gap-4"
      id="home"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="w-32 h-32 overflow-hidden rounded-full relative"
      >
        <img
          src="/images/profile.png"
          fill={true}
          alt="profile-image"
          className="object-cover object-[center_-8px] w-full h-full"
        />
      </motion.div>
      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-end gap-2 text-lg md:text-2xl mb-3 font-Ovo"
      >
        Hi, I'm Shubham Dhapola
      </motion.h3>
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-4xl sm:text-6xl lg:text-[66px] font-Ovo font-semibold md:font-normal"
      >
        Full Stack Developer
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-2xl mx-auto font-Ovo"
      >
        I’m a full-stack developer skilled in the MERN stack, passionate about
        building clean, efficient, and user-centric web applications.
      </motion.p>

      <div className="flex items-center gap-4 mt-4">
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          href="#contact"
          className="px-8 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent"
        >
          Contact me
        </motion.a>

        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          href="/sample-resume.pdf"
          download
          className="px-8 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black"
        >
          My Resume
        </motion.a>
      </div>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-5 md:mt-4"
      >
        <ChevronDown className="animate-bounce" />
      </motion.div>
    </div>
  );
};

export default Hero;
