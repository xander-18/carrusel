import React, { useState } from 'react';

const AdminProductos = ({ onAddProduct }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'retro',
    rating: 5,
    ratingCount: 0,
    colors: '',
    image: ''
  });
  
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // Configurar la vista previa de la imagen
    if (e.target.name === 'image' && e.target.value) {
      setPreviewUrl(e.target.value);
    }
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    
    onAddProduct({
      ...form,
      price: parseFloat(form.price),
      colors: form.colors.split(',').map(c => c.trim()),
      id: Date.now(),
      variant: "",  // Valores por defecto para campos no incluidos en el formulario
      bestseller: false,
      material: "Cuero premium y textiles sintéticos",
      sole: "Goma de alta resistencia",
      release: "Nueva adición",
      features: "Sistema de amortiguación Air, soporte para el arco plantar mejorado, cordones reforzados"
    });
    
    // Mensaje de éxito
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    
    // Reset del formulario
    setForm({
      name: '',
      price: '',
      category: 'retro',
      rating: 5,
      ratingCount: 0,
      colors: '',
      image: ''
    });
    setPreviewUrl('');
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #444',
    background: '#333',
    color: '#fff'
  };
  
  return (
    <div style={{ 
      maxWidth: 600, 
      margin: '80px auto', 
      background: '#222', 
      padding: 30, 
      borderRadius: 10,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>Panel Administrativo - Agregar Producto</h2>
      
      {submitted && (
        <div style={{ 
          background: '#4caf50', 
          color: 'white', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ¡Producto agregado con éxito!
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div>
            <input 
              name="name" 
              placeholder="Nombre del producto" 
              value={form.name} 
              onChange={handleChange} 
              required 
              style={inputStyle}
            />
            
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="retro">Retro</option>
              <option value="performance">Performance</option>
              <option value="limited">Edición Limitada</option>
              <option value="collaboration">Collaborations</option>
            </select>
            
            <input 
              name="price" 
              placeholder="Precio" 
              type="number" 
              min="0" 
              step="0.01"
              value={form.price} 
              onChange={handleChange} 
              required 
              style={inputStyle}
            />
            
            <input 
              name="colors" 
              placeholder="Colores (separados por comas)" 
              value={form.colors} 
              onChange={handleChange} 
              style={inputStyle}
            />
         
            <input 
              name="image" 
              placeholder="URL de la imagen" 
              value={form.image} 
              onChange={handleChange} 
              style={inputStyle}
            />
            
            <button 
              onClick={handleSubmit}
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
              Agregar Producto
            </button>
          </div>
        </div>
        
        {/* Vista previa de la imagen */}
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ color: '#fff', marginBottom: '10px' }}>Vista Previa</h3>
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Vista previa del producto" 
              style={{ 
                maxWidth: '100%',
                maxHeight: '200px',
                objectFit: 'contain',
                border: '1px solid #444',
                borderRadius: '4px',
                padding: '5px',
                background: '#333'
              }} 
            />
          ) : (
            <div style={{ 
              width: '100%',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed #444',
              borderRadius: '4px',
              color: '#777'
            }}>
              No hay imagen
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductos;