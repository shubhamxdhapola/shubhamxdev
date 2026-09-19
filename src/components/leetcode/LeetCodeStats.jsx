import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import {
  FiExternalLink,
  FiAward,
  FiCheckCircle,
  FiRefreshCw,
  FiCode,
  FiActivity,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import SectionHeading from "../SectionHeading";
import SpotlightCard from "../reactbits/SpotlightCard";
import SubmissionHeatmap from "./SubmissionHeatmap";
import TiltCard from "./TiltCard";
import { fetchLeetCodeStats } from "../../utils/leetcodeApi";
import { LEETCODE_CONFIG } from "../../data/leetcode";

/**
 * AnimatedNumber component that counts up smoothly every time it scrolls into view
 * (works on both scrolling down and scrolling up)
 */
function AnimatedNumber({ value, duration = 0.9 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0);
      return;
    }
    const num = typeof value === "number" ? value : parseFloat(value);
    if (isNaN(num)) return;

    const controls = animate(0, num, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  if (typeof value !== "number" && isNaN(parseFloat(value))) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
    </span>
  );
}

export default function LeetCodeStats({ showHeader = true, username = LEETCODE_CONFIG.username }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = useCallback(
    async (force = false) => {
      try {
        if (force) setRefreshing(true);
        else setLoading(true);
        setError(null);

        const stats = await fetchLeetCodeStats(username, force);
        setData(stats);
      } catch (err) {
        console.error("Failed to load LeetCode stats:", err);
        setError(err.message || "Failed to load LeetCode statistics");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [username]
  );

  useEffect(() => {
    loadStats(false);
  }, [loadStats]);

  return (
    <section id="leetcode" className="relative py-20 text-gray-300 overflow-visible">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 -z-10 h-96 w-96 rounded-full bg-[#FFA116]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 -z-10 h-96 w-96 rounded-full bg-[#FF4ECD]/5 blur-3xl pointer-events-none" />

      {/* Section Heading - Triggers smoothly on scroll every time */}
      {showHeader && (
        <SectionHeading
          watermark="LEETCODE"
          title="Problem Solving"
          subtitle="ALGORITHMIC MASTERY & CONSISTENCY"
          once={false}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-6">
            <div className="h-28 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse" />
              ))}
            </div>
            <div className="h-64 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse" />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-8 text-center backdrop-blur-md">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 mb-4 border border-red-500/20">
              <SiLeetcode className="size-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-rajdhani mb-2">Unable to Load LeetCode Data</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
              {error}. You can view the live profile directly or retry fetching data.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => loadStats(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors border border-white/10"
              >
                <FiRefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
                Retry Now
              </button>
              <a
                href={LEETCODE_CONFIG.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FFA116] px-4 py-2 text-sm font-semibold text-black hover:bg-[#ffae33] transition-colors shadow-[0_0_15px_rgba(255,161,22,0.4)]"
              >
                View Profile on LeetCode
                <FiExternalLink className="size-4" />
              </a>
            </div>
          </div>
        )}

        {/* Loaded Content with Smooth Scrolling Transitions & Directional 3D Tilt */}
        {!loading && data && (
          <div className="space-y-6">
            {/* 1. Profile Overview Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxTilt={3.5} scaleOnHover={1.01}>
                <SpotlightCard
                  spotlightColor="rgba(255, 161, 22, 0.18)"
                  className="relative rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 backdrop-blur-md overflow-hidden card-glow shadow-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    {/* Left: Avatar + Details */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          className="size-16 sm:size-18 rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-800 flex items-center justify-center shadow-lg"
                        >
                          {data.avatar ? (
                            <img
                              src={data.avatar}
                              alt={data.username}
                              className="size-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <SiLeetcode className="size-8 text-[#FFA116]" />
                          )}
                        </motion.div>
                        {/* LeetCode Icon Badge on Avatar */}
                        <div className="absolute -bottom-1 -right-1 size-6 rounded-lg bg-black/90 border border-[#FFA116]/50 flex items-center justify-center text-[#FFA116] shadow-md">
                          <SiLeetcode className="size-3.5" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-xl sm:text-2xl font-bold text-white font-rajdhani tracking-wide">
                            {data.realName}
                          </h3>
                          <span className="text-xs font-mono text-gray-400 bg-white/[0.05] px-2 py-0.5 rounded-md border border-white/10">
                            @{data.username}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1.5 text-xs sm:text-sm text-gray-400 flex-wrap font-semibold">
                          {data.ranking && (
                            <span className="flex items-center gap-1.5 text-[#FFA116] font-semibold">
                              <FiTrendingUp className="size-3.5" />
                              Global Rank: #{data.ranking.toLocaleString()}
                            </span>
                          )}
                          <span>●</span>
                          {data.country && (
                            <span className="text-gray-400">
                              {data.country}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 self-start md:self-auto">
                      <button
                        type="button"
                        onClick={() => loadStats(true)}
                        title="Refresh stats"
                        aria-label="Refresh stats"
                        className="flex items-center justify-center size-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
                      >
                        <FiRefreshCw className={`size-4 ${refreshing ? "animate-spin text-[#FFA116]" : ""}`} />
                      </button>

                      <a
                        href={data.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFA116] to-[#FF8000] text-black font-semibold text-xs sm:text-sm hover:scale-[1.03] active:scale-[0.98] transition-all "
                      >
                        <span>LeetCode Profile</span>
                        <FiExternalLink className="size-3.5" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>

            {/* 2. 4 Stat Metric Cards with Staggered Scroll Entrance & Directional 3D Tilt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Problems Solved */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard maxTilt={8} scaleOnHover={1.025}>
                  <SpotlightCard
                    spotlightColor="rgba(255, 78, 205, 0.2)"
                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-rajdhani">
                        Problems Solved
                      </span>
                      <div className="flex items-center justify-center size-8 rounded-lg bg-[#FF4ECD]/10 text-[#FF4ECD] border border-[#FF4ECD]/20">
                        <FiCode className="size-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-3xl font-extrabold text-white font-rajdhani tracking-wide">
                        <AnimatedNumber value={data.stats.totalSolved} />
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs font-semibold text-gray-400">
                        <span>
                          <AnimatedNumber value={data.stats.totalAcceptedSubmissions} /> accepted subs
                        </span>
                        <span className="text-[#00EA64] font-semibold">
                          <AnimatedNumber value={data.stats.acceptanceRate} />%
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>

              {/* Card 2: Active Days / Consistency */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard maxTilt={8} scaleOnHover={1.025}>
                  <SpotlightCard
                    spotlightColor="rgba(0, 234, 100, 0.2)"
                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-rajdhani">
                        Active Days
                      </span>
                      <div className="flex items-center justify-center size-8 rounded-lg bg-[#00EA64]/10 text-[#00EA64] border border-[#00EA64]/20">
                        <FiCheckCircle className="size-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-3xl font-extrabold text-white font-rajdhani tracking-wide">
                        <AnimatedNumber value={data.calendar.totalActiveDays} />
                      </div>
                      <div className="mt-1 text-xs font-semibold text-gray-400">
                        Days solved across past year
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>

              {/* Card 3: Streak */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.19, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard maxTilt={8} scaleOnHover={1.025}>
                  <SpotlightCard
                    spotlightColor="rgba(255, 161, 22, 0.2)"
                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-rajdhani">
                        Max Streak
                      </span>
                      <div className="flex items-center justify-center size-8 rounded-lg bg-[#FFA116]/10 text-[#FFA116] border border-[#FFA116]/20">
                        <FaFire className="size-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-3xl font-extrabold text-white font-rajdhani tracking-wide flex items-center gap-1.5">
                        <AnimatedNumber value={data.calendar.streak} />
                        <span className="text-sm font-semibold text-gray-400">days</span>
                      </div>
                      <div className="mt-1 text-xs text-[#FFA116] font-semibold flex items-center gap-1">
                        <FiZap className="size-3" />
                        Consistent problem solving
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>

              {/* Card 4: Contest Rating / Standing */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard maxTilt={8} scaleOnHover={1.025}>
                  <SpotlightCard
                    spotlightColor="rgba(168, 85, 247, 0.2)"
                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-rajdhani">
                        Contest Rating
                      </span>
                      <div className="flex items-center justify-center size-8 rounded-lg bg-[#A855F7]/10 text-[#C084FC] border border-[#A855F7]/20">
                        <FiAward className="size-4" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-3xl font-extrabold text-white font-rajdhani tracking-wide">
                        {data.contest?.rating ? (
                          <AnimatedNumber value={data.contest.rating} />
                        ) : (
                          "Participating"
                        )}
                      </div>
                      <div className="mt-1 text-xs text-gray-400 flex items-center justify-between font-semibold">
                        <span>
                          <AnimatedNumber value={data.contest?.attendedCount || 0} /> contests
                        </span>
                        {data.contest?.topPercentage && (
                          <span className="text-[#C084FC] font-semibold">Top {data.contest.topPercentage}</span>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            </div>

            {/* 3. Difficulty Breakdown Card */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxTilt={3.5} scaleOnHover={1.008}>
                <SpotlightCard
                  spotlightColor="rgba(255, 78, 205, 0.15)"
                  className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 backdrop-blur-md card-glow shadow-xl relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
                    <div>
                      <h4 className="text-lg font-bold text-white font-rajdhani tracking-wide flex items-center gap-2">
                        <FiActivity className="size-4 text-[#FF4ECD]" />
                        Difficulty Breakdown
                      </h4>
                      <p className="text-[13px] text-gray-400 font-semibold">
                        Distribution of problems solved across difficulty tiers
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 font-mono font-semibold">
                      <AnimatedNumber value={data.stats.totalSolved} /> Total Solved
                    </div>
                  </div>

                  {/* Difficulty Bars Grid with individual 3D directional tilt & spotlights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Easy */}
                    <TiltCard maxTilt={6} scaleOnHover={1.02}>
                      <SpotlightCard
                        spotlightColor="rgba(0, 234, 100, 0.2)"
                        className="rounded-xl bg-white/[0.03] border border-[#00EA64]/20 p-4 relative overflow-hidden group hover:border-[#00EA64]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-[#00EA64] tracking-wide">
                            Easy
                          </span>
                          <span className="text-xs font-mono text-gray-400 font-semibold">
                            {data.stats.totalSolved > 0
                              ? `${((data.stats.easySolved / data.stats.totalSolved) * 100).toFixed(0)}%`
                              : "0%"}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-white font-rajdhani mb-2">
                          <AnimatedNumber value={data.stats.easySolved} />
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${data.stats.totalSolved > 0 ? (data.stats.easySolved / data.stats.totalSolved) * 100 : 0}%`,
                            }}
                            viewport={{ once: false, amount: 0.15 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full rounded-full bg-[#00EA64] shadow-[0_0_8px_#00EA64]"
                          />
                        </div>
                      </SpotlightCard>
                    </TiltCard>

                    {/* Medium */}
                    <TiltCard maxTilt={6} scaleOnHover={1.02}>
                      <SpotlightCard
                        spotlightColor="rgba(255, 161, 22, 0.2)"
                        className="rounded-xl bg-white/[0.03] border border-[#FFA116]/20 p-4 relative overflow-hidden group hover:border-[#FFA116]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-[#FFA116] tracking-wide">
                            Medium
                          </span>
                          <span className="text-xs font-mono text-gray-400 font-semibold">
                            {data.stats.totalSolved > 0
                              ? `${((data.stats.mediumSolved / data.stats.totalSolved) * 100).toFixed(0)}%`
                              : "0%"}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-white font-rajdhani mb-2">
                          <AnimatedNumber value={data.stats.mediumSolved} />
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${data.stats.totalSolved > 0 ? (data.stats.mediumSolved / data.stats.totalSolved) * 100 : 0}%`,
                            }}
                            viewport={{ once: false, amount: 0.15 }}
                            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full rounded-full bg-[#FFA116] shadow-[0_0_8px_#FFA116]"
                          />
                        </div>
                      </SpotlightCard>
                    </TiltCard>

                    {/* Hard */}
                    <TiltCard maxTilt={6} scaleOnHover={1.02}>
                      <SpotlightCard
                        spotlightColor="rgba(255, 55, 95, 0.2)"
                        className="rounded-xl bg-white/[0.03] border border-[#FF375F]/20 p-4 relative overflow-hidden group hover:border-[#FF375F]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-[#FF375F] tracking-wide">
                            Hard
                          </span>
                          <span className="text-xs font-mono text-gray-400 font-semibold">
                            {data.stats.totalSolved > 0
                              ? `${((data.stats.hardSolved / data.stats.totalSolved) * 100).toFixed(0)}%`
                              : "0%"}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-white font-rajdhani mb-2">
                          <AnimatedNumber value={data.stats.hardSolved} />
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${data.stats.totalSolved > 0 ? (data.stats.hardSolved / data.stats.totalSolved) * 100 : 0}%`,
                            }}
                            viewport={{ once: false, amount: 0.15 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full rounded-full bg-[#FF375F] shadow-[0_0_8px_#FF375F]"
                          />
                        </div>
                      </SpotlightCard>
                    </TiltCard>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>

            {/* 4. Submission Heatmap Card */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxTilt={2.5} scaleOnHover={1.006}>
                <SubmissionHeatmap
                  submissionCalendar={data.calendar.submissionCalendar}
                  streak={data.calendar.streak}
                  totalActiveDays={data.calendar.totalActiveDays}
                />
              </TiltCard>
            </motion.div>

            {/* 5. Badges Showcase (if any earned) */}
            {data.badges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard maxTilt={3.5} scaleOnHover={1.01}>
                  <SpotlightCard
                    spotlightColor="rgba(168, 85, 247, 0.16)"
                    className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 backdrop-blur-md shadow-xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300">
                          <FiAward className="size-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white font-rajdhani tracking-wide flex items-center gap-2">
                            Earned Badges
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-gray-300 border border-white/10 font-medium font-sans">
                              {data.badges.length}
                            </span>
                          </h4>
                          <p className="text-xs font-semibold text-gray-400">
                            Milestones & LeetCode Challenges
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                      {data.badges.map((badge, idx) => (
                        <motion.div
                          key={badge.id || idx}
                          initial={{ opacity: 0, y: 20, scale: 0.94 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: false, amount: 0.15 }}
                          transition={{ duration: 0.45, delay: 0.04 * (idx % 5), ease: [0.16, 1, 0.3, 1] }}
                        >
                          <TiltCard maxTilt={7} scaleOnHover={1.03}>
                            <SpotlightCard
                              spotlightColor="rgba(255, 255, 255, 0.12)"
                              className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] text-center transition-all cursor-default relative overflow-hidden"
                            >
                              <div className="size-16 sm:size-20 mb-2 flex items-center justify-center relative">
                                {badge.displayIcon ? (
                                  <img
                                    src={badge.displayIcon}
                                    alt={badge.displayName || badge.name}
                                    className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                ) : (
                                  <FiAward className="size-10 text-gray-400" />
                                )}
                              </div>
                              <span className="text-[13px] font-semibold text-white tracking-wide line-clamp-1 group-hover:text-white transition-colors">
                                {badge.shortName || badge.displayName || badge.name}
                              </span>
                              {badge.creationDate && (
                                <span className="text-xs font-semibold text-gray-400 mt-0.5">
                                  {new Date(badge.creationDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              )}
                            </SpotlightCard>
                          </TiltCard>
                        </motion.div>
                      ))}
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
