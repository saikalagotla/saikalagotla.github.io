import React from "react";
import "./Navbar.css";
import PDF from "../Navbar/Resume.pdf";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Navigation = () => {
  return (
    <div className="bar" id="Navbar">
      <div className="logo"></div>
      <nav className="nav">
        <ul className="nav-ul">
          <AnchorLink className="projects" href="#projects">
            <li>Projects</li>
          </AnchorLink>
        </ul>
        <a href={PDF} without rel="noopener noreferrer" target="_blank">
          <button className="btn" trailingIcon="picture_as_pdf" label="Resume">
            Resume
          </button>
        </a>
      </nav>
    </div>
  );
};

export default Navigation;
