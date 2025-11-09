export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Fecha no disponible';
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return date.toLocaleDateString('es-ES', options);
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return 'Fecha no disponible';
  }
};

export const getOneWeekAgoDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split('T')[0];
};

export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const processArticleData = (article) => {
  return {
    title: article.title || 'Título no disponible',
    description: article.description || 'Descripción no disponible',
    url: article.url || '#',
    urlToImage: article.urlToImage || 'https://via.placeholder.com/400x272?text=Imagen+No+Disponible',
    publishedAt: article.publishedAt || new Date().toISOString(),
    source: {
      name: article.source?.name || 'Fuente desconocida'
    },
    keyword: 'búsqueda'
  };
};