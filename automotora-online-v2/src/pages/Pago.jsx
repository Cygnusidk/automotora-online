import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Pago = () => {
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const navigate = useNavigate();

  const cargarCarrito = () => {
    try {
      const items = JSON.parse(localStorage.getItem('carrito') || '[]');
      setCarrito(Array.isArray(items) ? items : []);
    } catch (e) {
      setCarrito([]);
    }
  };

  useEffect(() => {
    cargarCarrito();
    window.addEventListener('cartUpdated', cargarCarrito);
    return () => window.removeEventListener('cartUpdated', cargarCarrito);
  }, []);

  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('cartUpdated'));
  };

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

  const eliminarProducto = (index) => {
    const nuevo = carrito.filter((_, i) => i !== index);
    guardarCarrito(nuevo);
  };

  const parsePrecio = (precio) => {
    if (typeof precio === 'number') return precio;
    if (!precio) return 0;
    const limpio = parseInt(precio.toString().replace(/\D/g, ''), 10);
    return isNaN(limpio) ? 0 : limpio;
  };

  const formatPrecio = (valor) => {
    return '$' + valor.toLocaleString('es-CL');
  };

  const total = carrito.reduce((sum, item) => {
    return sum + parsePrecio(item.precio) * (item.cantidad || 1);
  }, 0);

  const handleProcesarPago = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    navigate('/pago-exitoso');
  };

  const handleSimularFallo = () => {
    navigate('/pago-fallido');
  };

  return (
    <div className="container py-5 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Proceso de Pago</h2>
        <Link to="/carrito" className="btn btn-outline-secondary btn-sm fw-bold">
          ← Volver al Carrito
        </Link>
      </div>

      <div className="row g-4">
        {/* Resumen del Pedido */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0 p-4 mb-4 bg-white">
            <h4 className="fw-bold border-bottom pb-2 text-danger">Resumen del Pedido</h4>
            
            {carrito.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted mb-3">No hay productos seleccionados en el carrito.</p>
                <Link to="/carrito" className="btn btn-sm btn-danger fw-bold">
                  Ir al Carrito
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr className="text-muted small">
                      <th>PRODUCTO</th>
                      <th>PRECIO</th>
                      <th className="text-center">CANTIDAD</th>
                      <th>SUBTOTAL</th>
                      <th className="text-end">ACCIÓN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item, idx) => {
                      const precioNum = parsePrecio(item.precio);
                      const cant = item.cantidad || 1;
                      const subtotal = precioNum * cant;
                      return (
                        <tr key={idx}>
                          <td className="fw-semibold">{item.titulo || item.nombre || 'Vehículo'}</td>
                          <td>{formatPrecio(precioNum)}</td>
                          <td className="text-center">
                            <div className="d-inline-flex align-items-center border rounded bg-light">
                              <button
                                type="button"
                                onClick={() => cambiarCantidad(idx, -1)}
                                className="btn btn-sm btn-light border-0 fw-bold px-2 text-danger"
                              >
                                -
                              </button>
                              <span className="px-2 fw-bold small">{cant}</span>
                              <button
                                type="button"
                                onClick={() => cambiarCantidad(idx, 1)}
                                className="btn btn-sm btn-light border-0 fw-bold px-2 text-success"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold">{formatPrecio(subtotal)}</td>
                          <td className="text-end">
                            <button
                              type="button"
                              onClick={() => eliminarProducto(idx)}
                              className="btn btn-sm btn-outline-danger py-0 px-2"
                              title="Eliminar producto"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="text-end mt-4 pt-3 border-top">
              <h3 className="fw-bold fs-3 m-0">
                Total a pagar: <span className="text-danger">{formatPrecio(total)}</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Formulario de Pago */}
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0 p-4 bg-white">
            <h4 className="fw-bold mb-3">Detalles de Facturación</h4>
            <form onSubmit={handleProcesarPago}>
              <div className="mb-3">
                <label className="form-label small fw-bold mb-1">Nombre Completo</label>
                <input type="text" className="form-control form-control-sm" placeholder="Juan Pérez" required />
              </div>
              
              <div className="mb-3">
                <label className="form-label small fw-bold mb-1">Correo Electrónico</label>
                <input type="email" className="form-control form-control-sm" placeholder="juan@duoc.cl" required />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold mb-1">Método de Pago</label>
                <select 
                  className="form-select form-select-sm" 
                  value={metodoPago} 
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <option value="tarjeta">💳 Tarjeta de Crédito / Débito</option>
                  <option value="transferencia">🏦 Transferencia Bancaria</option>
                </select>
              </div>

              {metodoPago === 'tarjeta' && (
                <>
                  <div className="mb-3">
                    <label className="form-label small fw-bold mb-1">Número de Tarjeta</label>
                    <input type="text" className="form-control form-control-sm" placeholder="**** **** **** ****" required />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-bold mb-1">Vencimiento</label>
                      <input type="text" className="form-control form-control-sm" placeholder="MM/YY" required />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-bold mb-1">CVV</label>
                      <input type="password" className="form-control form-control-sm" placeholder="123" maxLength="4" required />
                    </div>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="btn btn-danger w-100 fw-bold py-2 fs-6 mb-2"
                disabled={carrito.length === 0}
              >
                Pagar Ahora {formatPrecio(total)}
              </button>

              <button 
                type="button" 
                onClick={handleSimularFallo} 
                className="btn btn-outline-secondary w-100 btn-sm"
              >
                Simular Pago Fallido ❌
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;