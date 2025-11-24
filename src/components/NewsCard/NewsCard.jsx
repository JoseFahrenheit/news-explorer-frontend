import React from 'react';
import { useLocation } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import './NewsCard.css';
import normalSaveIcon from '../../images/Normal_save.png';
import saveHoverIcon from '../../images/Save.png';
import savedIcon from '../../images/Saved.png';
import trashIcon from '../../images/Trash.png';
import deleteHoverIcon from '../../images/Delete.png';

const NewsCard = ({ article, isLoggedIn, onSaveArticle, onRemoveArticle, savedArticles }) => {
  const location = useLocation();
  const data = article;
  const [isHovered, setIsHovered] = React.useState(false);

  const isSavedNewsPage = location.pathname === '/saved-news';

  console.log('=== NEWS CARD DEBUG ===');
  console.log('Article:', article);
  console.log('Saved articles count:', savedArticles?.length);
  console.log('Is saved news page:', isSavedNewsPage);

  const isSaved = React.useMemo(() => {
    console.log('Calculando isSaved...');

    if (isSavedNewsPage) return true;
    if (!savedArticles || savedArticles.length === 0) return false;

    const currentUrl = article.url || article.link;
    const isArticleSaved = savedArticles.some(savedArticle =>
      savedArticle.url === currentUrl || savedArticle.link === currentUrl
    );

    console.log('URL actual:', currentUrl);
    console.log('¿Está guardado?:', isArticleSaved);

    return isArticleSaved;
  }, [savedArticles, article, isSavedNewsPage]);

  console.log('Resultado final isSaved:', isSaved);

  const handleSaveClick = () => {
    console.log('Click en botón - isSaved:', isSaved);

    if (isSavedNewsPage) {
      onRemoveArticle(data);
    } else {
      if (isSaved) {
        const currentUrl = article.url || article.link;
        const savedArticle = savedArticles.find(item =>
          item.url === currentUrl || item.link === currentUrl
        );
        onRemoveArticle(savedArticle || data);
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
        src={data.urlToImage || data.image}
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

      {!isSavedNewsPage && (
        <div className="news-card__keyword">
          {data.keyword || 'noticias'}
        </div>
      )}

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(data.publishedAt || data.date)}</p>
        <h3 className="news-card__title">{data.title}</h3>
        <p className="news-card__text">{data.description || data.text}</p>
        <p className="news-card__source">{data.source?.name || data.source}</p>
      </div>
    </article>
  );
};

export default NewsCard;