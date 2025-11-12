import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

const SavedNews = ({ onRemoveArticle }) => {
  const savedArticlesData = localStorage.getItem('newsExplorer_articles');
  const [savedArticles, setSavedArticles] = React.useState(
    savedArticlesData ? JSON.parse(savedArticlesData) : []
  );

  const handleRemoveArticle = (article) => {
    console.log('Eliminando artículo en SavedNews:', article.title);

    if (onRemoveArticle) {
      onRemoveArticle(article);
    }

    const updatedArticles = savedArticles.filter(item => item.id !== article.id);
    setSavedArticles(updatedArticles);

    console.log('Artículo eliminado localmente. Total restante:', updatedArticles.length);
  };

  React.useEffect(() => {
    const savedArticlesData = localStorage.getItem('newsExplorer_articles');
    if (savedArticlesData) {
      const articles = JSON.parse(savedArticlesData);
      setSavedArticles(articles);
    }
  }, []);

  const keywords = [...new Set(savedArticles.map(article => article.keyword))].slice(0, 3);

  return (
    <div className="saved-news">
      <SavedNewsHeader
        savedArticlesCount={savedArticles.length}
        keywords={keywords}
      />

      {savedArticles.length > 0 ? (
        <NewsCardList
          articles={savedArticles}
          isLoggedIn={true}
          showButton={false}
          onSaveArticle={() => {}}
          onRemoveArticle={handleRemoveArticle}
          savedArticles={savedArticles}
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