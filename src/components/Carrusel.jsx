import { useEffect, useRef, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import '../assets/style/productos.css';

const Carousel = ({ products, addToCart }) => {
  const carouselRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const animationRef = useRef(null);
  const [flippedCard, setFlippedCard] = useState(null);

  useEffect(() => {
    const updateCarouselWidth = () => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      let width;
      if (window.innerWidth <= 576) {
        width = carousel.clientWidth;
      } else if (window.innerWidth <= 991) {
        width = (carousel.clientWidth / 2) - 10;
      } else {
        width = (carousel.clientWidth / 3) - 14;
      }
      setCardWidth(width);
    };

    updateCarouselWidth();
    window.addEventListener('resize', updateCarouselWidth);
    return () => window.removeEventListener('resize', updateCarouselWidth);
  }, []);

  useEffect(() => {
    const autoScroll = () => {
      if (!isHoveringCarousel || !carouselRef.current) return;

      if (scrollSpeed !== 0) {
        carouselRef.current.scrollLeft += scrollSpeed;
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    if (isHoveringCarousel) {
      animationRef.current = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHoveringCarousel, scrollSpeed]);

  // Efecto para volver automáticamente a la vista frontal después de 5 segundos
  useEffect(() => {
    let timer;
    if (flippedCard !== null) {
      timer = setTimeout(() => {
        setFlippedCard(null);
      }, 100000); // 5 segundos para regresar automáticamente
    }
    return () => {
      clearTimeout(timer);
    };
  }, [flippedCard]);

  const handleMouseMove = (e) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { left, width } = carousel.getBoundingClientRect();
    const x = e.clientX - left;
    const edgeZone = width * 0.3;

    if (x < edgeZone) {
      setScrollSpeed(-Math.ceil((edgeZone - x) / 80));
    } else if (x > width - edgeZone) {
      setScrollSpeed(Math.ceil((x - (width - edgeZone)) / 80));
    } else {
      setScrollSpeed(0);
    }
  };

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
    }
  };

  // Función para manejar el clic en el ícono de información
  const handleInfoClick = (productId, e) => {
    // Detener la propagación para evitar que el carousel se mueva
    e.stopPropagation();

    // Si la tarjeta ya está volteada, la regresamos, de lo contrario la volteamos
    setFlippedCard(flippedCard === productId ? null : productId);
  };

  return (
    <div className="carousel-container">
      <div
        ref={carouselRef}
        className="carousel"
        onMouseEnter={() => setIsHoveringCarousel(true)}
        onMouseLeave={() => {
          setIsHoveringCarousel(false);
          setScrollSpeed(0);
        }}
        onMouseMove={handleMouseMove}
      >
        {products.map(product => (
          <div
            key={product.id}
            className={`product-card ${flippedCard === product.id ? 'flipped' : ''}`}
            style={{
              flex: `0 0 ${cardWidth}px`,
              maxWidth: `${cardWidth}px`,
              marginRight: '20px'
            }}
            data-category={product.category}
          >
            {/* Cara frontal de la tarjeta */}
            <div className="product-card-front">
              {product.bestseller && (
                <div className="product-badge bestseller">TOP VENTAS</div>
              )}
              <div className="product-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="product-placeholder">
                    <i className="fas fa-shoe-prints"></i>
                  </div>
                )}
                <div className="product-hover">
                  <button className="quick-view-btn">
                    <i className="fas fa-eye"></i> Vista rápida
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.variant}</p>
                <div className="product-details">
                  <div className="color-options">
                    {product.colors && product.colors.map((color, index) => (
                      <span
                        key={index}
                        className={`color-dot ${color}`}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      ></span>
                    ))}
                  </div>
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => {
                      const starValue = i + 1;
                      return (
                        <i
                          key={i}
                          className={
                            starValue <= product.rating
                              ? "fas fa-star"
                              : starValue <= product.rating + 0.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                          }
                        ></i>
                      );
                    })}
                    <span className="rating-count">({product.ratingCount})</span>
                  </div>
                </div>
                <div className="product-authenticity">
                  <i className="fas fa-certificate"></i> Autenticidad verificada
                </div>
                <span className="price">${product.price.toFixed(2)}</span>

                {/* Botón de información - Agregado nuevo */}
                <button
                  className="info-button"
                  onClick={(e) => handleInfoClick(product.id, e)}
                >
                  <FaInfoCircle />
                </button>

                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>

            {/* Cara trasera de la tarjeta - Agregado nuevo */}
            <div className="product-card-back">
              <div className="back-content">
                <h3>Información detallada</h3>
                <div className="product-details-extended">
                  <p><strong>Modelo:</strong> {product.name} {product.variant}</p>
                  <p><strong>Material:</strong> {product.material}</p>
                  <p><strong>Suela:</strong> {product.sole}</p>
                  <p><strong>Colores disponibles:</strong> {product.colors?.join(', ')}</p>
                  <p><strong>Lanzamiento:</strong> {product.release}</p>
                  <p><strong>Características:</strong> {product.features}</p>
                </div>
                <button
                  className="back-button"
                  onClick={(e) => handleInfoClick(product.id, e)}
                >
                  <i className="fas fa-arrow-left"></i> Volver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
