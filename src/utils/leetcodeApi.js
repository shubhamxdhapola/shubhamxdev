import { LEETCODE_CONFIG } from "../data/leetcode.js";

const CACHE_KEY_PREFIX = "leetcode_stats_cache_";

/**
 * Format relative time string from unix seconds timestamp
 */
export function formatRelativeTime(timestamp) {
  if (!timestamp) return "";
  const now = Math.floor(Date.now() / 1000);
  const diff = now - Number(timestamp);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w ago`;

  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Normalizes badge icon URL to ensure absolute path
 */
function normalizeBadgeIcon(badge) {
  let iconUrl = badge?.icon || "";
  if (badge?.medal?.config?.iconGif) {
    return badge.medal.config.iconGif;
  }
  if (iconUrl.startsWith("/")) {
    return `https://leetcode.com${iconUrl}`;
  }
  return iconUrl;
}

/**
 * Fetch all LeetCode statistics for a given username
 */
export async function fetchLeetCodeStats(username = LEETCODE_CONFIG.username, forceRefresh = false) {
  const cacheKey = `${CACHE_KEY_PREFIX}${username}`;

  // Check client-side cache
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < LEETCODE_CONFIG.cacheTimeMs) {
          return parsed.data;
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }

  const base = LEETCODE_CONFIG.apiBaseUrl;

  // Make parallel API requests
  const [userRes, calRes, badgeRes, contestRes, subsRes] = await Promise.allSettled([
    fetch(`${base}/user/${username}`).then((r) => {
      if (!r.ok) throw new Error(`User API returned status ${r.status}`);
      return r.json();
    }),
    fetch(`${base}/user/${username}/calendar`).then((r) => (r.ok ? r.json() : null)),
    fetch(`${base}/user/${username}/badges`).then((r) => (r.ok ? r.json() : { badges: [] })),
    fetch(`${base}/user/${username}/contests`).then((r) => (r.ok ? r.json() : null)),
    fetch(`${base}/user/${username}/submissions`).then((r) => (r.ok ? r.json() : [])),
  ]);

  if (userRes.status !== "fulfilled" || !userRes.value || userRes.value.detail === "Not Found") {
    throw new Error(`LeetCode user "${username}" was not found or API is unavailable.`);
  }

  const userData = userRes.value;
  const calendarData = calRes.status === "fulfilled" ? calRes.value : null;
  const badgeData = badgeRes.status === "fulfilled" ? badgeRes.value : { badges: [] };
  const contestData = contestRes.status === "fulfilled" ? contestRes.value : null;
  const subsData = subsRes.status === "fulfilled" && Array.isArray(subsRes.value) ? subsRes.value : [];

  // Parse Solved Stats
  const acList = userData.submitStats?.acSubmissionNum || [];
  const totalSubmissionsList = userData.submitStats?.totalSubmissionNum || [];

  const allSolved = acList.find((s) => s.difficulty === "All")?.count || 0;
  const easySolved = acList.find((s) => s.difficulty === "Easy")?.count || 0;
  const mediumSolved = acList.find((s) => s.difficulty === "Medium")?.count || 0;
  const hardSolved = acList.find((s) => s.difficulty === "Hard")?.count || 0;

  const totalAcceptedSubmissions = acList.find((s) => s.difficulty === "All")?.submissions || 0;
  const totalRawSubmissions = totalSubmissionsList.find((s) => s.difficulty === "All")?.submissions || 0;
  const acceptanceRate = totalRawSubmissions > 0
    ? ((totalAcceptedSubmissions / totalRawSubmissions) * 100).toFixed(1)
    : "N/A";

  // Parse Badges
  const badges = (badgeData?.badges || []).map((b) => ({
    ...b,
    displayIcon: normalizeBadgeIcon(b),
  }));

  // Parse Submission Calendar
  let submissionCalendar = {};
  if (calendarData?.submissionCalendar) {
    if (typeof calendarData.submissionCalendar === "string") {
      try {
        submissionCalendar = JSON.parse(calendarData.submissionCalendar);
      } catch {
        submissionCalendar = {};
      }
    } else {
      submissionCalendar = calendarData.submissionCalendar;
    }
  }

  // Parse Contest Ranking
  const contestRanking = contestData?.userContestRanking || null;
  const contestHistory = contestData?.userContestRankingHistory || [];

  // Parse Submissions
  const recentSubmissions = subsData.slice(0, 15).map((s) => ({
    id: s.id,
    title: s.title,
    titleSlug: s.titleSlug,
    statusDisplay: s.statusDisplay,
    isAccepted: s.statusDisplay === "Accepted",
    langName: s.langName,
    runtime: s.runtime && s.runtime !== "N/A" ? s.runtime : null,
    memory: s.memory && s.memory !== "N/A" ? s.memory : null,
    timestamp: s.timestamp,
    relativeTime: formatRelativeTime(s.timestamp),
    problemUrl: `https://leetcode.com/problems/${s.titleSlug}/`,
  }));

  const compiledData = {
    username,
    profileUrl: `https://leetcode.com/u/${username}/`,
    realName: userData.profile?.realName || username,
    avatar: userData.profile?.userAvatar || null,
    ranking: userData.profile?.ranking || null,
    country: userData.profile?.countryName || null,
    stats: {
      totalSolved: allSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalAcceptedSubmissions,
      totalRawSubmissions,
      acceptanceRate,
    },
    calendar: {
      streak: calendarData?.streak || 0,
      totalActiveDays: calendarData?.totalActiveDays || 0,
      submissionCalendar,
      activeYears: calendarData?.activeYears || [],
    },
    badges,
    contest: contestRanking
      ? {
          attendedCount: contestRanking.attendedContestsCount || 0,
          rating: Math.round(contestRanking.rating || 0),
          globalRanking: contestRanking.globalRanking || null,
          totalParticipants: contestRanking.totalParticipants || null,
          topPercentage: contestRanking.topPercentage ? `${contestRanking.topPercentage.toFixed(1)}%` : null,
          history: contestHistory,
        }
      : null,
    recentSubmissions,
    fetchedAt: Date.now(),
  };

  // Cache to localStorage
  try {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        timestamp: Date.now(),
        data: compiledData,
      })
    );
  } catch {
    // Ignore cache save issues
  }

  return compiledData;
}
