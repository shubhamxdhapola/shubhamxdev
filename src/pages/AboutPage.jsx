import React, { useEffect } from "react";
import About from "../components/About";
import Footer from "../components/Footer";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-x-hidden">
      <div className="pt-16 sm:pt-20">
        <About />
      </div>
      <Footer />
    </div>
  );
}
