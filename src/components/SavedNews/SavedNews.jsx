import React from 'react';
import './SavedNews.css';

const SavedNews = () => {
  return (
    <div className="saved-news">
      <div className="saved-news__container">
        <h1 className="saved-news__title">Artículos guardados</h1>
        <p className="saved-news__subtitle">
          Aquí aparecerán las noticias que guardes haciendo clic en el icono de guardar.
        </p>
        <div className="saved-news__placeholder">
          <p>📰 Aún no tienes artículos guardados</p>
          <p>Ve a la página principal y guarda algunas noticias interesantes.</p>
        </div>
      </div>
    </div>
  );
};

export default SavedNews;