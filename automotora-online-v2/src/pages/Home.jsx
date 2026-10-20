import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const productosIniciales = [
  { id: 1, imagen: "img/mustang.jpg", categoria: "Deportivo", titulo: "Ford Mustang GT", precio: "$45.000.000", descripcion: "V8 5.0L de alto rendimiento" },
  { id: 5, imagen: "img/camaro.jpg", categoria: "Deportivo", titulo: "Chevrolet Camaro SS", precio: "$42.000.000", descripcion: "Motor V8 deportivo" },
  { id: 10, imagen: "img/porsche.jpg", categoria: "Deportivo Premium", titulo: "Porsche 911 Carrera", precio: "$120.000.000", descripcion: "Deportivo de lujo" },
  { id: 7, imagen: "img/bmw3.jpg", categoria: "Sedán Premium", titulo: "BMW Serie 3 330i", precio: "$48.000.000", descripcion: "Sedán deportivo luxury" },
  { id: 3, imagen: "img/civic.jpg", categoria: "Sedán", titulo: "Honda Civic Sport", precio: "$22.000.000", descripcion: "Eficiencia y diseño" },
  { id: 9, imagen: "img/audiq5.jpg", categoria: "SUV Premium", titulo: "Audi Q5 Sportback", precio: "$52.000.000", descripcion: "SUV tracción quattro" },
  { id: 6, imagen: "img/cx5.jpg", categoria: "SUV", titulo: "Mazda CX-5 Signature", precio: "$26.000.000", descripcion: "SUV elegante y confortable" },
  { id: 4, imagen: "img/jeep.jpg", categoria: "Todoterreno", titulo: "Jeep Wrangler Rubicon", precio: "$55.000.000", descripcion: "Tracción 4x4 todoterreno" },
  { id: 8, imagen: "img/raptor.jpg", categoria: "Camioneta", titulo: "Ford F-150 Raptor", precio: "$65.000.000", descripcion: "Pick-up de alta potencia" },
  { id: 2, imagen: "img/rav4.jpg", categoria: "SUV", titulo: "Toyota RAV4 Híbrida", precio: "$28.500.000", descripcion: "SUV híbrido eficiente" }
];

const Home = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  const cargarProductos = () => {
    const prods = JSON.parse(localStorage.getItem('productos'));
    if (prods && prods.length >= 10) {
      setProductos(prods);
    } else {
      setProductos(productosIniciales);
      localStorage.setItem('productos', JSON.stringify(productosIniciales));
    }
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