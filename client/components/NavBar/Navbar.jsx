import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../public/styles/_navStyles/navBar.css';
import __fang_yuan__ from '../../src/assets/fang_yuan.webp';

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
        <Link to="/about" className="nav__link" onClick={closeMenu}>About Me</Link>
        <Link to="/#projects" className="nav__link" onClick={closeMenu}>Fun Projects</Link>
        <Link to="/#paintings" className="nav__link" onClick={closeMenu}>Paintings</Link>
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