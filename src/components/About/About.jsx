import React from 'react';
import './About.css';
import authorImage from '../../images/Fahren.jpg';

const About = () => {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image-container">
          <img
            src={authorImage}
            alt="Fahren - Autor del proyecto"
            className="about__image"
          />
        </div>

        <div className="about__content">
          <h2 className="about__title">Acerca del autor</h2>
          <p className="about__text">
            José Hernández, aka Mr. Fahrenheit, guitarrista de la banda Roazt, creador del podcast El Naufragio
            y Full Stack developer, ha creado esta pagina para que puedas ver las noticias de tu interes, esperando
            sea de tu agrado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;