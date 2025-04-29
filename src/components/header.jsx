import React from 'react';
import '../assets/style/header.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el ícono

const Header = () => {
  const { cart, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          <h1>JORDAN<span>ELITE</span></h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/" className="nav-link active">Nosotros</Link></li>
            <li><Link to="/productos" className="nav-link">Productos</Link></li>
            <li><Link to="/coleccionistas" className="nav-link">Coleccionistas</Link></li>
            <li><Link to="/contactanos" className="nav-link">Contáctanos</Link></li>
          </ul>
        </nav>
        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
          <span className="cart-count">{totalItems}</span>
          <FaShoppingCart id="cart-btn" /> {/* Nuevo ícono */}
        </div>
      </div>
    </header>
  );
};

export default Header;