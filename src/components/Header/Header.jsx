import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onLoginClick }) => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">NewsExplorer</Link>

      <nav className="header__nav">
        <Link to="/" className="header__link">
          Inicio
          <img
            src="/src/images/Vector_Stroke.png"
            alt=""
            className="header__underline"
          />
        </Link>

        <button
          className="header__login-btn"
          onClick={onLoginClick}
        >
          <img
            src="/src/images/Rectangle.png"
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