import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import vectorStroke from '../../images/Vector_Stroke.png';
import rectangle from '../../images/Rectangle.png';
import menuIcon from '../../images/menu.png';
import './Header.css';

const Header = ({ onLoginClick, onLogout, currentUser }) => {
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

  const handleLogoutClick = () => {
    setIsMobileMenuOpen(false);
    onLogout();
  };

  const isHomePage = location.pathname === '/';
  const isSavedNewsPage = location.pathname === '/saved-news';

  return (
    <header className={`header ${isSavedNewsPage ? 'header_white' : ''}`}>
      <Link
        to="/"
        className={`header__logo ${isSavedNewsPage ? 'header__logo_black' : ''}`}
      >
        NewsExplorer
      </Link>

      <button
        className={`header__mobile-menu-button ${isSavedNewsPage ? 'header__mobile-menu-button_black' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Abrir menú"
      >
        <img src={menuIcon} alt="Menú" />
      </button>

      <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav_mobile-open' : ''} ${isSavedNewsPage ? 'header__nav_white' : ''}`}>
        <Link
          to="/"
          className={`header__link ${isHomePage ? 'header__link_active' : ''} ${isSavedNewsPage ? 'header__link_black' : ''}`}
          onClick={handleLinkClick}
        >
          Inicio
          {isHomePage && (
            <img src={vectorStroke} alt="" className="header__underline" />
          )}
        </Link>

        {currentUser && (
          <Link
            to="/saved-news"
            className={`header__link ${isSavedNewsPage ? 'header__link_active' : ''} ${isSavedNewsPage ? 'header__link_black' : ''}`}
            onClick={handleLinkClick}
          >
            Artículos guardados
            {isSavedNewsPage && (
              <img src={vectorStroke} alt="" className="header__underline" />
            )}
          </Link>
        )}

        {currentUser ? (
          <button
            className="header__logout-btn"
            onClick={handleLogoutClick}
          >
            <span className={`header__username ${isSavedNewsPage ? 'header__username_black' : ''}`}>
              {currentUser.name}
            </span>
            <img
              src={rectangle}
              alt=""
              className="header__btn-bg"
            />
            <span className={`header__btn-text ${isSavedNewsPage ? 'header__btn-text_black' : ''}`}>
              Cerrar sesión
            </span>
          </button>
        ) : (
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
        )}
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