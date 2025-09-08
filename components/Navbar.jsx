import { X, AlignRight, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const hideMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", hideMenu);
    return () => {
      document.removeEventListener("mousedown", hideMenu);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <>
      <nav
        className={`w-full sticky top-0 px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 duration-300 border-gray-200 dark:border-darkHover ${
          isScroll
            ? "bg-white bg-opacity-50 backdrop-blur-lg border-b-[0.5px] dark:bg-darkTheme dark:shadow-white/20"
            : ""
        }`}
      >
        <a href="#home" className="text-lg font-semibold font-Ovo">
          SD<span className="text-red-600">.</span>
        </a>

        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${
            isScroll
              ? ""
              : "bg-white shadow-sm bg-opacity-50 dark:border-white/10 border-[0.5px] border-gray-200 dark:bg-transparent"
          } `}
        >
          <li>
            <a className="font-Ovo" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#contact">
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsDarkMode((prev) => !prev)}>
            <span>{isDarkMode ? <Sun /> : <Moon />} </span>
          </button>

          <button className="block md:hidden " onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <AlignRight />}
          </button>
        </div>

        {/* -- ----- mobile menu ------  -- */}

        <div
          ref={menuRef}
          className={`flex md:hidden flex-col gap-4 py-5 px-10 fixed top-0 bottom-0 w-64 z-50 h-screen border-r-[0.5px] dark:bg-darkHover duration-300 dark:border-darkTheme bg-lightHover text-lg ${
            isMenuOpen ? "left-0" : "-left-[100vw]"
          }`}
        >
          <a href="#home" className="text-lg font-semibold font-Ovo">
            SD<span className="text-red-600">.</span>
          </a>
          <ul className="py-5 space-y-4">
            <li>
              <a className="font-Ovo" onClick={toggleMenu} href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="font-Ovo" onClick={toggleMenu} href="#about">
                About
              </a>
            </li>

            <li>
              <a className="font-Ovo" onClick={toggleMenu} href="#projects">
                Projects
              </a>
            </li>
            <li>
              <a className="font-Ovo" onClick={toggleMenu} href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
