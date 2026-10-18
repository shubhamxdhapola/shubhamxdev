import { useQuery, useQueryClient } from "@tanstack/react-query";
import portfolioService from "../services/portfolioService";
import { profileData } from "../data/profile";
import { projectsData } from "../data/projects";
import { skillsData, marqueeItems as defaultMarquee } from "../data/skills";
import { certificationsData } from "../data/certifications";
import { educationData } from "../data/education";

// Stale time: 5 minutes for stable portfolio content
export const DEFAULT_STALE_TIME = 5 * 60 * 1000;
// Garbage collection time: 15 minutes
export const DEFAULT_GC_TIME = 15 * 60 * 1000;

/**
 * Normalizes social links array from CMS into an accessible object: { github, linkedin, leetcode, email, ... }
 */
function normalizeSocialLinks(socialLinksList = [], fallbackSocials = {}) {
  const map = { ...fallbackSocials };
  if (!Array.isArray(socialLinksList)) return map;

  for (const item of socialLinksList) {
    if (!item?.platform || !item?.url) continue;
    const key = item.platform.toLowerCase().trim();
    if (key.includes("git")) map.github = item.url;
    else if (key.includes("linkedin")) map.linkedin = item.url;
    else if (key.includes("leetcode")) map.leetcode = item.url;
    else if (key.includes("mail") || key.includes("email")) {
      map.email = item.url.startsWith("mailto:") ? item.url : `mailto:${item.url}`;
    } else if (key.includes("face")) map.facebook = item.url;
    else if (key.includes("twit") || key.includes("x")) map.twitter = item.url;
    else map[key] = item.url;
  }
  return map;
}

/**
 * Hook for full site content (hero, about, settings, social links, resume summary)
 */
export function useSiteContent() {
  return useQuery({
    queryKey: ["site-content"],
    queryFn: portfolioService.getSiteContent,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    select: (data) => {
      const aboutMe = data?.aboutMe || {};
      const homeHero = data?.homePage?.hero || {};
      const settings = data?.settings || {};
      const resume = data?.resume || {};
      const socialLinks = data?.socialLinks || [];

      const normalizedSocials = normalizeSocialLinks(socialLinks, profileData.socials);

      // Deeply merge CMS data with static fallback structure for bulletproof rendering
      const mergedProfile = {
        ...profileData,
        name: aboutMe.name || settings.siteTitle?.split("|")[0]?.trim() || profileData.name,
        shortName: aboutMe.shortName || profileData.shortName,
        role: aboutMe.role || homeHero.roleTitle || profileData.role,
        heroTagline: homeHero.tagline || profileData.heroTagline,
        headlinePrefix: homeHero.headlinePrefix || profileData.headlinePrefix,
        headlineAccent: homeHero.headlineAccent || profileData.headlineAccent,
        headlineSuffix: homeHero.headlineSuffix || profileData.headlineSuffix,
        email: homeHero.email || aboutMe.email || settings.contactEmail || profileData.email,
        location: aboutMe.location || profileData.location,
        availability: aboutMe.availability || profileData.availability,
        stackSummary: aboutMe.stackSummary || profileData.stackSummary,
        avatarUrl: aboutMe.avatarUrl || profileData.avatarUrl,
        avatarAltUrl: aboutMe.avatarAltUrl || profileData.avatarAltUrl,
        bioParagraph1: aboutMe.bioParagraph1 || profileData.bioParagraph1,
        bioParagraph2: aboutMe.bioParagraph2 || profileData.bioParagraph2,
        whatIDo: Array.isArray(aboutMe.whatIDo) && aboutMe.whatIDo.length > 0 ? aboutMe.whatIDo : profileData.whatIDo,
        circularText: aboutMe.circularText || "OPEN TO WORK ● OPEN TO WORK ● OPEN TO WORK ● ",
        badgeTopRight: aboutMe.badgeTopRight || "Developer",
        badgeBottomLeft: aboutMe.badgeBottomLeft || "Full Stack",
        socials: normalizedSocials,
        socialLinksList: socialLinks,
        settings,
        resume: {
          ...profileData.resume,
          ...resume,
          fileName: resume.fileName || profileData.resume.fileName,
          role: resume.role || profileData.resume.role,
          location: resume.location || profileData.resume.location,
          stack: resume.stack || profileData.resume.stack,
          availability: resume.availability || profileData.resume.availability,
          summary: resume.summary || profileData.resume.summary,
          highlights: Array.isArray(resume.highlights) && resume.highlights.length > 0 ? resume.highlights : profileData.resume.highlights,
          url: resume.pdfUrl || profileData.resume.url,
          previewUrl: resume.previewImageUrl || profileData.resume.previewUrl,
        },
      };

      return {
        raw: data,
        profile: mergedProfile,
        settings,
        sections: data?.homePage?.sections || {},
      };
    },
  });
}

/**
 * Hook for published projects
 */
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: portfolioService.getProjects,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    select: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return projectsData;
    },
  });
}

/**
 * Hook for single project by slug or ID
 * Leverages cached projects list as initialData to prevent redundant requests
 */
export function useProject(slug) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => portfolioService.getProjectBySlug(slug),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    enabled: Boolean(slug),
    initialData: () => {
      if (!slug) return undefined;
      const cachedProjects = queryClient.getQueryData(["projects"]);
      if (Array.isArray(cachedProjects)) {
        return cachedProjects.find(
          (p) =>
            p.slug === slug ||
            (Array.isArray(p.altSlugs) && p.altSlugs.includes(slug)) ||
            p.id?.toString() === slug?.toString()
        );
      }
      // Or fallback to static list
      return projectsData.find(
        (p) =>
          p.slug === slug ||
          (Array.isArray(p.altSlugs) && p.altSlugs.includes(slug)) ||
          p.id?.toString() === slug?.toString()
      );
    },
  });
}

/**
 * Hook for skills and marquee items
 */
export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: portfolioService.getSkills,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    select: (data) => {
      const skills = Array.isArray(data?.skills) && data.skills.length > 0 ? data.skills : skillsData;
      const marqueeItems =
        Array.isArray(data?.marqueeItems) && data.marqueeItems.length > 0
          ? data.marqueeItems
          : defaultMarquee;
      return { skills, marqueeItems };
    },
  });
}

/**
 * Hook for certifications and certifications page config
 */
export function useCertifications() {
  return useQuery({
    queryKey: ["certifications"],
    queryFn: portfolioService.getCertifications,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    select: (data) => {
      const certifications =
        Array.isArray(data?.certifications) && data.certifications.length > 0
          ? data.certifications
          : certificationsData;
      const pageSettings = data?.pageSettings || {};
      return { certifications, pageSettings };
    },
  });
}

/**
 * Hook for education history
 */
export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: portfolioService.getEducation,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    select: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return educationData;
    },
  });
}

/**
 * Hook for resume document
 */
export function useResume() {
  return useQuery({
    queryKey: ["resume"],
    queryFn: portfolioService.getResume,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    select: (data) => {
      if (data && typeof data === "object") {
        return {
          ...profileData.resume,
          ...data,
          fileName: data.fileName || profileData.resume.fileName,
          role: data.role || profileData.resume.role,
          location: data.location || profileData.resume.location,
          stack: data.stack || profileData.resume.stack,
          availability: data.availability || profileData.resume.availability,
          summary: data.summary || profileData.resume.summary,
          highlights:
            Array.isArray(data.highlights) && data.highlights.length > 0
              ? data.highlights
              : profileData.resume.highlights,
          url: data.pdfUrl || profileData.resume.url,
          previewUrl: data.previewImageUrl || profileData.resume.previewUrl,
        };
      }
      return profileData.resume;
    },
  });
}

/**
 * Hook for LeetCode stats from CMS backend
 */
export function useLeetCodeStats() {
  return useQuery({
    queryKey: ["leetcode-stats"],
    queryFn: portfolioService.getLeetCodeStats,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
}
