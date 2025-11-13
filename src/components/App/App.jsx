import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Search from '../Search/Search';
import About from '../About/About';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import newsApi from '../../utils/NewsApi';
import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS, APP_CONFIG } from '../../utils/constants';
import './App.css';
import backgroundImage from '../../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png';

function App() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState(null);
  const [searchError, setSearchError] = React.useState(null);
  const [displayedArticles, setDisplayedArticles] = React.useState([]);
  const [currentSearchQuery, setCurrentSearchQuery] = React.useState('');
  const [savedArticles, setSavedArticles] = React.useState([]);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchError(ERROR_MESSAGES.EMPTY_SEARCH);
      return;
    }

    setIsLoading(true);
    setSearchError(null);
    setCurrentSearchQuery(searchTerm);
    setSearchResults(null);
    setDisplayedArticles([]);

    try {
      console.log(`Buscando: "${searchTerm}"`);
      const result = await newsApi.searchNews(searchTerm);
      console.log(`Encontrados ${result.articles.length} artículos`);

      if (result.articles.length === 0) {
        setSearchError(ERROR_MESSAGES.NO_RESULTS);
        setSearchResults(null);
        setDisplayedArticles([]);
      } else {
        const articlesWithKeyword = result.articles.map(article => ({
          ...article,
          keyword: searchTerm,
          id: article.url
        }));

        setSearchResults(articlesWithKeyword);
        const initialArticles = articlesWithKeyword.slice(0, APP_CONFIG.CARDS_PER_PAGE);
        setDisplayedArticles(initialArticles);

        localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_RESULTS, JSON.stringify(articlesWithKeyword));
        localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY, searchTerm);
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setSearchError(ERROR_MESSAGES.API_ERROR);
      setSearchResults(null);
      setDisplayedArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = () => {
    if (!searchResults) return;
    const currentCount = displayedArticles.length;
    const nextArticles = searchResults.slice(0, currentCount + APP_CONFIG.CARDS_PER_PAGE);
    setDisplayedArticles(nextArticles);
  };

  const handleSaveArticle = (article) => {
    const articleToSave = {
      ...article,
      id: article.url,
      savedAt: new Date().toISOString()
    };

    const updatedSavedArticles = [...savedArticles, articleToSave];
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ARTICLES, JSON.stringify(updatedSavedArticles));
    console.log('Artículo guardado:', article.title);
  };

  const handleRemoveArticle = (article) => {
    const updatedSavedArticles = savedArticles.filter(item => item.id !== article.id);
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ARTICLES, JSON.stringify(updatedSavedArticles));
    console.log('Artículo eliminado:', article.title);
  };

  const handleRemoveArticleFromSaved = (article) => {
  console.log('Eliminando artículo desde SavedNews:', article.title);
  handleRemoveArticle(article);
  };

  React.useEffect(() => {
    const savedResults = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_RESULTS);
    const savedQuery = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY);

    if (savedResults && savedQuery) {
      try {
        const articles = JSON.parse(savedResults);
        setSearchResults(articles);
        setCurrentSearchQuery(savedQuery);
        const initialArticles = articles.slice(0, APP_CONFIG.CARDS_PER_PAGE);
        setDisplayedArticles(initialArticles);
      } catch (error) {
        console.error('Error cargando datos guardados:', error);
      }
    }

    const savedArticlesData = localStorage.getItem(LOCAL_STORAGE_KEYS.ARTICLES);
    if (savedArticlesData) {
      try {
        const articles = JSON.parse(savedArticlesData);
        setSavedArticles(articles);
      } catch (error) {
        console.error('Error cargando artículos guardados:', error);
      }
    }

    const testNewsApi = async () => {
      try {
        console.log('Probando conexión con News API...');
        const result = await newsApi.searchNews('tecnología');
        console.log('API funcionando! Artículos encontrados:', result.articles.length);
      } catch (error) {
        console.error('Error en API:', error.message);
      }
    };
    testNewsApi();
  }, []);

  const handleOpenLogin = () => {
    setActiveModal('login');
  };

  const handleOpenRegister = () => {
    setActiveModal('register');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSwitchToRegister = () => {
    setActiveModal('register');
  };

  const handleSwitchToLogin = () => {
    setActiveModal('login');
  };

  const handleRegisterSuccess = () => {
    setActiveModal('success');
  };

  return (
    <Router>
      <div className="app">
        <Login
          isOpen={activeModal === 'login'}
          onClose={handleCloseModal}
          onSwitchToRegister={handleSwitchToRegister}
        />

        <Register
          isOpen={activeModal === 'register'}
          onClose={handleCloseModal}
          onSwitchToLogin={handleSwitchToLogin}
          onSuccess={handleRegisterSuccess}
        />

        <SuccessPopup
          isOpen={activeModal === 'success'}
          onClose={handleCloseModal}
          onSwitchToLogin={handleSwitchToLogin}
        />

        <Routes>
          <Route path="/" element={
            <>
              <div className="app__background">
                <img
                  src={backgroundImage}
                  alt="Fondo decorativo"
                  className="app__bg-image"
                />
              </div>
              <Header onLoginClick={handleOpenLogin} />
              <Search onSearch={handleSearch} />

              {isLoading && <Preloader />}

              {searchError && (
                <div className="search-error">
                  <p>{searchError}</p>
                </div>
              )}

              {displayedArticles.length > 0 && !isLoading && (
                <NewsCardList
                  articles={displayedArticles}
                  isLoggedIn={true}
                  onShowMore={handleShowMore}
                  showButton={displayedArticles.length < (searchResults?.length || 0)}
                  onSaveArticle={handleSaveArticle}
                  onRemoveArticle={handleRemoveArticle}
                  savedArticles={savedArticles}
                />
              )}

              <About />
              <Footer />
            </>
          } />

          <Route path="/saved-news" element={
            <>
              <Header onLoginClick={handleOpenLogin} />
              <SavedNews onRemoveArticle={handleRemoveArticleFromSaved} />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;