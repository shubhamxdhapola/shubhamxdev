import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiCheckCircle,
  FiMaximize2,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi";
import { profileData } from "../data/profile";
import Footer from "../components/Footer";

export default function Resume() {
  const [viewMode] = useState("preview"); // "preview" | "pdf"
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 70));
  const handleZoomReset = () => setZoomLevel(100);

  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-300 overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-[#FF4ECD]/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 right-10 h-96 w-96 rounded-full bg-[#B3168A]/10 blur-[150px] pointer-events-none -z-10" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors border border-white/10 rounded-full p-2 md:px-4 md:py-1.5 bg-white/[0.02] hover:border-white/20 backdrop-blur-md"
          >
            <FiArrowLeft className="size-3.5" />
            <span className="hidden md:inline">Back to Home</span>
          </Link>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Metadata & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h1 className="text-4xl lg:text-[2.9rem] font-bold text-white tracking-wide leading-tight">
                Resume of{" "}
                <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] bg-clip-text text-transparent">
                  {profileData.name}
                </span>
              </h1>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-300 font-normal">
                Full-stack developer focused on building production-ready web
                applications with clean frontend experiences, secure backend APIs,
                and practical database performance improvements.
              </p>
            </div>

            {/* 4-Box Quick Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-wider text-gray-400 block font-medium">
                  Role
                </span>
                <p className="mt-1 text-sm font-semibold text-white">
                  {profileData.resume.role}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-wider text-gray-400 block font-medium">
                  Location
                </span>
                <p className="mt-1 text-sm font-semibold text-white">
                  {profileData.resume.location}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-wider text-gray-400 block font-medium">
                  Tech Stack
                </span>
                <p className="mt-1 text-sm font-semibold text-white leading-snug">
                  {profileData.resume.stack}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                <span className="text-[12px] uppercase tracking-wider text-gray-400 block font-medium">
                  Availability
                </span>
                <p className="mt-1 text-sm font-semibold text-white leading-snug">
                  {profileData.resume.availability}
                </p>
              </div>
            </div>

            {/* File Info Card & Actions */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="size-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <FiFileText className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white truncate">
                    Shubham Dhapola's Resume
                  </h4>
                  <p className="text-sm font-semibold text-gray-400 mt-0.5">
                    {profileData.resume.fileName} • PDF File
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                {/* Direct Download Button */}
                <a
                  href="/Shubham_Dhapola_Resume.pdf"
                  download="Shubham_Dhapola_Resume.pdf"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-[#FF4ECD]/20 hover:shadow-[#FF4ECD]/35 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <FiDownload className="size-4" />
                  <span>Download Resume</span>
                </a>

                {/* Open in New Tab Button */}
                <a
                  href="/Shubham_Dhapola_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-11 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all hover:scale-105 active:scale-95"
                  title="Open original PDF in new tab"
                >
                  <FiExternalLink className="size-4" />
                </a>
              </div>
            </div>

            {/* Resume Highlights Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 backdrop-blur-md space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <FiCheckCircle className="size-4 text-[#FF4ECD]" />
                <span>Resume Highlights</span>
              </h3>
              <ul className="space-y-2 text-xs font-semibold text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4ECD] mt-0.5">•</span>
                  <span><strong>Education:</strong> Master of Computer Applications, SAGE University (CGPA 8.67)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4ECD] mt-0.5">•</span>
                  <span><strong>Core Skills:</strong> React, Next.js, Node.js, Express, MongoDB, TypeScript, Tailwind</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4ECD] mt-0.5">•</span>
                  <span><strong>Key Projects:</strong> Sai Petrol Pump (AI-powered MERN), BarbaeQ SaaS, BitLinks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4ECD] mt-0.5">•</span>
                  <span><strong>Recognition:</strong> Star Performer of the Month (Oct 2025) & Tech Club Coordinator</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Mac-style Original Resume Document Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-white/15 bg-slate-950/80 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* macOS Window Title Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/10 bg-slate-900/80">
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-yellow-500/80" />
                  <div className="size-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 hidden sm:inline text-sm font-medium text-gray-400">
                    Resume Preview
                  </span>
                </div>

                {/* Mode Switcher & Zoom Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* View Mode Switcher */}
                  {/* <div className="flex items-center rounded-lg bg-white/[0.06] p-0.5 border border-white/10 text-xs">
                    <button
                      onClick={() => setViewMode("preview")}
                      className={`px-2.5 py-1 rounded-md transition-all ${viewMode === "preview"
                        ? "bg-[#FF4ECD] text-slate-950 font-bold shadow"
                        : "text-gray-400 hover:text-white"
                        }`}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setViewMode("pdf")}
                      className={`px-2.5 py-1 rounded-md transition-all ${viewMode === "pdf"
                        ? "bg-[#FF4ECD] text-slate-950 font-bold shadow"
                        : "text-gray-400 hover:text-white"
                        }`}
                    >
                      Interactive PDF
                    </button>
                  </div> */}

                  {/* Zoom controls for preview mode */}
                  {viewMode === "preview" && (
                    <div className="hidden sm:flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-lg px-1.5 py-0.5">
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 70}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-30 transition"
                        title="Zoom out"
                      >
                        <FiZoomOut className="size-3" />
                      </button>
                      <button
                        onClick={handleZoomReset}
                        className="text-[11px] font-mono text-gray-300 px-1 hover:text-white"
                        title="Reset zoom"
                      >
                        {zoomLevel}%
                      </button>
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 160}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-30 transition"
                        title="Zoom in"
                      >
                        <FiZoomIn className="size-3" />
                      </button>
                    </div>
                  )}

                  {/* Open in full screen / new tab */}
                  <a
                    href="/Shubham_Dhapola_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm  text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/[0.05]"
                    title="Open PDF in new tab"
                  >
                    <span className="hidden md:inline">Fullscreen</span>
                    <FiMaximize2 className="size-3" />
                  </a>
                </div>
              </div>

              {/* Document Container */}
              <div className="p-3 sm:p-6 bg-neutral-950/70 max-h-[800px] overflow-y-auto custom-scrollbar">
                {viewMode === "preview" ? (
                  /* High-Resolution Exact Visual Document Preview */
                  <div className="flex justify-center transition-all duration-200">
                    <div
                      style={{ width: `${zoomLevel}%` }}
                      className="max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden border border-white/10 transition-all duration-200"
                    >
                      <picture>
                        <source
                          srcSet="/Shubham_Dhapola_Resume_preview.webp"
                          type="image/webp"
                        />
                        <img
                          src="/Shubham_Dhapola_Resume_preview.png"
                          alt="Shubham Dhapola Resume"
                          className="w-full h-auto block select-none"
                          loading="eager"
                        />
                      </picture>
                    </div>
                  </div>
                ) : (
                  /* Native PDF Iframe View */
                  <div className="w-full h-[750px] rounded-lg overflow-hidden bg-slate-900 border border-white/10">
                    <iframe
                      src="/Shubham_Dhapola_Resume.pdf#view=FitH"
                      title="Shubham Dhapola Resume PDF"
                      className="w-full h-full border-0"
                    />
                  </div>
                )}
              </div>

              {/* Bottom bar with quick download CTA */}
              <div className="px-5 py-3 border-t border-white/10 bg-slate-900/60 flex items-center justify-between text-xs text-gray-400">
                <span className="inline-flex items-center gap-1.5 text-gray-300">
                  <FiCheckCircle className="size-3.5 text-emerald-400" />
                  Original Resume PDF Loaded
                </span>
                <a
                  href="/Shubham_Dhapola_Resume.pdf"
                  download="Shubham_Dhapola_Resume.pdf"
                  className="inline-flex items-center gap-1.5 font-bold text-[#FF4ECD] hover:text-[#FFD6F4] transition"
                >
                  <FiDownload className="size-3.5" />
                  <span>Download Copy</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
