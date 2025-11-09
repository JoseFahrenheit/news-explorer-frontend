export const NEWS_API_CONFIG = {
  BASE_URL: 'https://nomoreparties.co/news/v2',
  ENDPOINTS: {
    everything: '/everything',
    topHeadlines: '/top-headlines'
  },
  DEFAULT_PARAMS: {
    pageSize: 100,
    language: 'es',
    sortBy: 'publishedAt'
  }
};

export const NEWS_API_KEY = '04d3f09e89e844a18dad4c1aceac935d';

export const ERROR_MESSAGES = {
  EMPTY_SEARCH: 'Por favor, introduzca una palabra clave',
  NO_RESULTS: 'No se ha encontrado nada para esta búsqueda',
  API_ERROR: 'Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet e intenta nuevamente.',
  RATE_LIMIT: 'Límite de solicitudes alcanzado. Por favor, intenta más tarde.'
};

export const LOCAL_STORAGE_KEYS = {
  SEARCH_RESULTS: 'newsExplorer_searchResults',
  SEARCH_QUERY: 'newsExplorer_searchQuery',
  ARTICLES: 'newsExplorer_articles'
};

export const APP_CONFIG = {
  CARDS_PER_PAGE: 3,
  MAX_CARDS: 100
};