import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import AboutPage from "./pages/AboutPage";
import Resume from "./pages/Resume";
import CertificationsPage from "./pages/CertificationsPage";
import LeetCodePage from "./pages/LeetCodePage";
import ClickSpark from "./components/reactbits/ClickSpark";
import SmoothScroll from "./components/SmoothScroll";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ClickSpark
          sparkColor="#FF4ECD"
          sparkSize={9}
          sparkRadius={18}
          sparkCount={8}
          duration={420}
        >
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/certificates" element={<CertificationsPage />} />
            <Route path="/leetcode" element={<LeetCodePage />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </ClickSpark>
      </SmoothScroll>
    </BrowserRouter>
  );
}
