import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  // Cargar el carrito desde localStorage
  const cargarCarrito = () => {
    try {
      const items = JSON.parse(localStorage.getItem('carrito') || '[]');
      if (Array.isArray(items)) {
        setCarrito(items);
      } else {
        setCarrito([]);
      }
    } catch (e) {
      setCarrito([]);
    }
  };

  useEffect(() => {
    cargarCarrito();
    window.addEventListener('cartUpdated', cargarCarrito);
    return () => window.removeEventListener('cartUpdated', cargarCarrito);
  }, []);

  // Función para guardar en localStorage y actualizar el contador global
  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Cambiar cantidad (+1 / -1) utilizando el índice de la fila
  const cambiarCantidad = (index, cambio) => {
    const nuevo = [...carrito];
    if (nuevo[index]) {
      const cantActual = nuevo[index].cantidad || 1;
      const nuevaCant = cantActual + cambio;
      if (nuevaCant > 0) {
        nuevo[index].cantidad = nuevaCant;
        guardarCarrito(nuevo);
      }
    }
  };

  // Eliminar un producto específico por su índice
  const eliminarProducto = (index) => {
    const nuevo = carrito.filter((_, i) => i !== index);
    guardarCarrito(nuevo);
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    if (window.confirm('¿Seguro que deseas vaciar el carrito?')) {
      guardarCarrito([]);
    }
  };

  // Convertir precios tipo "$45.000.000" o numéricos a entero
  const parsePrecio = (precio) => {
    if (typeof precio === 'number') return precio;
    if (!precio) return 0;
    const num = parseInt(precio.toString().replace(/\D/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const formatPrecio = (val) => {
    return '$' + val.toLocaleString('es-CL');
  };

  const total = carrito.reduce((sum, item) => {
    return sum + parsePrecio(item.precio) * (item.cantidad || 1);
  }, 0);

  return (
    <div className="container py-5 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">🛒 Tu Carrito de Compras</h2>
        {carrito.length > 0 && (
          <button 
            type="button" 
            onClick={vaciarCarrito} 
            className="btn btn-outline-danger btn-sm fw-bold"
          >
            🗑️ Vaciar Carrito
          </button>
        )}
      </div>

      {carrito.length === 0 ? (
        <div className="card text-center p-5 shadow-sm border-0">
          <h4 className="text-muted mb-3">El carrito está vacío</h4>
          <p className="text-secondary mb-4">Explora nuestro catálogo para agregar vehículos a tu pedido.</p>
          <div>
            <Link to="/categorias" className="btn btn-danger fw-bold px-4">
              Ver Categorías
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Tabla de Productos */}
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Vehículo</th>
                      <th>Precio Unitario</th>
                      <th className="text-center">Cantidad</th>
                      <th>Subtotal</th>
                      <th className="text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item, index) => {
                      const precioNum = parsePrecio(item.precio);
                      const cantidad = item.cantidad || 1;
                      const subtotal = precioNum * cantidad;

                      return (
                        <tr key={index}>
                          <td>
                            <div className="fw-bold">{item.titulo || item.nombre || 'Vehículo'}</div>
                            {item.categoria && (
                              <span className="badge bg-secondary">{item.categoria}</span>
                            )}
                          </td>
                          <td className="fw-semibold">{formatPrecio(precioNum)}</td>
                          <td className="text-center">
                            <div className="d-inline-flex align-items-center border rounded bg-light">
                              <button
                                type="button"
                                onClick={() => cambiarCantidad(index, -1)}
                                className="btn btn-sm btn-light border-0 fw-bold px-3 text-danger fs-5"
                              >
                                -
                              </button>
                              <span className="px-3 fw-bold">{cantidad}</span>
                              <button
                                type="button"
                                onClick={() => cambiarCantidad(index, 1)}
                                className="btn btn-sm btn-light border-0 fw-bold px-3 text-success fs-5"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold text-success">{formatPrecio(subtotal)}</td>
                          <td className="text-end">
                            <button
                              type="button"
                              onClick={() => eliminarProducto(index)}
                              className="btn btn-sm btn-outline-danger fw-bold"
                              title="Eliminar del carrito"
                            >
                              🗑️ Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0 p-4 bg-white">
              <h4 className="fw-bold mb-3">Resumen del Pedido</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Cantidad de Items:</span>
                <span className="fw-bold">
                  {carrito.reduce((acc, i) => acc + (i.cantidad || 1), 0)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3 fs-5">
                <span className="fw-bold">Total:</span>
                <span className="fw-bold text-danger">{formatPrecio(total)}</span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/pago')}
                className="btn btn-danger w-100 fw-bold py-2 fs-6"
              >
                Continuar al Pago 💳
              </button>
              <Link to="/" className="btn btn-outline-secondary w-100 fw-bold py-2 mt-2">
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;