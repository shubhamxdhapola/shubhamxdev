import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiExternalLink,
  FiCalendar,
  FiCopy,
  FiCheck,
  FiMaximize2,
  FiX,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import { SiHackerrank, SiNodedotjs, SiReact } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import Footer from "../components/Footer";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import { certificationsData } from "../data/certifications";

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Core CS",
    "Software Engineering",
  ];

  const filteredCerts =
    activeCategory === "All"
      ? certificationsData
      : certificationsData.filter((c) => c.category === activeCategory);

  const handleCopyId = (e, id, credentialId) => {
    e.stopPropagation();
    if (!credentialId) return;
    navigator.clipboard.writeText(credentialId);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIssuerIcon = (issuerLogo, issuerName = "") => {
    if (
      issuerLogo &&
      (issuerLogo.startsWith("http://") ||
        issuerLogo.startsWith("https://") ||
        issuerLogo.startsWith("/"))
    ) {
      return (
        <img
          src={issuerLogo}
          alt={issuerName || "Issuer"}
          className="size-3.5 object-contain inline-block"
          loading="lazy"
        />
      );
    }
    switch (issuerLogo) {
      case "hackerrank":
        return <SiHackerrank className="size-3.5 text-[#00EA64]" />;
      case "microsoft":
        return <FaLinkedin className="size-3.5 text-[#0A66C2]" />;
      case "letsupgrade":
        return <SiNodedotjs className="size-3.5 text-[#5FA04E]" />;
      default:
        return <FiAward className="size-3.5 text-[#FF4ECD]" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-x-hidden text-gray-300">
      {/* Background ambient radial glows */}
      <div className="absolute left-1/2 top-20 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#FF4ECD]/10 blur-[140px] pointer-events-none" />
      <div className="absolute right-10 top-64 -z-10 h-72 w-72 rounded-full bg-[#B3168A]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 -z-10 h-72 w-72 rounded-full bg-slate-500/5 blur-[120px] pointer-events-none" />

      <main className="relative px-4 sm:px-6 pb-24 pt-32 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF4ECD]/15 bg-[#FF4ECD]/5 px-3.5 py-1 text-sm font-medium text-[#FFD6F4]">
            <FiAward className="size-3.5 text-[#FF4ECD]" />
            <span>Verified Credentials</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight font-rajdhani">
            Validated Skills &{" "}
            <span className="bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] bg-clip-text text-transparent">
              Certifications
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-300 font-normal">
            Continuous growth through rigorous assessments and technical simulations across React, Node.js, Problem Solving, and modern Software Engineering.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all ${activeCategory === cat
                  ? "bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] text-slate-950 font-bold shadow-lg shadow-[#FF4ECD]/25"
                  : "border border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/25 hover:text-white hover:bg-white/[0.06]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCerts.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: (index % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col h-full"
            >
              <SpotlightCard
                spotlightColor="rgba(255, 78, 205, 0.22)"
                className="flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/50 p-5 sm:p-6 backdrop-blur-md shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4ECD]/40 hover:bg-slate-950/70"
              >
                <div>
                  {/* Thumbnail Preview */}
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer group/thumb"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover/thumb:opacity-40 transition-opacity" />

                    {/* View Certificate Hover Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg">
                        <FiMaximize2 className="size-3.5 text-[#FF4ECD]" />
                        <span>Preview Certificate</span>
                      </span>
                    </div>

                    {/* Issuer category badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-gray-200 backdrop-blur-md shadow-md">
                      {getIssuerIcon(cert.issuerLogo, cert.issuer)}
                      <span>{cert.issuer}</span>
                    </div>

                    {/* Issue Date Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/80 px-2.5 py-1 text-xs font-semibold text-gray-300 backdrop-blur-md">
                      <FiCalendar className="size-3 text-[#FF4ECD]" />
                      <span>{cert.issueDate}</span>
                    </div>
                  </div>

                  {/* Details Header */}
                  <div className="mt-5">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-rajdhani leading-snug tracking-wide group-hover:text-[#FFD6F4] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400 font leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[12px] font-medium text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                  {/* Credential ID copy */}
                  {cert.credentialId ? (
                    <button
                      onClick={(e) => handleCopyId(e, cert.id, cert.credentialId)}
                      className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors group/btn py-1"
                      title="Copy Credential ID"
                    >
                      {copiedId === cert.id ? (
                        <>
                          <FiCheck className="size-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="size-3.5 text-gray-400 group-hover/btn:text-white" />
                          <span className="font-mono text-[11px] truncate max-w-[110px] sm:max-w-[130px]">
                            {cert.credentialId}
                          </span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-gray-500 font-mono text-[11px]">Verified</span>
                  )}

                  {/* Verify Link */}
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#FF4ECD]/30 bg-[#FF4ECD]/10 px-3 py-1.5 text-xs font-semibold text-[#FFD6F4] hover:bg-[#FF4ECD]/20 hover:border-[#FF4ECD]/60 hover:text-white transition-all"
                  >
                    <span>Verify</span>
                    <FiExternalLink className="size-3" />
                  </a>
                </div>
              </SpotlightCard>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Fullscreen Certificate Image Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto overscroll-contain"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl sm:rounded-3xl border border-white/15 bg-slate-950 p-4 sm:p-6 shadow-2xl shadow-black/80 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/10 border border-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Close preview"
              >
                <FiX size={20} />
              </button>

              {/* Modal Header */}
              <div className="pr-10 sm:pr-12 mb-3 sm:mb-4">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#FFD6F4] mb-2">
                  {getIssuerIcon(selectedCert.issuerLogo, selectedCert.issuer)}
                  <span>{selectedCert.issuer}</span>
                  <span>●</span>
                  <span>{selectedCert.fullDate}</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white font-rajdhani leading-snug">
                  {selectedCert.title}
                </h3>
              </div>

              {/* High-res Image Preview */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center p-1">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-auto h-auto max-h-[46vh] sm:max-h-[52vh] max-w-full object-contain rounded-lg shadow-md"
                />
              </div>

              {/* Modal Footer with Verification Link */}
              <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pb-1">
                <div className="flex min-w-0 items-center justify-between gap-2 text-xs text-gray-400">
                  <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
                    <span className="shrink-0 font-semibold text-gray-400">Credential ID:</span>
                    <span className="min-w-0 truncate font-mono text-white select-all">
                      {selectedCert.credentialId || "Verified"}
                    </span>
                  </div>

                  {selectedCert.credentialId && (
                    <button
                      onClick={(e) => handleCopyId(e, selectedCert.id, selectedCert.credentialId)}
                      className="shrink-0 text-[#FF4ECD] hover:underline flex items-center gap-1 font-semibold text-xs ml-1"
                      title="Copy Credential ID"
                    >
                      {copiedId === selectedCert.id ? (
                        <>
                          <FiCheck className="size-3 text-[#00EA64]" />
                          <span className="text-[#00EA64]">Copied</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="size-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="w-full sm:w-auto shrink-0">
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFD6F4] via-[#FF4ECD] to-[#B3168A] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-[#FF4ECD]/25 hover:opacity-95 transition-opacity"
                  >
                    <span>Verify</span>
                    <FiExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
