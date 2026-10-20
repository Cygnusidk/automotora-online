import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const categoriasPorDefecto = ['Todas', 'Deportivo', 'Deportivo Premium', 'Sedán', 'Sedán Premium', 'SUV', 'SUV Premium', 'Camioneta'];

const Categorias = () => {
  const location = useLocation();
  const [productos, setProductos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState(categoriasPorDefecto);
  const [categoriaActiva, setCategoriaActiva] = useState(location.state?.categoria || 'Todas');

  const cargarCategorias = () => {
    const catsGuardadas = JSON.parse(localStorage.getItem('categoriasList'));
    if (catsGuardadas && catsGuardadas.length > 0) {
      setListaCategorias(['Todas', ...catsGuardadas]);
    } else {
      setListaCategorias(categoriasPorDefecto);
    }
  };

  useEffect(() => {
    const prods = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(prods);
    cargarCategorias();

    window.addEventListener('categoriasUpdated', cargarCategorias);
    return () => window.removeEventListener('categoriasUpdated', cargarCategorias);
  }, []);

  const productosFiltrados = categoriaActiva === 'Todas' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

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
        <h1 className="section-title">Categorías de Vehículos</h1>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px', justifyContent: 'center' }}>
        {listaCategorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            style={{
              padding: '10px 20px',
              backgroundColor: categoriaActiva === cat ? '#dc3545' : '#343a40',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((auto) => (
            <ProductCard
              key={auto.id}
              id={auto.id}
              imagen={auto.imagen}
              categoria={auto.categoria}
              titulo={auto.titulo}
              precio={auto.precio}
              onAddToCart={() => handleAddToCart(auto)}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
            No hay vehículos registrados en esta categoría.
          </p>
        )}
      </div>
    </main>
  );
};

export default Categorias;