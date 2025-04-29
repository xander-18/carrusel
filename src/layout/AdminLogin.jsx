
// AdminLogin.js - Componente mejorado
import React, { useState } from 'react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

const AdminLogin = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      onLogin();
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };
  
  return (
    <div className="admin-login-container" style={{ 
      maxWidth: 400, 
      margin: '80px auto', 
      background: '#222', 
      padding: 24, 
      borderRadius: 10,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={e => setUser(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px',
              border: '1px solid #444',
              background: '#333',
              color: '#fff'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={e => setPass(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px',
              border: '1px solid #444',
              background: '#333',
              color: '#fff'
            }}
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            width: '100%',
            padding: '12px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Iniciar Sesión
        </button>
      </form>
      {error && <p style={{ color: '#ff6b6b', marginTop: 15, textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;