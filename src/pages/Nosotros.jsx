import React from 'react';
import '../assets/style/nosotros.css';
import Video from '../assets/video/jordan_historia.mp4';

const Nosotros = () => {
  return (
    <section id="nosotros" className="section active">
      <div className="container">
        <div className="nosotros-content">
          <div className="nosotros-text">
            <h2>NUESTRA HISTORIA</h2>
            <p>Jordan Elite nació en 2015 con una misión clara: traer las mejores y más exclusivas zapatillas Jordan al mercado local. Fundada por apasionados del baloncesto y coleccionistas de sneakers, nuestra tienda se ha convertido en el destino preferido para los verdaderos fanáticos de la cultura Jordan.</p>
            <p>Cada par de zapatillas que ofrecemos ha sido cuidadosamente seleccionado, garantizando autenticidad y calidad en cada detalle. No solo vendemos calzado, creamos una experiencia para los amantes del estilo y la exclusividad.</p>
          </div>
          <div className="nosotros-image">
            <div className="video-wrapper">
              <video
                className="nosotros-video"
                src={Video}
                autoPlay muted loop playsInline webkit-playsinline
              >
                Tu navegador no soporta reproducción de video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
