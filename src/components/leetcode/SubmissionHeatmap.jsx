import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import SpotlightCard from "../reactbits/SpotlightCard";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Timezone-safe UTC date formatter ensuring weekday always matches the row
function formatHeatmapDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function SubmissionHeatmap({ submissionCalendar = {}, streak = 0, totalActiveDays = 0 }) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  // Auto-scroll to the most recent month on smaller screens
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  // Parse submission calendar into a Date String -> Count dictionary
  const { dateCountMap, totalSubmissions } = useMemo(() => {
    const map = {};
    let total = 0;

    Object.entries(submissionCalendar).forEach(([ts, count]) => {
      const numCount = Number(count);
      const dateStr = new Date(Number(ts) * 1000).toISOString().split("T")[0];
      map[dateStr] = (map[dateStr] || 0) + numCount;
      total += numCount;
    });

    return { dateCountMap: map, totalSubmissions: total };
  }, [submissionCalendar]);

  // Generate the last 12 months strictly from Day 1 to Month End
  const months = useMemo(() => {
    const now = new Date();
    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth(); // 0-11

    const todayUTCStr = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString().split("T")[0];
    const todayLocalStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    // Exactly the last 12 months
    const numMonths = 12;
    const list = [];

    for (let i = numMonths - 1; i >= 0; i--) {
      const d = new Date(Date.UTC(currentYear, currentMonth - i, 1));
      const year = d.getUTCFullYear();
      const month = d.getUTCMonth();
      const monthName = MONTH_NAMES[month];
      const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

      // Build columns (weeks) for this month
      // Row 0 = Sunday, Row 1 = Monday, ..., Row 6 = Saturday
      const weeks = [];
      let currentWeek = new Array(7).fill(null);

      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(Date.UTC(year, month, day));
        const dow = dayDate.getUTCDay(); // 0 is Sunday, 6 is Saturday
        const dateStr = dayDate.toISOString().split("T")[0];
        const count = dateCountMap[dateStr] || 0;
        const isFuture = dateStr > todayUTCStr && dateStr > todayLocalStr;

        currentWeek[dow] = {
          day,
          dateStr,
          count,
          dow,
          isFuture,
        };

        // When week completes on Saturday or end of month is reached
        if (dow === 6 || day === daysInMonth) {
          weeks.push([...currentWeek]);
          currentWeek = new Array(7).fill(null);
        }
      }

      list.push({
        key: `${year}-${month}`,
        year,
        month,
        monthName,
        weeks,
      });
    }

    return list;
  }, [dateCountMap]);

  // Classic LeetCode green shades
  const getCellColor = (count, isFuture) => {
    if (isFuture) return "bg-transparent border border-transparent pointer-events-none";
    if (count === 0) return "bg-white/[0.05] border border-white/[0.08] hover:border-white/25";
    if (count <= 2) return "bg-[#14532d] border border-[#166534] hover:bg-[#15803d]";
    if (count <= 5) return "bg-[#15803d] border border-[#16a34a] hover:bg-[#16a34a]";
    if (count <= 9) return "bg-[#16a34a] border border-[#22c55e] hover:bg-[#22c55e]";
    return "bg-[#22c55e] border border-[#4ade80] hover:bg-[#34d399]";
  };

  const handleCellHover = (e, day) => {
    if (!day || !containerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const rawX = rect.left - containerRect.left + rect.width / 2;
    const halfTooltip = 90;
    const minX = Math.min(halfTooltip, containerRect.width / 2);
    const maxX = Math.max(halfTooltip, containerRect.width - halfTooltip);
    const safeX = Math.max(minX, Math.min(rawX, maxX));
    setHoveredDay({
      ...day,
      x: safeX,
    });
  };

  return (
    <SpotlightCard
      spotlightColor="rgba(0, 234, 100, 0.16)"
      className="relative rounded-2xl bg-slate-900/60 border border-white/10 p-4 sm:p-6 backdrop-blur-md overflow-hidden card-glow shadow-xl"
    >
      {/* Header with Title and Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-[#00EA64]/20 to-[#00EA64]/5 border border-[#00EA64]/30 text-[#00EA64]">
            <FiCalendar className="size-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide font-rajdhani flex items-center gap-2">
              Submission Activity
            </h3>
            <p className="text-[13px] font-semibold text-gray-400 font-medium">
              {totalSubmissions.toLocaleString()} submissions in the last 12 months
            </p>
          </div>
        </div>

        {/* Mini stats badges */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs">
            <FaFire className="size-3.5 text-[#FFA116]" />
            <span className="text-gray-400">Max Streak:</span>
            <span className="font-bold text-white">{streak} days</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs">
            <FiCheckCircle className="size-3.5 text-[#00EA64]" />
            <span className="text-gray-400">Active Days:</span>
            <span className="font-bold text-white">{totalActiveDays}</span>
          </div>
        </div>
      </div>

      {/* Heatmap Container - Fits 12 months into container on desktop, scrollable on smaller screens */}
      <div className="relative mt-5" ref={containerRef}>
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto md:overflow-x-visible relative pt-7 pb-2 select-none [scrollbar-width:thin]"
        >
          {/* Tooltip Overlay Floating directly above hovered day */}
          <AnimatePresence>
            {hoveredDay && (
              <motion.div
                initial={{ opacity: 0, y: 3, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.12 }}
                className="pointer-events-none absolute top-0 z-30 -translate-x-1/2 rounded-lg bg-gray-950/95 border border-white/20 px-3 py-1.5 shadow-2xl backdrop-blur-md text-center whitespace-nowrap"
                style={{
                  left: `${hoveredDay.x}px`,
                }}
              >
                <div className="text-xs font-semibold text-white">
                  <span className={hoveredDay.count > 0 ? "text-[#22c55e]" : "text-gray-400"}>
                    {hoveredDay.count} {hoveredDay.count === 1 ? "submission" : "submissions"}
                  </span>{" "}
                  on {formatHeatmapDate(hoveredDay.dateStr)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 12 Months Distributed Across Container - Scrollable on mobile, fluid fit on md+ */}
          <div className="flex w-full items-start gap-1 sm:gap-1.5 md:gap-2 min-w-[640px] md:min-w-0">
            {months.map((m) => (
              <div
                key={m.key}
                style={{ flex: m.weeks.length }}
                className="flex flex-col items-center min-w-0"
              >
                {/* Month Label */}
                <div className="h-6 flex items-center justify-center text-[12px] sm:text-xs font-semibold text-gray-400 select-none tracking-wide text-center w-full truncate">
                  {m.monthName}
                </div>

                {/* Weeks Columns for this Month */}
                <div className="flex w-full gap-[1.5px] sm:gap-[2px] lg:gap-[3px]">
                  {m.weeks.map((week, wIdx) => (
                    <div
                      key={wIdx}
                      className="flex flex-1 flex-col gap-[1.5px] sm:gap-[2px] lg:gap-[3px] min-w-0"
                    >
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={`empty-${dIdx}`}
                              className="w-full aspect-square rounded-[2px] lg:rounded-[2.5px] pointer-events-none opacity-0"
                            />
                          );
                        }

                        return (
                          <button
                            key={day.dateStr}
                            type="button"
                            aria-label={`${day.count} submissions on ${day.dateStr}`}
                            disabled={day.isFuture}
                            onClick={(e) => handleCellHover(e, day)}
                            onMouseEnter={(e) => handleCellHover(e, day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-full aspect-square rounded-[2px] lg:rounded-[2.5px] transition-all duration-150 cursor-pointer p-0 ${getCellColor(
                              day.count,
                              day.isFuture
                            )} ${hoveredDay?.dateStr === day.dateStr
                              ? "border-white/70 scale-125 z-20"
                              : ""
                              }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend and Prompt */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 pt-3 border-t border-white/5 text-xs text-gray-400">
        <span className="text-xs font-semibold text-gray-400">
          Tip: Hover over squares to view details
        </span>

        {/* LeetCode Green Intensity Legend */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold">Less</span>
          <span className="size-2.5 rounded-sm bg-white/[0.05] border border-white/[0.08]" />
          <span className="size-2.5 rounded-sm bg-[#14532d] border border-[#166534]" />
          <span className="size-2.5 rounded-sm bg-[#15803d] border border-[#16a34a]" />
          <span className="size-2.5 rounded-sm bg-[#16a34a] border border-[#22c55e]" />
          <span className="size-2.5 rounded-sm bg-[#22c55e] border border-[#4ade80]" />
          <span className="text-xs font-semibold">More</span>
        </div>
      </div>
    </SpotlightCard>
  );
}
