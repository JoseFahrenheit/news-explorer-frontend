import React from 'react';
import './Footer.css';
import githubIcon from '../../images/Github.png';
import facebookIcon from '../../images/iconmonstr-facebook-6.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__copyright">
          © 2021 Supersite, Powered by News API
        </div>

        <div className="footer__nav">
          <div className="footer__links">
            <a href="/" className="footer__link">Inicio</a>
            <a href="https://practicum.com" className="footer__link">Practicum</a>
          </div>

          <div className="footer__social">
            <a href="https://github.com" className="footer__social-link">
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a href="https://facebook.com" className="footer__social-link">
              <img src={facebookIcon} alt="Facebook" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;