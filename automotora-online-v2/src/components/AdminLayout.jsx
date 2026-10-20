import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    window.dispatchEvent(new Event('userSessionChanged'));
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active bg-primary text-white' : 'text-dark';

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Topbar / Company name */}
      <header className="navbar navbar-dark bg-dark px-3 shadow">
        <span className="navbar-brand mb-0 h1 fs-6">Company name</span>
      </header>

      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          {/* Sidebar Lateral */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse border-end p-3">
            <div className="position-sticky pt-2">
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                  <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>
                    📊 Dashboard
                  </Link>
                </li>
                <li className="nav-item mb-1">
                  <span className="nav-link text-muted" style={{ cursor: 'not-allowed' }}>📦 Órdenes</span>
                </li>
                <li className="nav-item mb-1">
                  <Link to="/admin/productos" className={`nav-link ${isActive('/admin/productos')}`}>
                    🛒 Productos
                  </Link>
                </li>
                <li className="nav-item mb-1">
                  <Link to="/categorias" className="nav-link text-dark">🏷️ Categorías</Link>
                </li>
                <li className="nav-item mb-1">
                  <Link to="/admin/usuarios" className={`nav-link ${isActive('/admin/usuarios')}`}>
                    👥 Usuarios
                  </Link>
                </li>
                <li className="nav-item mb-1">
                  <span className="nav-link text-muted" style={{ cursor: 'not-allowed' }}>📈 Reportes</span>
                </li>
                <li className="nav-item mb-3">
                  <span className="nav-link text-muted" style={{ cursor: 'not-allowed' }}>👤 Perfil</span>
                </li>
              </ul>

              <hr />

              <div className="d-grid gap-2">
                <Link to="/" className="btn btn-dark text-start">
                  🏪 Tienda
                </Link>
                <button onClick={handleCerrarSesion} className="btn btn-danger text-start">
                  🚪 Cerrar Sesión
                </button>
              </div>
            </div>
          </nav>

          {/* Área Principal de Contenido */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;