import React from 'react';
import { useLocation } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import './NewsCard.css';
import normalSaveIcon from '../../images/Normal_save.png';
import saveHoverIcon from '../../images/Save.png';
import savedIcon from '../../images/Saved.png';
import trashIcon from '../../images/Trash.png';
import deleteHoverIcon from '../../images/Delete.png';

const NewsCard = ({ article, isLoggedIn, onSaveArticle, onRemoveArticle, isSaved }) => {
  const location = useLocation();
  const data = article;
  const [isHovered, setIsHovered] = React.useState(false);

  const isSavedNewsPage = location.pathname === '/saved-news';

  const handleSaveClick = () => {
    if (isSavedNewsPage) {
      onRemoveArticle(data);
    } else {
      if (isSaved) {
        onRemoveArticle(data);
      } else {
        onSaveArticle(data);
      }
    }
  };

  const getActionIcon = () => {
    if (isSavedNewsPage) {
      return isHovered ? deleteHoverIcon : trashIcon;
    } else {
      if (isSaved) {
        return savedIcon;
      } else if (isHovered) {
        return saveHoverIcon;
      } else {
        return normalSaveIcon;
      }
    }
  };

  const getTooltipText = () => {
    if (isSavedNewsPage) {
      return 'Eliminar artículo';
    } else {
      return isLoggedIn ?
        (isSaved ? 'Eliminar de guardados' : 'Guardar artículo') :
        'Inicia sesión para guardar artículos';
    }
  };

  const getButtonClass = () => {
    if (isSavedNewsPage) {
      return 'news-card__delete-button';
    } else {
      return `news-card__save-button ${isSaved ? 'news-card__save-button_saved' : ''}`;
    }
  };

  return (
    <article className="news-card">
      <img
        src={data.urlToImage}
        alt={data.title}
        className="news-card__image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x272?text=Imagen+No+Disponible';
        }}
      />

      <button
        className={getButtonClass()}
        type="button"
        aria-label={isSavedNewsPage ? 'Eliminar artículo' : (isSaved ? 'Eliminar de guardados' : 'Guardar noticia')}
        onClick={handleSaveClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={!isSavedNewsPage && !isLoggedIn}
      >
        <img
          src={getActionIcon()}
          alt={isSavedNewsPage ? 'Eliminar artículo' : (isSaved ? 'Artículo guardado' : 'Guardar artículo')}
          className="news-card__save-icon"
        />
      </button>

      <div className="news-card__tooltip">
        {getTooltipText()}
      </div>

      <div className="news-card__keyword">
        {data.keyword || 'noticias'}
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(data.publishedAt)}</p>
        <h3 className="news-card__title">{data.title}</h3>
        <p className="news-card__text">{data.description}</p>
        <p className="news-card__source">{data.source.name}</p>
      </div>
    </article>
  );
};

export default NewsCard;