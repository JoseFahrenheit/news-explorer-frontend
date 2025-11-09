import React from 'react';
import './Header.css';

const Header = () => {
    return(
        <header className='header'>
            <div className='header__logo'>NewsExplorer</div>
            <nav className='header__nav'>
                <a href='/' className='header__link header__link--active'>
                Inicio
                <img
                    src='/src/images/Vector_Stroke.png'
                    alt=''
                    className='header__underline'
                />
               </a>

               <button className='header__login-btn'>
                    <img
                        src='/src/images/Rectangle.png'
                        alt=''
                        className='header__btn-bg'
                    />
                    <span className='header__btn-text'>Iniciar Sesión</span>
               </button>
            </nav>
        </header>
    );
};

export default Header;