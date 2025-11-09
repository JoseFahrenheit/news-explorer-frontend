import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const NewsCardList = ({ articles, isLoggedIn, showButton = true }) => {
  // Mantener hasta que se tenga la API
  const placeholderArticles = Array(3).fill(null).map((_, index) => ({
    id: index,
    title: `Título de noticia ejemplo ${index + 1}`,
    text: 'Texto de ejemplo de la noticia que será reemplazado cuando tengamos la API conectada.',
    source: 'Fuente Ejemplo',
    date: '2 de noviembre, 2024',
    image: `https://via.placeholder.com/400x272?text=Noticia+${index + 1}`,
    keyword: 'tecnología'
  }));

  const displayArticles = articles || placeholderArticles;

  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        <h2 className="news-card-list__title">Resultados de la búsqueda</h2>

        <div className="news-card-list__grid">
          {displayArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>

        {showButton && (
          <button className="news-card-list__button">
            Mostrar más
          </button>
        )}
      </div>
    </section>
  );
};

export default NewsCardList;