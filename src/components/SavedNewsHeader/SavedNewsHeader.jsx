import React from 'react';
import './SavedNewsHeader.css';

const SavedNewsHeader = ({ savedArticlesCount, keywords, userName }) => {
  const formatKeywords = () => {
    if (keywords.length === 0) return '';
    if (keywords.length === 1) return keywords[0];
    if (keywords.length === 2) return `${keywords[0]} y ${keywords[1]}`;
    if (keywords.length === 3) return `${keywords[0]}, ${keywords[1]} y ${keywords[2]}`;

    return `${keywords[0]}, ${keywords[1]} y ${keywords.length - 2} más`;
  };

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__content">
        <p className="saved-news-header__subtitle">Artículos guardados</p>
        <h1 className="saved-news-header__title">
          {userName}, tienes {savedArticlesCount} artículo{savedArticlesCount !== 1 ? 's' : ''} guardado{savedArticlesCount !== 1 ? 's' : ''}
        </h1>

        {keywords.length > 0 && (
          <p className="saved-news-header__keywords">
            Por palabras clave: <span className="saved-news-header__keywords-bold">{formatKeywords()}</span>
          </p>
        )}
      </div>
    </section>
  );
};

export default SavedNewsHeader;