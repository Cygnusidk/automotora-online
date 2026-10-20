import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminPerfil = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    window.dispatchEvent(new Event('userSessionChanged'));
    navigate('/login');
  };

  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem('usuarioActivo')) || {
      nombre: 'Administrador Principal',
      correo: 'admin@duoc.cl',
      pass: 'admin123'
    };
    setNombre(usr.nombre);
    setCorreo(usr.correo);
    setPass(usr.pass || '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const actualizado = { nombre, correo, pass, rol: 'Administrador' };
    localStorage.setItem('usuarioActivo', JSON.stringify(actualizado));
    window.dispatchEvent(new Event('userSessionChanged'));
    setMensaje('¡Perfil actualizado con éxito!');
    setTimeout(() => setMensaje(''), 3000);
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
        <h2 className="fw-bold mb-4">Perfil del Administrador</h2>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        <div className="card p-4 shadow-sm" style={{ maxWidth: '600px' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control"
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control"
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-control"
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                placeholder="********" 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary fw-bold">
              Guardar Cambios del Perfil
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminPerfil;