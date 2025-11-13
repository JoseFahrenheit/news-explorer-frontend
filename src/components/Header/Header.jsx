import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import vectorStroke from '../../images/Vector_Stroke.png';
import rectangle from '../../images/Rectangle.png';
import menuIcon from '../../images/menu.png';
import './Header.css';

const Header = ({ onLoginClick }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    onLoginClick();
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">NewsExplorer</Link>

      <button
        className="header__mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-label="Abrir menú"
      >
        <img src={menuIcon} alt="Menú" />
      </button>

      <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav_mobile-open' : ''}`}>
        <Link
          to="/"
          className={`header__link ${location.pathname === '/' ? 'header__link_active' : ''}`}
          onClick={handleLinkClick}
        >
          Inicio
          {location.pathname === '/' && (
            <img src={vectorStroke} alt="" className="header__underline" />
          )}
        </Link>

        <Link
          to="/saved-news"
          className={`header__link ${location.pathname === '/saved-news' ? 'header__link_active' : ''}`}
          onClick={handleLinkClick}
        >
          Artículos guardados
          {location.pathname === '/saved-news' && (
            <img src={vectorStroke} alt="" className="header__underline" />
          )}
        </Link>

        <button
          className="header__login-btn"
          onClick={handleLoginClick}
        >
          <img
            src={rectangle}
            alt=""
            className="header__btn-bg"
          />
          <span className="header__btn-text">Iniciar Sesión</span>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="header__mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;