import React from 'react';
import '../assets/style/coleccionista.css'
import ModelOne from '../assets/img/chris.jpg';
import ModelTwo from '../assets/img/macklemore.jpeg';
import ModelThree from '../assets/img/khaled.jpg';
import ModelFour from '../assets/img/xander.jpeg';
import ColectOne from '../assets/img/colect.jpeg';
import ColectTwo from '../assets/img/collect2.jpg';
const ColeccionistasSection = () => {
    return (
        <section id="coleccionistas" className="section">
            <div className="container">
                <div className="collectors-title">
                    <h2 className="wow-title">CLUB DE <span className="ultra-glow">COLECCIONISTAS</span></h2>
                    <p className="section-subtitle">Únete a nuestra exclusiva comunidad de verdaderos aficionados</p>
                </div>

                <div className="collectors-content">
                    <div className="collectors-info">
                        <div className="collectors-text">
                            <h3><i className="fas fa-crown"></i> Membresía Elite</h3>
                            <p>Nuestro club de coleccionistas ofrece beneficios exclusivos para los verdaderos entusiastas de Jordan. Accede a lanzamientos anticipados, eventos privados y oportunidades únicas para ampliar tu colección con los modelos más codiciados del mercado.</p>

                            <div className="membership-levels">
                                <div className="level-card">
                                    <div className="level-header">
                                        <h4>Silver</h4>
                                        <span className="level-price">$99/año</span>
                                    </div>
                                    <ul className="level-benefits">
                                        <li>Acceso anticipado a nuevos lanzamientos</li>
                                        <li>10% de descuento en compras regulares</li>
                                        <li>Invitaciones a eventos exclusivos</li>
                                        <li>Newsletter mensual de coleccionista</li>
                                    </ul>
                                    <button className="btn-primary">Unirse ahora</button>
                                </div>

                                <div className="level-card featured">
                                    <div className="level-badge">Recomendado</div>
                                    <div className="level-header">
                                        <h4>Gold</h4>
                                        <span className="level-price">$199/año</span>
                                    </div>
                                    <ul className="level-benefits">
                                        <li>Todos los beneficios Silver</li>
                                        <li>15% de descuento en compras regulares</li>
                                        <li>Acceso a modelos de edición limitada</li>
                                        <li>Servicio de autenticación gratuito</li>
                                        <li>Envío express gratuito</li>
                                    </ul>
                                    <button className="btn-primary">Unirse ahora</button>
                                </div>

                                <div className="level-card">
                                    <div className="level-header">
                                        <h4>Platinum</h4>
                                        <span className="level-price">$349/año</span>
                                    </div>
                                    <ul className="level-benefits">
                                        <li>Todos los beneficios Gold</li>
                                        <li>20% de descuento en todas las compras</li>
                                        <li>Acceso garantizado a todos los lanzamientos</li>
                                        <li>Servicio de concierge personal</li>
                                        <li>Invitaciones VIP a eventos con atletas</li>
                                        <li>Regalo exclusivo de bienvenida</li>
                                    </ul>
                                    <button className="btn-primary">Unirse ahora</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="collectors-testimonials">
                        <h3>Lo que dicen nuestros coleccionistas</h3>
                        <div className="testimonial-slider">
                            <div className="testimonial">
                                <div className="testimonial-image">
                                    <img src={ColectOne} alt="Coleccionista" />
                                </div>
                                <div className="testimonial-content">
                                    <p>"Gracias a Jordan Elite he conseguido pares que buscaba desde hace años. Su autenticidad y exclusividad no tienen comparación."</p>
                                    <div className="testimonial-author">
                                        <h4>PJ Tucker</h4>
                                        <span>Coleccionista desde 2018</span>
                                    </div>
                                </div>
                            </div>

                            <div className="testimonial">
                                <div className="testimonial-image">
                                    <img src={ColectTwo} alt="Coleccionista" />
                                </div>
                                <div className="testimonial-content">
                                    <p>"La membresía Platinum ha sido la mejor inversión para mi colección. He conseguido modelos que ni siquiera sabía que podría encontrar en el país."</p>
                                    <div className="testimonial-author">
                                        <h4>Travis Scott</h4>
                                        <span>Miembro Platinum</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="collectors-gallery">
                        <h3>Galería de coleccionistas</h3>
                        <div className="gallery-grid">
                            <div className="gallery-item">
                                <img src={ModelOne} alt="Colección de Jordan" />
                            </div>
                            <div className="gallery-item">
                                <img src={ModelTwo} alt="Colección de Jordan" />
                            </div>
                            <div className="gallery-item">
                                <img src={ModelThree} alt="Colección de Jordan" />
                            </div>
                            <div className="gallery-item">
                                <img src={ModelFour} alt="Colección de Jordan" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ColeccionistasSection;
