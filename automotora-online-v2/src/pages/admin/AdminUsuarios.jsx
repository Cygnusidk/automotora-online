import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const usuariosIniciales = [
  { id: 1, run: '19011022K', nombre: 'Juan Pérez', correo: 'juan@duoc.cl', pass: '123456', rol: 'Cliente' },
  { id: 2, run: '154443321', nombre: 'Administrador Principal', correo: 'admin@duoc.cl', pass: 'admin123', rol: 'Administrador' }
];

const AdminUsuarios = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [run, setRun] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');
  const [tipo, setTipo] = useState('');

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    window.dispatchEvent(new Event('userSessionChanged'));
    navigate('/login');
  };

  useEffect(() => {
    const usrGuardados = JSON.parse(localStorage.getItem('usuarios'));
    if (usrGuardados && usrGuardados.length > 0) {
      setUsuarios(usrGuardados);
    } else {
      setUsuarios(usuariosIniciales);
      localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
    }
  }, []);

  const guardarEnStorage = (nuevos) => {
    setUsuarios(nuevos);
    localStorage.setItem('usuarios', JSON.stringify(nuevos));
  };

  const limpiarFormulario = () => {
    setRun('');
    setNombre('');
    setCorreo('');
    setPass('');
    setTipo('');
    setEditandoId(null);
    setErrores({});
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!run.trim()) nuevosErrores.run = 'El RUN es obligatorio.';
    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!correo.trim()) nuevosErrores.correo = 'El correo es obligatorio.';
    if (!tipo) nuevosErrores.tipo = 'Seleccione un tipo de usuario.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    if (editandoId !== null) {
      const actualizados = usuarios.map((u) =>
        u.id === editandoId
          ? { ...u, run, nombre, correo, pass: pass || u.pass, rol: tipo }
          : u
      );
      guardarEnStorage(actualizados);
      setMensaje('¡Usuario actualizado correctamente!');
    } else {
      const nuevo = {
        id: Date.now(),
        run,
        nombre,
        correo,
        pass: pass || '123456',
        rol: tipo
      };
      guardarEnStorage([...usuarios, nuevo]);
      setMensaje('¡Usuario registrado correctamente!');
    }

    limpiarFormulario();
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleEditarClick = (u) => {
    setEditandoId(u.id);
    setRun(u.run);
    setNombre(u.nombre);
    setCorreo(u.correo);
    setPass(u.pass);
    setTipo(u.rol);
    setErrores({});
  };

  const handleEliminarClick = (u) => {
    if (window.confirm(`¿Seguro que deseas eliminar al usuario ${u.nombre}?`)) {
      const filtrados = usuarios.filter((item) => item.id !== u.id);
      guardarEnStorage(filtrados);

      const activo = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');
      if (activo.correo === u.correo) {
        localStorage.removeItem('usuarioActivo');
        window.dispatchEvent(new Event('userSessionChanged'));
      }
    }
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
      <aside className="bg-dark text-white p-3 d-flex flex-column justify-content-between" style={{ width: '250px', minHeight: '100vh', flexShrink: 0 }}>
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
        <h2 className="fw-bold mb-3">Gestión de Usuarios</h2>

        {mensaje && <div className="alert alert-success fw-bold py-2">{mensaje}</div>}

        <div className="row g-4">
          {/* Columna Izquierda: Formulario */}
          <div className="col-12 col-xl-5">
            <div className="card p-3 shadow-sm border-0">
              <h5 className="fw-bold mb-3">
                {editandoId !== null ? '✏️ Editar Usuario' : '👤 Registrar Usuario'}
              </h5>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-2">
                  <label className="form-label small fw-bold mb-1">RUN</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-sm ${errores.run ? 'is-invalid' : ''}`}
                    value={run} 
                    onChange={(e) => setRun(e.target.value)} 
                    placeholder="19011022K"
                  />
                  {errores.run && <div className="invalid-feedback">{errores.run}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-sm ${errores.nombre ? 'is-invalid' : ''}`}
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold mb-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className={`form-control form-control-sm ${errores.correo ? 'is-invalid' : ''}`}
                    value={correo} 
                    onChange={(e) => setCorreo(e.target.value)} 
                  />
                  {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold mb-1">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control form-control-sm"
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)} 
                    placeholder="********" 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold mb-1">Tipo / Rol de Usuario</label>
                  <select 
                    className={`form-select form-select-sm ${errores.tipo ? 'is-invalid' : ''}`}
                    value={tipo} 
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="">-- Seleccionar --</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Cliente">Cliente</option>
                  </select>
                  {errores.tipo && <div className="invalid-feedback">{errores.tipo}</div>}
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary btn-sm fw-bold w-100">
                    {editandoId !== null ? 'Guardar Cambios' : 'Guardar Usuario'}
                  </button>
                  {editandoId !== null && (
                    <button type="button" onClick={limpiarFormulario} className="btn btn-secondary btn-sm">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Columna Derecha: Tabla de Usuarios */}
          <div className="col-12 col-xl-7">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white py-2">
                <h6 className="fw-bold m-0">👥 Usuarios Registrados ({usuarios.length})</h6>
              </div>
              <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th>RUN</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th className="text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.id || u.run}>
                        <td className="small">{u.run}</td>
                        <td className="fw-bold">{u.nombre}</td>
                        <td className="small text-muted">{u.correo}</td>
                        <td>
                          <span className={`badge ${u.rol === 'Administrador' ? 'bg-danger' : 'bg-secondary'}`}>
                            {u.rol || 'Cliente'}
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="d-flex gap-1 justify-content-end">
                            <button onClick={() => handleEditarClick(u)} className="btn btn-sm btn-warning fw-bold py-0 px-2">
                              Editar
                            </button>
                            <button onClick={() => handleEliminarClick(u)} className="btn btn-sm btn-danger py-0 px-2">
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUsuarios;