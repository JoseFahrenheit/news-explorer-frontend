import { NEWS_API_CONFIG, NEWS_API_KEY } from './constants';
import { getOneWeekAgoDate, getTodayDate, processArticleData } from './formatDate';

class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  async _request(endpoint, params = {}) {
    try {
      const url = new URL(`${this._baseUrl}${endpoint}`);

      const allParams = {
        ...NEWS_API_CONFIG.DEFAULT_PARAMS,
        ...params,
        apiKey: this._apiKey
      };

      Object.keys(allParams).forEach(key => {
        if (allParams[key]) {
          url.searchParams.append(key, allParams[key]);
        }
      });

      console.log('Making request to:', url.toString());

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 'ok') {
        throw new Error(data.message || 'Unknown error from News API');
      }

      return data;

    } catch (error) {
      console.error('News API request failed:', error);

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to News API');
      }

      throw error;
    }
  }

  async searchNews(keyword) {
    if (!keyword || keyword.trim() === '') {
      throw new Error('Search keyword cannot be empty');
    }

    const params = {
      q: keyword.trim(),
      from: getOneWeekAgoDate(),
      to: getTodayDate(),
      pageSize: 100
    };

    const result = await this._request(NEWS_API_CONFIG.ENDPOINTS.everything, params);

    const processedArticles = result.articles
      .filter(article => article.title && article.title !== '[Removed]')
      .map(article => processArticleData(article));

    return {
      ...result,
      articles: processedArticles
    };
  }

  async getTopHeadlines(country = 'us') {
    const params = {
      country: country
    };

    const result = await this._request(NEWS_API_CONFIG.ENDPOINTS.topHeadlines, params);

    const processedArticles = result.articles
      .filter(article => article.title && article.title !== '[Removed]')
      .map(article => processArticleData(article));

    return {
      ...result,
      articles: processedArticles
    };
  }
}

const newsApi = new NewsApi({
  baseUrl: NEWS_API_CONFIG.BASE_URL,
  apiKey: NEWS_API_KEY
});

export default newsApi;