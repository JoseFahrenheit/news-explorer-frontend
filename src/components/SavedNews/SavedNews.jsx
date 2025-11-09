import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

const SavedNews = () => {
  // Datos de ejemplo
  const savedArticles = [
    {
      id: 1,
      title: 'Noticia guardada 1',
      text: 'Esta es una noticia que has guardado.',
      source: 'Fuente Guardada',
      date: '1 de noviembre, 2024',
      image: 'https://via.placeholder.com/400x272?text=Guardada+1',
      keyword: 'tecnología'
    },
    {
      id: 2,
      title: 'Noticia guardada 2',
      text: 'Otra noticia interesante que guardaste.',
      source: 'Otra Fuente',
      date: '31 de octubre, 2024',
      image: 'https://via.placeholder.com/400x272?text=Guardada+2',
      keyword: 'ciencia'
    }
  ];

  const keywords = ['tecnología', 'ciencia', 'innovación'];

  return (
    <div className="saved-news">
      <SavedNewsHeader
        savedArticlesCount={savedArticles.length}
        keywords={keywords}
      />

      <NewsCardList
        articles={savedArticles}
        isLoggedIn={true}
        showButton={false}
      />
    </div>
  );
};

export default SavedNews;