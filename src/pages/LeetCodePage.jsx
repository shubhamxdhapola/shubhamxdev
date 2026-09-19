import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import LeetCodeStats from "../components/leetcode/LeetCodeStats";
import Footer from "../components/Footer";

export default function LeetCodePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-100 overflow-x-clip pt-28 sm:pt-32">
      {/* Background ambient glows */}
      <div className="absolute top-20 left-1/4 -z-10 h-96 w-96 rounded-full bg-[#FFA116]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#FF4ECD]/5 blur-3xl pointer-events-none" />

      {/* Back to Home Button */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide uppercase font-rajdhani text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-all group"
        >
          <FiArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      <LeetCodeStats showHeader={true} />
      <Footer />
    </div>
  );
}
