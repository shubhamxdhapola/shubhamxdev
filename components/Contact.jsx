import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import axios from "axios";

const Contact = () => {
  
  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("https://api.web3forms.com/submit", {
        ...formData,
        access_key: process.env.NEXT_PUBLIC_ACCESS_KEY,
      });
      toast.success("Message sent successfully");
      setFormData(initialFormData);
    } catch (error) {
      toast.error("Unable to send message");
      console.log("Error in submitting form : ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className='w-full px-[8%] sm:px-[10%] md:px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none'
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        Connect with me
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        Get in touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
      >
        I'd love to hear from you! If you have any questions, comments, or
        feedback, please use the form below.
      </motion.p>

      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <motion.input
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            type="text"
            placeholder="Enter your name"
            required
            className="flex-1 p-3 outline-none border-[0.5px] dark:border-[1px] border-gray-700 rounded-md bg-white dark:bg-darkHover/30 dark:border-white"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
          />

          <motion.input
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 p-3 outline-none border-[0.5px] dark:border-[1px] border-gray-700 rounded-md bg-white dark:bg-darkHover/30 dark:border-white"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
          />
        </div>
        <motion.textarea
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          rows="6"
          placeholder="Enter your message"
          required
          className="w-full p-4 outline-none border-[0.5px] dark:border-[1px] border-gray-700 rounded-md bg-white mb-6 dark:bg-darkHover/30 dark:border-white"
          name="message"
          value={formData.message}
          onChange={handleOnChange}
        ></motion.textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ delay: 0.9, duration: 0.3 }}
          type="submit"
          className={`py-3 px-8 w-max flex items-center justify-between gap-2 text-white rounded-full mx-auto hover:bg-black/80 duration-300 dark:bg-transparent dark:border-[1px] dark:hover:bg-darkHover ${
            submitting
              ? "cursor-not-allowed bg-black/80"
              : "cursor-pointer bg-black"
          }`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit now"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Contact;
