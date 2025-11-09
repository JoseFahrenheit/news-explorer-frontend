import React from 'react';
import './SavedNewsHeader.css';

const SavedNewsHeader = ({ savedArticlesCount, keywords = [] }) => {
  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__subtitle">Artículos guardados</p>
        <h1 className="saved-news-header__title">
          {savedArticlesCount || 0} artículos guardados
        </h1>

        {keywords.length > 0 && (
          <p className="saved-news-header__keywords">
            Por palabras clave: <span className="saved-news-header__keywords-bold">
              {keywords.slice(0, 2).join(', ')}
              {keywords.length > 2 && ` y ${keywords.length - 2} más`}
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default SavedNewsHeader;