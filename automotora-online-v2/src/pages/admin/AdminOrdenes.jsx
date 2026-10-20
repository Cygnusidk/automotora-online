import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ordenesIniciales = [
  { id: 'ORD-1001', cliente: 'Juan Pérez', correo: 'juan@duoc.cl', fecha: '18/10/2026', total: '$45.000.000', estado: 'Completada', detalle: 'Ford Mustang GT (x1)' },
  { id: 'ORD-1002', cliente: 'María González', correo: 'maria@duoc.cl', fecha: '19/10/2026', total: '$22.000.000', estado: 'En Proceso', detalle: 'Honda Civic Sport (x1)' },
  { id: 'ORD-1003', cliente: 'Carlos Rojas', correo: 'carlos@duoc.cl', fecha: '20/10/2026', total: '$52.000.000', estado: 'Completada', detalle: 'Audi Q5 Sportback (x1)' }
];

const AdminOrdenes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    window.dispatchEvent(new Event('userSessionChanged'));
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: '📊' },
    { label: 'Órdenes', path: '/admin/ordenes', icon: '🛒' },
    { label: 'Productos', path: '/admin/productos', icon: '📦' },
    { label: 'Categorías', path: '/admin/categorias', icon: '🏷️' },
    { label: 'Usuarios', path: '/admin/usuarios', icon: '👥' },
    { label: 'Perfil', path: '/admin/perfil', icon: '👤' },
  ];

  return (
    <div className="d-flex bg-light min-vh-100">
      <aside className="bg-dark text-white p-3 d-flex flex-column justify-content-between" style={{ width: '250px', minHeight: '100vh' }}>
        <div>
          <h5 className="fw-bold mb-4 px-2 text-danger fs-4">AutoMotors</h5>
          <nav className="nav nav-pills flex-column gap-1">
            {navItems.map((item, idx) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`nav-link text-start ${active ? 'bg-primary text-white fw-semibold' : 'text-white-50'}`}
                >
                  <span className="me-2">{item.icon}</span> {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="d-flex flex-column gap-2 mt-4">
          <Link className="btn btn-dark text-start border-secondary text-white" to="/">
            🏪 Tienda
          </Link>
          <button onClick={handleCerrarSesion} className="btn btn-danger text-start">
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-grow-1 p-4 overflow-auto">
        <h2 className="fw-bold mb-4">Gestión de Órdenes y Boletas</h2>

        <div className="card shadow-sm mb-4">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>N° Orden</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenesIniciales.map((ord) => (
                <tr key={ord.id}>
                  <td><strong>{ord.id}</strong></td>
                  <td>{ord.cliente}<br/><small className="text-muted">{ord.correo}</small></td>
                  <td>{ord.fecha}</td>
                  <td className="fw-bold text-success">{ord.total}</td>
                  <td>
                    <span className={`badge ${ord.estado === 'Completada' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {ord.estado}
                    </span>
                  </td>
                  <td className="text-end">
                    <button 
                      onClick={() => setOrdenSeleccionada(ord)}
                      className="btn btn-sm btn-info text-white fw-bold"
                    >
                      Mostrar Boleta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal / Card de Boleta de la Orden */}
        {ordenSeleccionada && (
          <div className="card border-primary p-4 shadow-sm" style={{ maxWidth: '600px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0">📄 Boleta de Venta - {ordenSeleccionada.id}</h5>
              <button onClick={() => setOrdenSeleccionada(null)} className="btn-close"></button>
            </div>
            <hr/>
            <p><strong>Emisor:</strong> AutoMotors SpA</p>
            <p><strong>Cliente:</strong> {ordenSeleccionada.cliente} ({ordenSeleccionada.correo})</p>
            <p><strong>Fecha de Emisión:</strong> {ordenSeleccionada.fecha}</p>
            <p><strong>Items Comprados:</strong> {ordenSeleccionada.detalle}</p>
            <h4 className="fw-bold text-primary mt-3">Total Pagado: {ordenSeleccionada.total}</h4>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOrdenes;