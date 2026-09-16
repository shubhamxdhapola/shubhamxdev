import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiBriefcase, FiUser, FiFileText } from "react-icons/fi";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "Work", path: "/work", icon: FiBriefcase },
    { name: "About", path: "/about", icon: FiUser },
    { name: "Resume", path: "/resume", icon: FiFileText },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        {/* Wide Glassmorphic Floating Capsule - matching reference */}
        <nav
          className={`relative flex items-center justify-center rounded-full border border-white/[0.08] bg-black/60 sm:bg-black/40 backdrop-blur-lg px-2.5 py-2 sm:px-2 sm:py-1.5 shadow-2xl shadow-black/50 transition-all duration-500 ${scrolled ? "border-white/[0.12] bg-black/75 sm:bg-black/55 shadow-black/60" : ""
            }`}
        >
          <ul className="flex items-center gap-1 sm:gap-0 list-none m-0 p-0">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const isHovered = hoveredPath === link.path;
              const IconComponent = link.icon;

              return (
                <li
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <Link
                    to={link.path}
                    aria-label={link.name}
                    title={link.name}
                    className={`relative z-10 flex items-center justify-center px-5 sm:px-6 md:px-7 py-2.5 sm:py-2 text-[13px] sm:text-sm font-medium tracking-wide transition-colors duration-200 select-none whitespace-nowrap ${active ? "text-white" : "text-white/55 hover:text-white/90"
                      }`}
                  >
                    <IconComponent className="size-5 sm:hidden" />
                    <span className="hidden sm:inline">{link.name}</span>
                  </Link>

                  {/* Sliding Active Indicator Pill with Spring Physics */}
                  {active && (
                    <motion.div
                      layoutId="activeNavbarPill"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                      {/* Neon glow accent bar at top */}
                      <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full bg-[#FF4ECD] shadow-[0_0_8px_#FF4ECD,0_0_14px_#FF4ECD]" />
                    </motion.div>
                  )}

                  {/* Subtle hover background for non-active tabs */}
                  {!active && isHovered && (
                    <motion.div
                      layoutId="hoverNavbarPill"
                      className="absolute inset-0 rounded-full bg-white/[0.04]"
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        isActive={isActive}
      />
    </>
  );
}
