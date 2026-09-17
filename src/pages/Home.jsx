import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import ProjectList from "../components/ProjectList";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative bg-[#030712] overflow-x-clip min-h-screen">
      <Hero />
      <About />
      <ProjectList />
      <Skills />
      <Certifications />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
