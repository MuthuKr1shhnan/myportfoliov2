import React, { useState, useEffect } from "react";

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,  rootMargin: '-20% 0px -40% 0px'}
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const linkClasses = (id) => {
    return `text-2xl mb-10 ${
      activeSection === id ? "text-white font-bold" : "text-gray-600"
    } hover:text-white transition-colors`;
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen backdrop-blur-3xl bg-[rgba(10,10,10,.8)] z-110 flex flex-col items-center justify-center transition-transform duration-800 ease-in-out ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-7 right-9 text-3xl focus:outline-none cursor-pointer"
        aria-label="Close menu"
      >
        <span style={{ color: "hsl(0, 100%, 70%)" }} className="text-5xl">&times;</span>
      </button>
      <a
        href="#home"
        className={linkClasses("home")}
        onClick={() => setMenuOpen(false)}
      >
        Home
      </a>
      <a
        href="#about"
        className={linkClasses("about")}
        onClick={() => setMenuOpen(false)}
      >
        About
      </a>
      <a
        href="#projects"
        className={linkClasses("projects")}
        onClick={() => setMenuOpen(false)}
      >
        Projects
      </a>
      <a
        href="#contact"
        className={linkClasses("contact")}
        onClick={() => setMenuOpen(false)}
      >
        Contact
      </a>
    </div>
  );
};

export default MobileMenu;
