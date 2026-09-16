import React from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { Github, Linkedin, Leetcode } from "./SocialIcons";
import { profileData } from "../data/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: profileData.socials.github,
      icon: <Github className="h-5 w-5" />,
      hoverClass: "hover:bg-purple-500/20 hover:text-purple-300",
    },
    {
      name: "LinkedIn",
      href: profileData.socials.linkedin,
      icon: <Linkedin className="h-5 w-5" />,
      hoverClass: "hover:bg-blue-500/20 hover:text-blue-400",
    },
    {
      name: "Email",
      href: profileData.socials.email,
      icon: <FiMail className="h-5 w-5" />,
      hoverClass: "hover:bg-purple-500/20 hover:text-purple-300",
    },
    {
      name: "LeetCode",
      href: profileData.socials.leetcode,
      icon: <Leetcode className="h-5 w-5" />,
      hoverClass: "hover:bg-amber-500/20 hover:text-amber-400",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030712]/80 backdrop-blur-md">
      {/* Ambient footer glow */}
      <div className="absolute -top-40 left-1/2 h-40 w-[600px] -translate-x-1/2 blur-[100px] bg-[#FF4ECD]/10 pointer-events-none" />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Social Icons with Tooltips & Scale + Transform Hover */}
          <div className="flex items-center justify-center gap-5 sm:gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                to={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
                aria-label={social.name}
              >
                <div
                  className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white shadow-lg transition-all duration-300 ease-out border border-white/5 group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] active:scale-95 ${social.hoverClass}`}
                >
                  {social.icon}
                </div>
                {/* Floating tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  {social.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Glowing center dot divider */}
          <div className="flex w-full max-w-xs items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500/60 shadow-[0_0_8px_#a855f7]" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-white/60">
            © {currentYear}{" "}
            <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text font-medium text-transparent">
              {profileData.name}{" "}
            </span>
            ● All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
