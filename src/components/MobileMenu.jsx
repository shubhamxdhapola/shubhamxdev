import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function MobileMenu({ isOpen, onClose, links, isActive }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl px-6"
        >
          {/* Close button at top right */}
          <button
            onClick={onClose}
            className="absolute top-5 right-4 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>

          {/* Nav links */}
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
            }}
            className="flex flex-col items-center space-y-6 text-center"
          >
            {links.map((link) => {
              const active = isActive(link.path);
              return (
                <motion.li
                  key={link.name}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                  className="w-full"
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className={`inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full text-xl font-bold transition-all ${
                      active
                        ? "text-white bg-white/10 shadow-lg shadow-black/40 border border-white/15"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.icon && <link.icon className="size-5" />}
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
