import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const modulos = [
    { title: 'Dashboard', desc: 'Visión general de todas las métricas y estadísticas clave del sistema.', path: '/admin', icon: '⏱️' },
    { title: 'Órdenes', desc: 'Gestión y seguimiento de todas las órdenes de compra realizadas.', path: '/admin/ordenes', icon: '🛒' },
    { title: 'Productos', desc: 'Administrar inventario y detalles de los productos disponibles.', path: '/admin/productos', icon: '📦' },
    { title: 'Categorías', desc: 'Organizar productos en categorías para facilitar su navegación.', path: '/admin/categorias', icon: '🏷️' },
    { title: 'Usuarios', desc: 'Gestión de cuentas de usuario y sus roles dentro del sistema.', path: '/admin/usuarios', icon: '👥' },
    { title: 'Perfil', desc: 'Administración de la información personal y configuraciones de cuenta.', path: '/admin/perfil', icon: '👤' },
    { title: 'Tienda', desc: 'Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.', path: '/', icon: '🏪' },
  ];

  return (
    <div className="d-flex bg-light min-vh-100">
      {/* Sidebar Lateral */}
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

      {/* Área Principal */}
      <main className="flex-grow-1 p-4 overflow-auto">
        <div className="mb-4">
          <h2 className="fw-bold m-0">Dashboard</h2>
          <p className="text-muted small">Resumen de las actividades diarias</p>
        </div>

        {/* TARJETAS KPI */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="card bg-primary text-white shadow-sm border-0 p-3">
              <div className="d-flex align-items-center justify-content-between">
                <span className="fs-1">🛒</span>
                <div className="text-end">
                  <span className="fs-6 opacity-75">Compras</span>
                  <h2 className="fw-bold m-0">1,234</h2>
                </div>
              </div>
              <div className="mt-2 small opacity-75">Probabilidad de aumento: 20%</div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card bg-success text-white shadow-sm border-0 p-3">
              <div className="d-flex align-items-center justify-content-between">
                <span className="fs-1">📦</span>
                <div className="text-end">
                  <span className="fs-6 opacity-75">Productos</span>
                  <h2 className="fw-bold m-0">400</h2>
                </div>
              </div>
              <div className="mt-2 small opacity-75">Inventario actual: 500</div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card bg-warning text-dark shadow-sm border-0 p-3">
              <div className="d-flex align-items-center justify-content-between">
                <span className="fs-1">👥</span>
                <div className="text-end">
                  <span className="fs-6 opacity-75">Usuarios</span>
                  <h2 className="fw-bold m-0">890</h2>
                </div>
              </div>
              <div className="mt-2 small opacity-75">Nuevos usuarios este mes: 120</div>
            </div>
          </div>
        </div>

        {/* MÓDULOS DE ACCESO RÁPIDO */}
        <div className="row g-3">
          {modulos.map((mod, idx) => (
            <div className="col-12 col-sm-6 col-md-3" key={idx}>
              <Link className="text-decoration-none" to={mod.path}>
                <div className="card h-100 shadow-sm border-0 text-center p-3">
                  <div className="fs-2 mb-2">{mod.icon}</div>
                  <h6 className="fw-bold text-dark">{mod.title}</h6>
                  <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>{mod.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminHome;