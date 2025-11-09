import React from 'react';
import './Search.css';

import inputBackground from '../../images/Rectangle_2.png';
import buttonBackground from '../../images/Rectangle_button_search.png';

const Search = () => {
  return (
    <section className="search">
      <div className="search__content">
        <h1 className="search__title">
          ¿Qué está pasando en el mundo?
        </h1>

        <p className="search__subtitle">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
        </p>

        <div className="search__field">
          <div className="search__input-container">
            <img
              src={inputBackground}
              alt="Fondo del campo de búsqueda"
              className="search__input-bg"
            />
            <input
              type="text"
              placeholder="Introduce un tema"
              className="search__input"
            />
          </div>

          <button className="search__button">
            <img
              src={buttonBackground}
              alt="Fondo del botón buscar"
              className="search__button-bg"
            />
            <span className="search__button-text">Buscar</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Search;