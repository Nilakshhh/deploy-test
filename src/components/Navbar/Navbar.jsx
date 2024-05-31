import React, { useState, useEffect } from "react";
import "./Navbar.css";
import titleIcon from "./title-icon.png";
import wpIcon from "./wp-icon1.png";

function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1032);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1032);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isMobile) {
    return (
      <nav className="fixed top-0 left-0 h-screen w-56 md:w-1/6 bg-gradient-to-b from-yellow-300 to-yellow-700 text-gray-900 p-4 flex flex-col justify-between">
        <div className="text-center mb-8">
          <img
            src={titleIcon}
            alt="Title Icon"
            className="w-40 h-auto mx-auto"
          />
        </div>
        <ul className="space-y-2 text-center nav-menu flex-grow flex flex-col justify-center mb-36">
          <li
            className="font-bold hover:cursor-pointer flex items-center justify-center h-10 text-lg"
            onClick={() => scrollToSection("services")}
          >
            SERVICES
          </li>
          <li
            className="font-bold hover:cursor-pointer flex items-center justify-center h-10 text-lg"
            onClick={() => scrollToSection("products")}
          >
            PRODUCTS
          </li>
          <li
            className="font-bold hover:cursor-pointer flex items-center justify-center h-10 text-lg"
            onClick={() => scrollToSection("about")}
          >
            ABOUT US
          </li>
          <li
            className="font-bold hover:cursor-pointer flex items-center justify-center h-10 text-lg"
            onClick={() => scrollToSection("reviews")}
          >
            REVIEWS
          </li>
          <li
            className="font-bold hover:cursor-pointer flex items-center justify-center h-10 text-lg"
            onClick={() => scrollToSection("team")}
          >
            TEAM
          </li>
          <li
            className="font-bold hover:cursor-pointer flex items-center justify-center h-10 text-lg"
            onClick={() => scrollToSection("contact")}
          >
            CONTACT US
          </li>
        </ul>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <img src={wpIcon} alt="Bottom Icon" className="w-16 h-auto" />
        </div>
      </nav>
    );
  }
  return (
    <nav
      className={`fixed top-0 left-0 z-10 ${
        isMenuOpen ? "w-full h-auto" : isMobile ? "w-full" : "w-56"
      }  mobile-nav`}
      style={{
        backdropFilter: scrollY > 20 ? "blur(1px)" : "none",
        background:
          scrollY > 20
            ? "rgba(255, 255, 255, 0.5)"
            : "linear-gradient(to right, #f6e05e, #ecc94b)",
        transition: "background 0.3s ease",
      }}
    >
      <div className="text-center">
        <img src={titleIcon} alt="Title Icon" className="w-40 mt-4" />
      </div>
      {isMobile && (
        <button
          className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      )}
      {(isMobile && isMenuOpen) || !isMobile ? (
        <ul className="space-y-2 text-center nav-menu">
          <li
            className="font-bold hover:cursor-pointer"
            onClick={() => scrollToSection("services")}
          >
            SERVICES
          </li>
          <li
            className="font-bold hover:cursor-pointer"
            onClick={() => scrollToSection("products")}
          >
            PRODUCTS
          </li>
          <li
            className="font-bold hover:cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            ABOUT US
          </li>
          <li
            className="font-bold hover:cursor-pointer"
            onClick={() => scrollToSection("reviews")}
          >
            REVIEWS
          </li>
          <li
            className="font-bold hover:cursor-pointer"
            onClick={() => scrollToSection("team")}
          >
            TEAM
          </li>
          <li
            className="font-bold hover:cursor-pointer"
            onClick={() => scrollToSection("contact")}
          >
            CONTACT US
          </li>
        </ul>
      ) : null}
    </nav>
  );
}

export default Navbar;
