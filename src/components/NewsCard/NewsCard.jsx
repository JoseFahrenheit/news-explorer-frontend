import React from 'react';
import './NewsCard.css';

const NewsCard = ({ article, isLoggedIn }) => {
  const placeholderArticle = {
    title: 'Título de la noticia de ejemplo que puede ser bastante largo',
    text: 'Texto de ejemplo de la noticia. Aquí irá el contenido de la noticia cuando tengamos la API conectada.',
    source: 'Fuente de ejemplo',
    date: '2 de noviembre, 2024',
    image: 'https://via.placeholder.com/400x272?text=Imagen+Noticia',
    keyword: 'tecnología',
    link: '#'
  };

  const data = article || placeholderArticle;

  return (
    <article className="news-card">
      <img
        src={data.image}
        alt={data.title}
        className="news-card__image"
      />

      <button
        className={`news-card__save-button ${isLoggedIn ? 'news-card__save-button_saved' : ''}`}
        type="button"
        aria-label={isLoggedIn ? 'Eliminar de guardados' : 'Guardar noticia'}
      >
        {isLoggedIn ? '✓' : '🔖'}
      </button>

      <div className="news-card__tooltip">
        {isLoggedIn ? 'Eliminar de guardados' : 'Inicia sesión para guardar artículos'}
      </div>

      <div className="news-card__keyword">
        {data.keyword}
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{data.date}</p>
        <h3 className="news-card__title">{data.title}</h3>
        <p className="news-card__text">{data.text}</p>
        <p className="news-card__source">{data.source}</p>
      </div>
    </article>
  );
};

export default NewsCard;