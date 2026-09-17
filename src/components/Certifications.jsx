import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "react-icons/fi";
import { SiHackerrank, SiNodedotjs, SiReact } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import ScrollStack, { ScrollStackItem } from "./reactbits/ScrollStack";
import { certificationsData } from "../data/certifications";

export default function Certifications({ limit, showHeader = true, showViewAll = true }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const displayedCerts = limit ? certificationsData.slice(0, limit) : certificationsData;

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

  const getCategoryColor = (category) => {
    switch (category) {
      case "Frontend":
        return "border-[#61DAFB]/30 bg-[#61DAFB]/10 text-[#61DAFB]";
      case "Backend":
        return "border-[#5FA04E]/30 bg-[#5FA04E]/10 text-[#5FA04E]";
      case "Core CS":
        return "border-[#00EA64]/30 bg-[#00EA64]/10 text-[#00EA64]";
      case "Software Engineering":
        return "border-[#A855F7]/30 bg-[#A855F7]/10 text-[#C084FC]";
      default:
        return "border-[#FF4ECD]/30 bg-[#FF4ECD]/10 text-[#FF4ECD]";
    }
  };

  return (
    <section id="certifications" className="relative overflow-visible py-20 text-gray-300">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 -left-20 -z-10 h-96 w-96 rounded-full bg-[#FF4ECD]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 -z-10 h-96 w-96 rounded-full bg-[#B3168A]/5 blur-3xl pointer-events-none" />

      {/* Section Heading */}
      {showHeader && (
        <SectionHeading
          watermark="CREDENTIALS"
          title="Certifications"
          subtitle="VERIFIED LICENSES & MASTERY"
        />
      )}


      {/* Scroll Stack Container */}
      <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6">
        <ScrollStack
          itemDistance={20}
          scaleStep={0.035}
          dim={0.07}
          blur={0}
          topOffset={110}
          itemMarginBottom="45vh"
          stackHold="45vh"
          className="w-full"
        >
          {displayedCerts.map((cert, index) => (
            <ScrollStackItem key={cert.id}>
              <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.14] bg-[#080C16] p-5 sm:p-6 md:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_25px_rgba(255,78,205,0.06)] transition-all duration-300 hover:border-[#FF4ECD]/40 overflow-hidden">
                {/* 100% Solid Underlay - completely prevents any underlying text bleed-through */}
                <div className="absolute inset-0 rounded-[inherit] bg-[#080C16] -z-10 pointer-events-none" />

                {/* Neon accent top border */}
                <div className="absolute -top-[1px] left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#FF4ECD]/70 to-transparent pointer-events-none" />

                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {/* Issuer pill */}
                    <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-gray-200">
                      {getIssuerIcon(cert.issuerLogo, cert.issuer)}
                      <span>{cert.issuer}</span>
                    </div>

                    {/* Category pill */}
                    <div
                      className={`hidden sm:inline-block rounded-full border px-2.5 py-1 text-[12px] font-semibold tracking-wider uppercase ${getCategoryColor(
                        cert.category
                      )}`}
                    >
                      {cert.category}
                    </div>
                  </div>

                  {/* Issue date */}
                  <div className="flex items-center gap-1.5 text-sm text-gray-400 font-semibold">
                    <FiCalendar className="size-3 text-[#FF4ECD]" />
                    <span>{cert.issueDate}</span>
                  </div>
                </div>

                {/* Main Card Grid */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                  {/* Left: Certificate Preview Thumbnail */}
                  <div className="md:col-span-5">
                    <div
                      onClick={() => setSelectedCert(cert)}
                      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-[#030712] cursor-pointer group/thumb shadow-lg"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/thumb:opacity-40 transition-opacity" />

                      {/* Hover Badge */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-black/50 backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl">
                          <FiMaximize2 className="size-3.5 text-[#FF4ECD]" />
                          <span>View Certificate</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Info & Actions */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-rajdhani leading-tight tracking-wide">
                        {cert.title}
                      </h3>

                      <p className="mt-3 text-sm text-gray-300/80 leading-relaxed">
                        {cert.description}
                      </p>

                      {/* Skills Pills */}
                      <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                        {cert.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded-md border border-white/10 bg-[#0E1424] px-2.5 py-1 text-xs font-medium text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                      {/* Credential ID */}
                      {cert.credentialId ? (
                        <button
                          onClick={(e) => handleCopyId(e, cert.id, cert.credentialId)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0E1424] px-3 py-1.5 text-xs font-mono text-gray-300 hover:border-white/25 hover:bg-[#151D33] transition-all"
                          title="Click to copy Credential ID"
                        >
                          {copiedId === cert.id ? (
                            <>
                              <FiCheck className="size-3.5 text-[#00EA64]" />
                              <span className="text-[#00EA64] font-medium">Copied ID</span>
                            </>
                          ) : (
                            <>
                              <FiCopy className="size-3 text-gray-400" />
                              <span>ID: {cert.credentialId.slice(0, 12)}...</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <FiShield className="size-3.5 text-[#FF4ECD]" />
                          <span>Verified Completion</span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => setSelectedCert(cert)}
                          className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0E1424] hover:bg-[#151D33] text-white px-3.5 py-1.5 text-xs font-medium transition-all"
                        >
                          <FiMaximize2 className="size-3" />
                          <span>View</span>
                        </button>

                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#FF4ECD]/40 bg-[#FF4ECD]/10 hover:bg-[#FF4ECD]/20 text-[#FF4ECD] px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all"
                        >
                          <span>Verify</span>
                          <FiExternalLink className="size-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* Full-Screen Certificate Image Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-2xl border border-white/20 bg-slate-950 p-4 sm:p-6 shadow-2xl shadow-black/80 cursor-default flex flex-col"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 rounded-full text-white/80 hover:text-white transition-colors"
                aria-label="Close preview"
              >
                <FiX className="size-5" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pr-10 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    {getIssuerIcon(selectedCert.issuerLogo, selectedCert.issuer)}
                    <span className="text-sm font-semibold text-gray-300">
                      {selectedCert.issuer}
                    </span>
                    <span className="text-sm text-gray-500">●</span>
                    <span className="text-sm text-[#FF4ECD] font-medium">
                      {selectedCert.issueDate}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-rajdhani mt-2">
                    {selectedCert.title}
                  </h3>
                </div>

                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#FF4ECD]/40 bg-[#FF4ECD]/15 px-3.5 py-1.5 text-xs font-semibold text-[#FF4ECD] hover:bg-[#FF4ECD]/25 transition-colors"
                >
                  <span>Verify Credential</span>
                  <FiExternalLink className="size-3" />
                </a>
              </div>

              {/* Certificate Image in high res */}
              <div className="relative flex-1 overflow-auto rounded-xl border border-white/10 bg-black/60 flex items-center justify-center p-2">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Credential ID info bar */}
              {selectedCert.credentialId && (
                <div className="mt-3 flex gap-5 items-center justify-between text-xs font-semibold text-gray-400 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  <div className="flex min-w-0 items-center gap-2">
                    <FiShield className="size-3.5 shrink-0 text-[#FF4ECD]" />

                    <div className="flex min-w-0 items-center gap-1">
                      <span className="shrink-0">
                        Credential ID:
                      </span>

                      <span className="min-w-0 truncate font-mono text-white select-all">
                        {selectedCert.credentialId}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleCopyId(e, selectedCert.id, selectedCert.credentialId)}
                    className="text-[#FF4ECD] hover:underline flex items-center gap-1 font-medium font-semibold"
                  >
                    {copiedId === selectedCert.id ? (
                      <>
                        <FiCheck className="size-3 text-[#00EA64]" />
                        <span className="text-[#00EA64]">Copied</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="size-3" />
                        <span className="hidden md:inline">Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
