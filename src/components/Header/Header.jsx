import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import vectorStroke from '../../images/Vector_Stroke.png';
import rectangle from '../../images/Rectangle.png';
import './Header.css';

const Header = ({ onLoginClick }) => {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header__logo">NewsExplorer</Link>

      <nav className="header__nav">
        <Link to="/" className={`header__link ${location.pathname === '/' ? 'header__link_active' : ''}`}>
          Inicio
          {location.pathname === '/' && (
            <img src={vectorStroke} alt="" className="header__underline" />
          )}
        </Link>

        <Link to="/saved-news" className={`header__link ${location.pathname === '/saved-news' ? 'header__link_active' : ''}`}>
          Artículos guardados
          {location.pathname === '/saved-news' && (
            <img src={vectorStroke} alt="" className="header__underline" />
          )}
        </Link>

        <button
          className="header__login-btn"
          onClick={onLoginClick}
        >
          <img
            src={rectangle}
            alt=""
            className="header__btn-bg"
          />
          <span className="header__btn-text">Iniciar Sesión</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;