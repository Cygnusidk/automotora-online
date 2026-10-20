import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { obtenerProductos } from '../data/datos';

const UserHome = () => {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const cargarProductos = () => {
    setProductos(obtenerProductos());
  };

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem('usuarioActivo') || 'null');
    setUsuario(sesion);
    
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

  return (
    <main className="container my-5">
      {/* Banner de Usuario */}
      <section className="p-5 text-center text-white rounded mb-5 shadow-sm" style={{ backgroundColor: '#1d2530' }}>
        <h1 className="fw-bold">¡Bienvenido{usuario ? `, ${usuario.nombre || usuario.correo}` : ''}!</h1>
        <p>Explora nuestro catálogo exclusivo y reserva tu vehículo hoy mismo.</p>
      </section>

      {/* Categorías */}
      <section className="mb-5">
        <h3 className="fw-bold border-bottom border-danger pb-2 d-inline-block mb-4">Categorías</h3>
        <div className="row g-3 text-center">
          {["Sedán", "SUV", "Deportivo", "Camioneta"].map((cat, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div className="p-3 bg-light border rounded shadow-sm fw-bold">{cat}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ofertas (Opcional en UserHome, pero lo agregamos para mantener consistencia) */}
      <section className="mb-5">
        <h3 className="fw-bold border-bottom border-danger pb-2 d-inline-block mb-4">🔥 Ofertas Destacadas</h3>
        <div className="row g-4">
          {ofertasDestacadas.map((auto) => (
            <div className="col-12 col-md-6 col-lg-4" key={`user-oferta-${auto.id}`}>
              <ProductCard
                id={auto.id}
                imagen={auto.imagen}
                categoria={auto.categoria}
                titulo={auto.titulo}
                precio={auto.precio}
                precioAnterior={auto.precioAnterior}
                esOferta={true}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Catálogo Completo */}
      <section>
        <h3 className="fw-bold border-bottom border-danger pb-2 d-inline-block mb-4">Catálogo Completo</h3>
        <div className="row g-4" id="contenedor-productos">
          {productos.map((auto) => (
            <div className="col-12 col-md-6 col-lg-4" key={auto.id}>
              <ProductCard
                id={auto.id}
                imagen={auto.imagen}
                categoria={auto.categoria}
                titulo={auto.titulo}
                precio={auto.precio}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default UserHome;