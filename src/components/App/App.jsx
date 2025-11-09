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
import './App.css';
import backgroundImage from '../../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png';

function App() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState(null);

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

  // Función simulada de búsqueda (luego se conectará a la API)
  const handleSearch = (searchTerm) => {
    setIsLoading(true);

    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          title: 'Resultado de búsqueda 1',
          text: 'Este es un resultado de búsqueda simulado. Cuando conectemos la API, aquí aparecerán noticias reales.',
          source: 'Fuente Simulada',
          date: '2 de noviembre, 2024',
          image: 'https://via.placeholder.com/400x272?text=Resultado+1',
          keyword: searchTerm
        },
        {
          id: 2,
          title: 'Resultado de búsqueda 2',
          text: 'Otro resultado de búsqueda simulado para demostrar la funcionalidad.',
          source: 'Otra Fuente',
          date: '1 de noviembre, 2024',
          image: 'https://via.placeholder.com/400x272?text=Resultado+2',
          keyword: searchTerm
        },
        {
          id: 3,
          title: 'Resultado de búsqueda 3',
          text: 'Tercer resultado simulado del sistema de búsqueda.',
          source: 'Tercera Fuente',
          date: '31 de octubre, 2024',
          image: 'https://via.placeholder.com/400x272?text=Resultado+3',
          keyword: searchTerm
        }
      ]);
      setIsLoading(false);
    }, 2000);
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
              {searchResults && !isLoading && (
                <NewsCardList
                  articles={searchResults}
                  isLoggedIn={false}
                />
              )}

              <About />
              <Footer />
            </>
          } />

          <Route path="/saved-news" element={
            <>
              <Header onLoginClick={handleOpenLogin} />
              <SavedNews />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;