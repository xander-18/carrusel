import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Nosotros from './pages/Nosotros';
import Productos from './pages/Productos';
import Coleccionistas from './pages/Coleccionista';
import Contacto from './pages/Contact';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import AdminLogin from './layout/AdminLogin';
import AdminProductos from './layout/AdminProductos';
import './App.css';
import Payment from './layout/Payment';
import backgroundMusicFile from './assets/audio/beat.mp3'; // Ajusta la ruta si es necesario

// Componente para rutas protegidas
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return element;
};

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleLogin = () => {
    localStorage.setItem('adminAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.setItem('adminAuthenticated', 'false');
    setIsAuthenticated(false);
  };

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };


  return (
    <CartProvider>
      <Router>
        <div className="app">
        <BackgroundMusic src={backgroundMusicFile} loop={true} volume={0.5} />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Nosotros />} />
              <Route path="/productos" element={<Productos products={products} />} />
              <Route path="/coleccionistas" element={<Coleccionistas />} />
              <Route path="/contactanos" element={<Contacto />} />
              <Route path="/pago" element={<Payment/>} />
              
              {/* Rutas de Administración */}
              <Route 
                path="/admin" 
                element={
                  isAuthenticated ? 
                  <Navigate to="/admin/productos" replace /> : 
                  <AdminLogin onLogin={handleLogin} />
                } 
              />
              <Route 
                path="/admin/productos" 
                element={
                  <ProtectedRoute 
                    element={
                      <div>
                        <button 
                          onClick={handleLogout}
                          style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: '#c62828',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Cerrar Sesión
                        </button>
                        <AdminProductos onAddProduct={handleAddProduct} />
                      </div>
                    } 
                  />
                } 
              />
              {/* Redirección para rutas no encontradas */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Cart />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;