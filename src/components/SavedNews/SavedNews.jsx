import React, { useContext } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SavedNews.css';

const SavedNews = ({ onRemoveArticle, savedArticles }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const getTopKeywords = () => {
    const keywordCount = {};

    savedArticles.forEach(article => {
      const keyword = article.keyword;
      keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
    });

    const sortedKeywords = Object.keys(keywordCount).sort(
      (a, b) => keywordCount[b] - keywordCount[a]
    );

    return sortedKeywords;
  };

  const keywords = getTopKeywords();

  const handleRemoveArticle = (article) => {
    console.log('Eliminando artículo en SavedNews:', article.title);
    onRemoveArticle(article);
  };

  return (
    <div className="saved-news">
      <SavedNewsHeader
        savedArticlesCount={savedArticles.length}
        keywords={keywords}
        userName={currentUser?.name}
      />

      {savedArticles.length > 0 ? (
        <NewsCardList
          articles={savedArticles}
          isLoggedIn={true}
          showButton={false}
          onSaveArticle={() => {}}
          onRemoveArticle={handleRemoveArticle}
          savedArticles={savedArticles}
          isSavedNewsPage={true}
        />
      ) : (
        <div className="saved-news__empty">
          <h2 className="saved-news__empty-title">No hay artículos guardados</h2>
          <p className="saved-news__empty-text">Guarda algunos artículos para verlos aquí.</p>
        </div>
      )}
    </div>
  );
};

export default SavedNews;