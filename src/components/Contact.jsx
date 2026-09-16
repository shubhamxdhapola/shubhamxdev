import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle, FiLoader } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./reactbits/SpotlightCard";
import { profileData } from "../data/profile";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setStatusMessage(
        "Please set your VITE_WEB3FORMS_ACCESS_KEY in the .env file."
      );
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Contact Message from ${formData.name}`,
          message: formData.message,
          from_name: formData.name || "Portfolio Contact",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setStatusMessage(
          data.message || "Failed to send message. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Unable to send message due to a network error. Please try again or email directly."
      );
    }
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden text-gray-300">
      {/* Background ambient blur */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF4ECD]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#B3168A]/10 blur-[140px]" />
      </div>

      {/* Section Heading */}
      <SectionHeading
        watermark="CONTACT"
        title="Contact"
        subtitle="GET IN TOUCH"
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Column: Info & Direct Email */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-wide">
              Let's work together
            </h3>
            <p className="text-gray-300 text-sm sm:text-base mb-3 font-normal leading-relaxed">
              I'm available for full-time roles & freelance projects.
            </p>
            <p className="text-gray-300 text-sm sm:text-base mb-3 font-normal leading-relaxed">
              My inbox is always open, whether you have a question or just want to say hi.
            </p>
            <p className="text-gray-300 text-sm sm:text-base mb-6 font-normal leading-relaxed">
              I'll try my best to get back to you!
            </p>

            <div className="flex items-center justify-center lg:justify-start">
              <Link
                to={profileData.socials.email}
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#FF4ECD]/10 text-[#FFD6F4] rounded-xl border border-[#FF4ECD]/25 shadow-lg text-sm font-medium tracking-wide hover:bg-[#FF4ECD]/20 transition-all duration-300 ease-in-out"
              >
                <FiSend className="size-4 text-[#FF4ECD]" />
                <span>{profileData.email}</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Form Card with ReactBits SpotlightCard */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Ambient blur behind card */}
            <div className="absolute -top-4 -right-4 w-28 h-28 bg-[#FF4ECD]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[#B3168A]/20 rounded-full blur-2xl pointer-events-none" />

            <SpotlightCard
              spotlightColor="rgba(255, 78, 205, 0.2)"
              className="p-6 sm:p-8 rounded-2xl md:rounded-3xl backdrop-blur-md border border-white/10 bg-slate-950/50 shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot for spam protection */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4ECD]/50 focus:border-[#FF4ECD]/50 text-white placeholder-gray-600 transition-all text-[15px] placeholder:font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-300">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4ECD]/50 focus:border-[#FF4ECD]/50 text-white placeholder-gray-600 transition-all text-[15px] placeholder:font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs sm:text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4ECD]/50 focus:border-[#FF4ECD]/50 text-white placeholder-gray-600 transition-all text-[15px] placeholder:font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs sm:text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Hello, I'd like to discuss a project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4ECD]/50 focus:border-[#FF4ECD]/50 text-white placeholder-gray-600 transition-all text-[15px] placeholder:font-semibold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] text-slate-950 font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#FF4ECD]/20 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed hover:scale-[1.02] transition-all duration-300 ease-in-out"
                >
                  {status === "loading" ? (
                    <>
                      <FiLoader className="size-5 text-slate-950 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <FiCheckCircle className="size-5 text-slate-950" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="size-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {status === "success" && (
                  <p className="text-emerald-400 text-xs sm:text-sm text-center font-medium">
                    {statusMessage}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-rose-400 text-xs sm:text-sm text-center font-medium">
                    {statusMessage}
                  </p>
                )}
              </form>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
