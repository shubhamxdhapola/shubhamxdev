import { Mail } from "lucide-react";
import { TbBrandLeetcode } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";

const DATA = [
  { icon: LuLinkedin, url: "https://www.linkedin.com/in/shubhamdhapola/" },
  { icon: TbBrandLeetcode, url: "https://leetcode.com/u/shubhamxdhapola/" },
  {
    icon: FiGithub,
    url: "https://github.com/shubhamxdhapola/shubhamxdhapola",
  },
  { icon: FaInstagram, url: "https://instagram.com/orewashubham" },
];

const Footer = () => {
  return (
    <div className="mt-20">
      <div className="text-center">
        <span className="font-semibold text-lg">SD</span>
        <div className="w-max flex items-center gap-2 mx-auto">
          <Mail className="text-gray-700 dark:text-gray-400" />
          shubhamdhapola143@gmail.com
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-8 md:py-6 gap-4 sm:gap-2">
        <p>© {new Date().getFullYear()} shubhamxdev. All rights reserved.</p>

        <ul className="flex items-center gap-6 justify-center mt-4 sm:mt-0">
          {DATA.map(({ icon: Icon, url }, index) => (
            <li key={index} className="hover:scale-105 duration-300">
              <a target="_blank" href={url} rel="noopener noreferrer">
                <Icon className="size-6" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
