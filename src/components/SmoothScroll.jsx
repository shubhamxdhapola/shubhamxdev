import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const { pathname, hash } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with refined exponential easing
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Connect RAF loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global listener for smooth in-page hash anchor navigation
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a, [data-scroll-to]");
      if (!target) return;

      const href = target.getAttribute("href") || target.getAttribute("data-scroll-to");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -60, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.off("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // Handle route navigation: reset scroll to top immediately and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          lenisRef.current.scrollTo(el, { offset: -60, duration: 1.0 });
          setTimeout(() => ScrollTrigger.refresh(), 100);
          return;
        }
      }
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [pathname, hash]);

  return <>{children}</>;
}
