import React from 'react';
import './Search.css';

// Solo importar las imágenes del search field
import inputBackground from '../../images/Rectangle_2.png';
import buttonBackground from '../../images/Rectangle_button_search.png';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="search">
      {/* Contenido central */}
      <div className="search__content">
        <h1 className="search__title">
          ¿Qué está pasando en el mundo?
        </h1>

        <p className="search__subtitle">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
        </p>

        {/* Campo de búsqueda */}
        <form className="search__field" onSubmit={handleSubmit}>
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
              value={searchTerm}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="search__button">
            <img
              src={buttonBackground}
              alt="Fondo del botón buscar"
              className="search__button-bg"
            />
            <span className="search__button-text">Buscar</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;