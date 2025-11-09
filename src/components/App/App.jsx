import React from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import About from '../About/About';
import Footer from '../Footer/Footer';
import './App.css';

import backgroundImage from '../../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png';

function App() {
  return (
    <div className="app">
      <div className="app__background">
        <img
          src={backgroundImage}
          alt="Fondo decorativo"
          className="app__bg-image"
        />
      </div>
      <Header />
      <Search />
      <About />
      <Footer />
    </div>
  );
}

export default App;