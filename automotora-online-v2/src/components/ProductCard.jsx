import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, imagen, categoria, titulo, precio, precioAnterior, esOferta, onAddToCart }) => {

  const handleAgregarAlCarrito = () => {
    if (onAddToCart) {
      onAddToCart();
    } else {
      const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
      const existe = carritoActual.find(item => item.id === id);

      let nuevoCarrito;
      if (existe) {
        nuevoCarrito = carritoActual.map(item =>
          item.id === id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item
        );
      } else {
        const rutaLimpia = imagen ? imagen.replace(/^\//, '') : '';
        nuevoCarrito = [...carritoActual, { 
          id, 
          imagen: rutaLimpia, 
          categoria, 
          titulo, 
          precio, 
          cantidad: 1 
        }];
      }

      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const srcImagen = imagen ? (imagen.startsWith('/') ? imagen : `/${imagen}`) : '';

  return (
    <div className="product-card" style={{ position: 'relative' }}>
      {esOferta && (
        <div style={{ position: 'absolute', top: '10px', left: '0', backgroundColor: '#ffc107', color: '#000', padding: '4px 12px', fontWeight: 'bold', fontSize: '0.85rem', zIndex: '2' }}>
          🔥 Oferta
        </div>
      )}
      
      <div className="card-image">
        <img src={srcImagen} alt={titulo} />
      </div>
      
      <div className="card-content">
        <span className="card-category">{categoria}</span>
        <h3 className="card-title">{titulo}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          {esOferta && precioAnterior ? (
            <>
              <span style={{ textDecoration: 'line-through', color: '#6c757d', fontSize: '0.9rem', marginBottom: '2px' }}>
                {precioAnterior}
              </span>
              <span className="card-price" style={{ color: '#dc3545', fontSize: '1.25rem', fontWeight: 'bold' }}>
                {precio}
              </span>
            </>
          ) : (
            <span className="card-price" style={{ marginTop: '20px' }}>{precio}</span>
          )}
          
          <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
            <Link 
              to={`/producto/${id}`} 
              style={{ flex: 1, textAlign: 'center', backgroundColor: '#343a40', color: '#fff', padding: '8px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}
            >
              Ver Detalle
            </Link>

            <button 
              type="button" 
              className="btn-add-cart"
              onClick={handleAgregarAlCarrito}
              style={{ flex: 1, cursor: 'pointer' }}
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;