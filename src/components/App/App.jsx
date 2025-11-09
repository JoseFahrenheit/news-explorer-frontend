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
import './App.css';
import backgroundImage from '../../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png';

function App() {
  const [activeModal, setActiveModal] = React.useState(null);

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
              <Search />
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