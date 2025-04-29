import React from 'react';
import { useCart } from '../context/CartContext';
import '../assets/style/cart.css';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaPlus, FaMinus, FaTrashAlt, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    getTotalPrice,
    clearCart
  } = useCart();

  if (!isCartOpen) return null;

  const navigate = useNavigate();
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/pago'); // O la ruta donde montas <Payment />
  };

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Tu Compra</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            <FaTimes className="close-icon" />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <FaShoppingCart className="cart-icon" />
            <p>Tu carrito está vacío</p>
            <button className="continue-shopping" onClick={() => setIsCartOpen(false)}>
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="placeholder-image">
                        <i className="fas fa-shoe-prints"></i>
                      </div>
                    )}
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    {item.variant && <p className="item-variant">{item.variant}</p>}
                    <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn minus-btn"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label="Disminuir cantidad"
                    >
                      <FaMinus className="quantity-icon" />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn plus-btn"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label="Aumentar cantidad"
                    >
                      <FaPlus className="quantity-icon" />
                    </button>
                  </div>
                  <div className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-item" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Eliminar producto"
                  >
                    <FaTrashAlt className="trash-icon" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-totals">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="shipping">
                  <span>Envío</span>
                  <span>{getTotalPrice() > 250 ? 'Gratis' : '$15.00'}</span>
                </div>
                <div className="total">
                  <span>Total</span>
                  <span>
                    ${(getTotalPrice() + (getTotalPrice() > 250 ? 0 : 15)).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="cart-actions">
                <button className="clear-cart" onClick={clearCart}>
                  Vaciar Carrito
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceder al Pago <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;