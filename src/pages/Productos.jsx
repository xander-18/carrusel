import React, { useState, useEffect } from 'react';
import '../assets/style/productos.css';
import { useCart } from '../context/CartContext';
import ZapOne from '../assets/img/ZapOne.jpg';
import ZapTwo from '../assets/img/ZapTwo.jpg';
import ZapThree from '../assets/img/Zapthree.jpeg';
import ZapFour from '../assets/img/ZapFour.jpg';
import ZapFive from '../assets/img/ZapFive.jpg';
import Carousel from '../components/Carrusel';
import { FaCheckCircle, FaShippingFast, FaExchangeAlt, FaLock } from 'react-icons/fa';

const Productos = ({ products: externalProducts }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Air Jordan 1",
      variant: "Retro High OG 'Chicago'",
      price: 189.99,
      category: "retro",
      rating: 4.5,
      ratingCount: 124,
      colors: ["red", "black", "white"],
      bestseller: true,
      image: ZapOne,
      material: "Cuero premium y textiles sintéticos",
      sole: "Goma de alta resistencia",
      release: "Edición especial 2025",
      features: "Sistema de amortiguación Air, soporte para el arco plantar mejorado, cordones reforzados"
    },
    {
      id: 2,
      name: "Air Jordan 3",
      variant: "Retro 'Black Cement'",
      price: 219.99,
      category: "retro",
      rating: 4.7,
      ratingCount: 150,
      colors: ["black", "grey", "white", "red"],
      bestseller: true,
      image: ZapThree,
      material: "Cuero premium y textiles sintéticos",
      sole: "Goma de alta resistencia",
      release: "Edición especial 2025",
      features: "Sistema de amortiguación Air, soporte para el arco plantar mejorado, cordones reforzados"
    },
    {
      id: 3,
      name: "Air Jordan 4",
      variant: "Retro 'Bred'",
      price: 229.99,
      category: "retro",
      rating: 4.6,
      ratingCount: 130,
      colors: ["black", "red", "white"],
      bestseller: true,
      image: ZapFive,
      material: "Cuero premium y textiles sintéticos",
      sole: "Goma de alta resistencia",
      release: "Edición especial 2025",
      features: "Sistema de amortiguación Air, soporte para el arco plantar mejorado, cordones reforzados"
    },
    {
      id: 4,
      name: "Air Jordan 11",
      variant: "Retro 'Concord'",
      price: 249.99,
      category: "retro",
      rating: 4.8,
      ratingCount: 180,
      colors: ["white", "black", "blue"],
      bestseller: true,
      image: ZapTwo,
      material: "Cuero premium y textiles sintéticos",
      sole: "Goma de alta resistencia",
      release: "Edición especial 2025",
      features: "Sistema de amortiguación Air, soporte para el arco plantar mejorado, cordones reforzados"
    },
    {
      id: 5,
      name: "Air Jordan 12",
      variant: "Retro 'Flu Game'",
      price: 239.99,
      category: "retro",
      rating: 4.7,
      ratingCount: 140,
      colors: ["black", "red"],
      bestseller: true,
      image: ZapFour,
      material: "Cuero premium y textiles sintéticos",
      sole: "Goma de alta resistencia",
      release: "Edición especial 2025",
      features: "Sistema de amortiguación Air, soporte para el arco plantar mejorado, cordones reforzados"
    },
    {
      id: 6,
      name: "Air Jordan 36",
      variant: "Performance",
      price: 259.99,
      category: "performance",
      rating: 4.9,
      ratingCount: 95,
      colors: ["blue", "white", "black"],
      bestseller: false,
      image: ZapTwo,
      material: "Flyknit y materiales sintéticos",
      sole: "Goma de tracción superior",
      release: "Edición 2025",
      features: "Tecnología de respuesta rápida, amortiguación mejorada, sistema de ventilación"
    },
    {
      id: 7,
      name: "Air Jordan x Dior",
      variant: "Collaboration Edition",
      price: 499.99,
      category: "collaboration",
      rating: 5.0,
      ratingCount: 75,
      colors: ["grey", "white", "blue"],
      bestseller: false,
      image: ZapOne,
      material: "Cuero italiano premium",
      sole: "Goma transparente de lujo",
      release: "Edición limitada 2025",
      features: "Colaboración exclusiva con Dior, detalles de alta costura, caja premium incluida"
    },
    {
      id: 8,
      name: "Air Jordan Trophy Room",
      variant: "Limited Edition",
      price: 399.99,
      category: "limited",
      rating: 4.9,
      ratingCount: 50,
      colors: ["gold", "black", "red"],
      bestseller: false,
      image: ZapFour,
      material: "Cuero premium y detalles metálicos",
      sole: "Goma especial con acabado metalizado",
      release: "Edición ultra limitada 2025",
      features: "Numeración única, certificado de autenticidad, empaque coleccionable"
    }
  ]);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (externalProducts && externalProducts.length > 0) {
      const allProducts = [...products];
      externalProducts.forEach(extProduct => {
        if (!allProducts.some(p => p.id === extProduct.id)) {
          allProducts.push(extProduct);
        }
      });
      setProducts(allProducts);
    }
  }, [externalProducts, products]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = activeCategory === 'all'
        ? products
        : products.filter(product => product.category === activeCategory);
      const sorted = [...filtered].sort((a, b) => {
        switch(sortOrder) {
          case 'newest':
            return b.id - a.id;
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'exclusive':
            return b.bestseller ? -1 : 1;
          default:
            return b.rating - a.rating;
        }
      });
      setFilteredProducts(sorted);
    };
    applyFilters();
  }, [activeCategory, sortOrder, products]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.bestseller && <span className="bestseller-badge">Bestseller</span>}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-variant">{product.variant}</p>
        <div className="product-rating">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          <span className="rating-count">({product.ratingCount})</span>
        </div>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button 
          className="add-to-cart-btn" 
          onClick={() => addToCart(product)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );

  return (
    <section id="productos" className="section">
      <div className="container">
        <div className="wow-title-container">
          <h2 className="wow-title">NUESTRA <span className="ultra-glow">COLECCIÓN</span> ELITE</h2>
          <div className="title-badges">
            <span className="badge premium-badge">PREMIUM</span>
            <span className="badge exclusive-badge">EXCLUSIVO</span>
          </div>
        </div>

        <div className="visual-effects">
          <div className="spotlight spotlight-left"></div>
          <div className="spotlight spotlight-right"></div>
          <div className="floating-particles"></div>
        </div>

        <div className="product-categories">
          <button
            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            Todos
          </button>
          <button
            className={`category-btn ${activeCategory === 'retro' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('retro')}
          >
            Retro
          </button>
          <button
            className={`category-btn ${activeCategory === 'performance' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('performance')}
          >
            Performance
          </button>
          <button
            className={`category-btn ${activeCategory === 'limited' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('limited')}
          >
            Edición Limitada
          </button>
          <button
            className={`category-btn ${activeCategory === 'collaboration' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('collaboration')}
          >
            Collaborations
          </button>
        </div>

        <div className="quick-filters">
          <div className="filter-group">
            <span className="filter-label">Ordenar por:</span>
            <select id="sort-products" value={sortOrder} onChange={handleSortChange}>
              <option value="popular">Popularidad</option>
              <option value="newest">Más recientes</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="exclusive">Exclusividad</option>
            </select>
          </div>
          <div className="filter-group">
            <span className="filter-label">Mostrar:</span>
            <div className="view-options">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => handleViewChange('grid')}
              >
                <i className="fas fa-th"></i>
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => handleViewChange('list')}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>

        <div className={`products-wrapper ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
          {filteredProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <Carousel products={filteredProducts} addToCart={addToCart} />
            ) : (
              <div className="products-list">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <div className="no-products-found">
              <p>No se encontraron productos en esta categoría</p>
            </div>
          )}
        </div>

        <div className="product-features">
          <div className="feature">
            <FaCheckCircle className="feature-icon" />
            <h4>100% Auténtico</h4>
            <p>Todos nuestros productos son originales con garantía</p>
          </div>
          <div className="feature">
            <FaShippingFast className="feature-icon" />
            <h4>Envío Gratis</h4>
            <p>En compras superiores a $250</p>
          </div>
          <div className="feature">
            <FaExchangeAlt className="feature-icon" />
            <h4>Devolución sin costo</h4>
            <p>30 días para cambios y devoluciones</p>
          </div>
          <div className="feature">
            <FaLock className="feature-icon" />
            <h4>Pago Seguro</h4>
            <p>Múltiples métodos de pago encriptados</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productos;