import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const calcularCantidadTotal = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const total = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    setTotalItems(total);
  };

  const cargarUsuario = () => {
    const usr = JSON.parse(localStorage.getItem('usuarioActivo'));
    setUsuario(usr);
  };

  useEffect(() => {
    calcularCantidadTotal();
    cargarUsuario();

    window.addEventListener('cartUpdated', calcularCantidadTotal);
    window.addEventListener('userSessionChanged', cargarUsuario);
    window.addEventListener('storage', calcularCantidadTotal);

    return () => {
      window.removeEventListener('cartUpdated', calcularCantidadTotal);
      window.removeEventListener('userSessionChanged', cargarUsuario);
      window.removeEventListener('storage', calcularCantidadTotal);
    };
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    setUsuario(null);
    setMenuAbierto(false);
    window.dispatchEvent(new Event('userSessionChanged'));
    navigate('/login');
  };

  // Detecta si la sesión activa corresponde a un administrador
  const esAdmin = usuario && (
    !usuario.rol || 
    usuario.rol.toLowerCase() === 'administrador' || 
    usuario.rol.toLowerCase() === 'admin' || 
    usuario.nombre?.toLowerCase().includes('admin')
  );

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-danger fs-4" to="/">
          AutoMotors
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarAutoMotors"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarAutoMotors">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ofertas">Ofertas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            {!usuario && (
              <li className="nav-item">
                <Link className="nav-link" to="/registro">Registrarse</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {usuario ? (
              <div className="position-relative">
                <button 
                  className="btn btn-danger text-white dropdown-toggle fw-bold d-flex align-items-center gap-1"
                  type="button" 
                  onClick={() => setMenuAbierto(!menuAbierto)}
                >
                  👤 {usuario.nombre || 'Administrador'}
                </button>

                {menuAbierto && (
                  <div 
                    className="dropdown-menu dropdown-menu-end show position-absolute shadow"
                    style={{ right: 0, top: '100%', marginTop: '5px', zIndex: 1050, minWidth: '200px' }}
                  >
                    {esAdmin && (
                      <>
                        <Link 
                          className="dropdown-item fw-semibold py-2" 
                          to="/admin"
                          onClick={() => setMenuAbierto(false)}
                        >
                          🛠️ Panel de Administración
                        </Link>
                        <hr className="dropdown-divider my-1" />
                      </>
                    )}
                    <button 
                      className="dropdown-item text-danger fw-semibold py-2" 
                      onClick={handleCerrarSesion}
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link className="btn btn-danger btn-sm px-3 fw-bold" to="/login">
                Iniciar Sesión
              </Link>
            )}

            <Link className="btn btn-secondary btn-sm position-relative ms-2" to="/pago">
              🛒 Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;