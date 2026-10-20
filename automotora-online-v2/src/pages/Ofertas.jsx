import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Ofertas = () => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const prods = JSON.parse(localStorage.getItem('productos')) || [];
    
    const filtradas = prods
      .filter(p => p.titulo.includes('Civic') || p.titulo.includes('CX-5'))
      .map(auto => {
        if (auto.titulo.includes('Civic')) {
          return { ...auto, precioAnterior: auto.precio, precio: "$20.490.000" };
        }
        if (auto.titulo.includes('CX-5')) {
          return { ...auto, precioAnterior: auto.precio, precio: "$24.490.000" };
        }
        return auto;
      });
      
    setOfertas(filtradas);
  }, []);

  const handleAddToCart = (auto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
    const existe = carritoActual.find(item => item.id === auto.id);

    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carritoActual.map(item =>
        item.id === auto.id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item
      );
    } else {
      const rutaLimpia = auto.imagen ? auto.imagen.replace(/^\//, '') : '';
      nuevoCarrito = [...carritoActual, { ...auto, imagen: rutaLimpia, cantidad: 1 }];
    }

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <main className="main-content">
      <div className="section-header">
        <h1 className="section-title">🔥 Ofertas Especiales</h1>
        <p style={{ textAlign: 'center', marginTop: '10px', color: '#666' }}>
          Aprovecha estos descuentos por tiempo limitado.
        </p>
      </div>

      <div className="product-grid">
        {ofertas.map((auto) => (
          <ProductCard
            key={`oferta-page-${auto.id}`}
            id={auto.id}
            imagen={auto.imagen}
            categoria={auto.categoria}
            titulo={auto.titulo}
            precio={auto.precio}
            precioAnterior={auto.precioAnterior}
            esOferta={true}
            onAddToCart={() => handleAddToCart(auto)}
          />
        ))}
      </div>
    </main>
  );
};

export default Ofertas;