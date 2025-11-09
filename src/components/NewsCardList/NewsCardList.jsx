import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const NewsCardList = ({
  articles,
  isLoggedIn,
  onShowMore,
  showButton = true,
  onSaveArticle,
  onRemoveArticle,
  savedArticles
}) => {
  const isArticleSaved = (article) => {
    return savedArticles.some(savedArticle => savedArticle.id === article.id);
  };

  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        <h2 className="news-card-list__title">Resultados de la búsqueda</h2>

        <div className="news-card-list__grid">
          {articles.map((article) => (
            <NewsCard
              key={article.id || article.url}
              article={article}
              isLoggedIn={isLoggedIn}
              onSaveArticle={onSaveArticle}
              onRemoveArticle={onRemoveArticle}
              isSaved={isArticleSaved(article)}
            />
          ))}
        </div>

        {showButton && onShowMore && (
          <button className="news-card-list__button" onClick={onShowMore}>
            Mostrar más
          </button>
        )}
      </div>
    </section>
  );
};

export default NewsCardList;