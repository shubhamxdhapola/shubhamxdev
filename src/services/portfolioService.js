import apiClient from "./apiClient";

/**
 * Portfolio CMS Public API Service Layer
 * Interacts only with public read-only CMS endpoints
 */

export const portfolioService = {
  /**
   * Fetch overarching site configuration, hero, about me, social links, and resume overview
   */
  async getSiteContent() {
    const res = await apiClient.get("/public/site-content");
    return res.data;
  },

  /**
   * Fetch all published projects sorted by display order
   */
  async getProjects() {
    const res = await apiClient.get("/public/projects");
    return res.data;
  },

  /**
   * Fetch a single published project by its slug, altSlugs, or numeric ID
   */
  async getProjectBySlug(slug) {
    if (!slug) throw new Error("A valid project slug or ID is required");
    const res = await apiClient.get(`/public/projects/${encodeURIComponent(slug)}`);
    return res.data;
  },

  /**
   * Fetch published skills and marquee items
   */
  async getSkills() {
    const res = await apiClient.get("/public/skills");
    return res.data;
  },

  /**
   * Fetch published certifications and page metadata
   */
  async getCertifications() {
    const res = await apiClient.get("/public/certifications");
    return res.data;
  },

  /**
   * Fetch visible education history
   */
  async getEducation() {
    const res = await apiClient.get("/public/education");
    return res.data;
  },

  /**
   * Fetch resume document details
   */
  async getResume() {
    const res = await apiClient.get("/public/resume");
    return res.data;
  },

  /**
   * Fetch server-cached LeetCode statistics and user configuration
   */
  async getLeetCodeStats() {
    const res = await apiClient.get("/public/leetcode/stats");
    return res.data;
  },
};

export default portfolioService;
