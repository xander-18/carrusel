import "../assets/style/contact.css"
import { Link } from 'react-router-dom'; // Agrega esta línea
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, } from 'react-icons/fa';
const Contactanos = () => {
  return (
    <footer id="contactanos" className="section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>
              JORDAN<span>ELITE</span>
            </h3>
            <p>
              Tu tienda exclusiva de zapatillas Jordan. Ofrecemos los modelos más buscados con garantía de autenticidad.
            </p>
            <div className="contact-info">
              <div>
                <i className="fas fa-map-marker-alt"></i> Av. Principal 123, Ciudad
              </div>
              <div>
                <i className="fas fa-phone"></i> (01) 123-4567
              </div>
              <div>
                <i className="fas fa-envelope"></i> info@jordanelite.com
              </div>
            </div>
            <div className="store-hours">
              <h4>Horario de atención</h4>
              <p>
                <i className="far fa-clock"></i> Lunes a Viernes: 10:00 - 20:00
              </p>
              <p>
                <i className="far fa-clock"></i> Sábados: 10:00 - 18:00
              </p>
              <p>
                <i className="far fa-clock"></i> Domingos: 11:00 - 16:00
              </p>
            </div>
          </div>
          <div className="footer-section links">
            <h3>Enlaces rápidos</h3>
            <ul>
              <li>
              <Link to="/">Nosotros</Link>
              </li>
              <li>
              <Link to="/productos">Productos</Link>
              </li>
              <li>
              <Link to="/coleccionistas">Club de Coleccionistas</Link>
              </li>
              {/* <li>
                <a href="#autenticidad">Autenticidad</a>
              </li>
              <li>
                <a href="#">Términos y condiciones</a>
              </li>
              <li>
                <a href="#">Política de privacidad</a>
              </li>
              <li> */}
                {/* <a href="#">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li> */}
            </ul>
          </div>
          <div className="footer-section social">
            <h3>Síguenos</h3>
            <div className="social-links">
  <a
    href="https://www.facebook.com/profile.php?id=100007101436042"
    title="Facebook"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaFacebookF />
  </a>
  <a
    href="https://www.instagram.com/jumpman23/?hl=es"
    title="Instagram"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram />
  </a>
  <a
    href="https://x.com/Jumpman23?"
    title="Twitter"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaTwitter />
  </a>
  <a
    href="https://wa.me/51935090537"
    title="WhatsApp"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaWhatsapp />
  </a>
  <a
    href="https://www.youtube.com/c/jordan"
    title="YouTube"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaYoutube />
  </a>
  {/* <a
    href="https://www.tiktok.com/"
    title="TikTok"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaTiktok />
  </a> */}
</div>
            <div className="newsletter">
              <h4>Suscríbete a nuestro newsletter</h4>
              <p>Recibe las últimas novedades y lanzamientos exclusivos</p>
              <form>
                <input type="email" placeholder="Tu correo electrónico" />
                <button type="submit" className="btn-primary">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="payment-methods-footer">
  <h4>Métodos de pago aceptados</h4>
  <div className="payment-icons">
    <FaCcVisa size={32}/>
    <FaCcMastercard size={32}/>
    <FaCcAmex size={32}/>
    <FaCcPaypal size={32}/>
  
    {/* <FaMoneyBillWave size={32}/> */}
  </div>
</div>
        <div className="footer-bottom">
          <p>&copy; 2025 Jordan Elite. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Contactanos
