import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../services/apiClient';

/**
 * Generates (or retrieves) a persistent anonymous visitor ID stored in localStorage.
 * Uses crypto.randomUUID when available, falls back to a lightweight polyfill.
 */
function getOrCreateVisitorId() {
  const KEY = 'shubham_portfolio_vid';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

/**
 * Silently records a page-view to the CMS backend on every route change.
 * - Fires once per navigation (15-second de-dupe is handled server-side too).
 * - Never throws; errors are swallowed so they don't affect the portfolio UX.
 */
export function usePageTracking() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip tracking admin/api paths (defensive – frontend shouldn't have them anyway)
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return;

    const visitorId = getOrCreateVisitorId();

    apiClient
      .post('/analytics/page-view', {
        path: pathname,
        referrer: document.referrer || '',
        visitorId,
      })
      .catch(() => {
        // Silently ignore – analytics failure must never break the portfolio
      });
  }, [pathname]);
}
