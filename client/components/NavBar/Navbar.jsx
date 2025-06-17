import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../public/styles/_navStyles/navBar.css';
import __fang_yuan__ from '../../src/assets/fang_yuan.webp';
import { HiMiniSlash } from "react-icons/hi2";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav className="nav">
      <div className="nav__logo">
        <Link to="/">
          <div className="nav__diamond"></div>
        </Link>
      </div>

      <div className={`nav__links ${isMenuOpen ? 'nav__links--active' : ''}`}>
        <Link to="/" className="nav__link --app-root" onClick={closeMenu}><HiMiniSlash size={15}/></Link>
        <Link to="/about" className="nav__link" onClick={closeMenu}>About Me</Link>
        <Link to="/fun-projects" className="nav__link" onClick={closeMenu}>Fun Projects</Link>
        <Link to="/paintings" className="nav__link" onClick={closeMenu}>Paintings</Link>
        <Link to="/contact" className="nav__link" onClick={closeMenu}>Get in touch</Link>
      </div>

      <div className="nav__right">
        <div className="nav__profile-pic">
          <img src={__fang_yuan__} alt="Profile" />
        </div>
        <Link to="/#blogs" className="nav__button">My Blogs</Link>
      </div>

      <div className="nav__mobile-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;