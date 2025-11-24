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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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
  const [currentUser, setCurrentUser] = React.useState(null);
  const [authError, setAuthError] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.checkToken()
        .then(userData => {
          setCurrentUser(userData);
          loadSavedArticles();
        })
        .catch(err => {
          console.error('Error verificando token:', err);
          localStorage.removeItem('jwt');
        });
    }
  }, []);

  const loadSavedArticles = () => {
    mainApi.getSavedArticles()
      .then(articles => {
        setSavedArticles(articles);
      })
      .catch(err => console.error('Error cargando artículos:', err));
  };

  const handleRegister = async (formData) => {
    try {
      setAuthError('');
      await mainApi.register(formData);
      return true;
    } catch (error) {
      setAuthError('Error en el registro. Intenta nuevamente.');
      return false;
    }
  };

  const handleLogin = async (formData) => {
    try {
      setAuthError('');
      const data = await mainApi.login(formData);

      localStorage.setItem('jwt', data.token);
      const userData = await mainApi.checkToken();

      setCurrentUser(userData);
      await loadSavedArticles();
      setActiveModal(null);
      setAuthError('');
      return true;
    } catch (error) {
      setAuthError('Credenciales incorrectas. Intenta nuevamente.');
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setSavedArticles([]);
  };

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

const handleSaveArticle = async (article) => {
  if (!currentUser) {
    setActiveModal('login');
    return;
  }

  try {
    const articleToSave = {
      keyword: article.keyword || currentSearchQuery || 'general',
      title: article.title || 'Sin título',
      text: article.description || article.content || 'Descripción no disponible',
      date: article.publishedAt || new Date().toISOString(),
      source: article.source?.name || 'Fuente desconocida',
      link: article.url || '#',
      image: article.urlToImage || ''
    };

    console.log('Guardando artículo...');
    const savedArticle = await mainApi.saveArticle(articleToSave);
    console.log('Artículo guardado:', savedArticle);

    setSavedArticles(prev => {
      const newArticles = [...prev, savedArticle];
      console.log('Nuevos savedArticles:', newArticles);
      return newArticles;
    });

  } catch (error) {
    console.error('Error guardando artículo:', error);
  }
};

  const handleRemoveArticle = async (article) => {
    try {
      await mainApi.deleteArticle(article._id || article.id);
      const updatedSavedArticles = savedArticles.filter(item =>
        item._id !== (article._id || article.id)
      );
      setSavedArticles(updatedSavedArticles);
      console.log('Artículo eliminado del backend:', article.title);
    } catch (error) {
      console.error('Error eliminando artículo:', error);
    }
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

    if (currentUser) {
      loadSavedArticles();
    } else {
      const savedArticlesData = localStorage.getItem(LOCAL_STORAGE_KEYS.ARTICLES);
      if (savedArticlesData) {
        try {
          const articles = JSON.parse(savedArticlesData);
          setSavedArticles(articles);
        } catch (error) {
          console.error('Error cargando artículos guardados:', error);
        }
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
  }, [currentUser]);

  const handleOpenLogin = () => {
    setActiveModal('login');
    setAuthError('');
  };

  const handleOpenRegister = () => {
    setActiveModal('register');
    setAuthError('');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setAuthError('');
  };

  const handleSwitchToRegister = () => {
    setActiveModal('register');
    setAuthError('');
  };

  const handleSwitchToLogin = () => {
    setActiveModal('login');
    setAuthError('');
  };

  const handleRegisterSuccess = () => {
    setActiveModal('success');
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <div className="app">
          <Login
            isOpen={activeModal === 'login'}
            onClose={handleCloseModal}
            onSwitchToRegister={handleSwitchToRegister}
            onLogin={handleLogin}
            authError={authError}
          />

          <Register
            isOpen={activeModal === 'register'}
            onClose={handleCloseModal}
            onSwitchToLogin={handleSwitchToLogin}
            onRegister={handleRegister}
            onSuccess={handleRegisterSuccess}
            authError={authError}
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
                <Header
                  onLoginClick={handleOpenLogin}
                  onLogout={handleLogout}
                  currentUser={currentUser}
                />
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
                    isLoggedIn={!!currentUser}
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
              <ProtectedRoute currentUser={currentUser}>
                <Header
                  onLoginClick={handleOpenLogin}
                  onLogout={handleLogout}
                  currentUser={currentUser}
                />
                <SavedNews
                  onRemoveArticle={handleRemoveArticleFromSaved}
                  savedArticles={savedArticles}
                />
                <Footer />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;