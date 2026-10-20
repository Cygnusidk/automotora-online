import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { obtenerProductos } from '../data/datos';

const Home = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  const cargarProductos = () => {
    setProductos(obtenerProductos());
  };

  useEffect(() => {
    cargarProductos();
    window.addEventListener('productosUpdated', cargarProductos);
    return () => window.removeEventListener('productosUpdated', cargarProductos);
  }, []);

  const ofertasDestacadas = productos
    .filter(p => p.titulo.includes('Civic') || p.titulo.includes('CX-5'))
    .map(auto => {
      if (auto.titulo.includes('Civic')) return { ...auto, precioAnterior: auto.precio, precio: "$20.490.000" };
      if (auto.titulo.includes('CX-5')) return { ...auto, precioAnterior: auto.precio, precio: "$24.490.000" };
      return auto;
    });

  const irACategoria = (nombreCategoria) => {
    navigate('/categorias', { state: { categoria: nombreCategoria } });
  };

  return (
    <main className="main-content">
      <section className="hero-banner">
        <h1>Encuentra tu próximo vehículo</h1>
        <p>Explora nuestro catálogo exclusivo con las mejores ofertas del mercado automotriz.</p>
      </section>

      {/* SECCIÓN CATEGORÍAS EN PORTADA */}
      <div className="section-header">
        <h2 className="section-title">Categorías</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {["Deportivo", "Sedán", "SUV", "Camioneta"].map((cat) => (
          <div 
            key={cat} 
            onClick={() => irACategoria(cat)}
            style={{ 
              backgroundColor: '#fff', 
              padding: '25px', 
              borderRadius: '8px', 
              textAlign: 'center', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
              cursor: 'pointer',
              border: '1px solid #eee',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              color: '#343a40',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            }}
          >
            🚗 {cat}
          </div>
        ))}
      </div>

      {/* SECCIÓN OFERTAS DESTACADAS */}
      <div className="section-header">
        <h2 className="section-title">🔥 Ofertas Destacadas</h2>
      </div>
      <div className="product-grid" id="contenedor-ofertas">
        {ofertasDestacadas.map((auto) => (
          <ProductCard
            key={`oferta-${auto.id}`}
            id={auto.id}
            imagen={auto.imagen}
            categoria={auto.categoria}
            titulo={auto.titulo}
            precio={auto.precio}
            precioAnterior={auto.precioAnterior}
            esOferta={true}
          />
        ))}
      </div>

      {/* SECCIÓN CATÁLOGO DISPONIBLE */}
      <div className="section-header" style={{ marginTop: '40px' }}>
        <h2 className="section-title">Catálogo Disponible</h2>
      </div>
      <div className="product-grid" id="contenedor-productos">
        {productos.map((auto) => (
          <ProductCard
            key={auto.id}
            id={auto.id}
            imagen={auto.imagen}
            categoria={auto.categoria}
            titulo={auto.titulo}
            precio={auto.precio}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;