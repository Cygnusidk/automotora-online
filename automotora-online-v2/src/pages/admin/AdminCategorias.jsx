import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const categoriasIniciales = ['Deportivo', 'Deportivo Premium', 'Sedán', 'Sedán Premium', 'SUV', 'SUV Premium', 'Camioneta'];

const AdminCategorias = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editandoIdx, setEditandoIdx] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    window.dispatchEvent(new Event('userSessionChanged'));
    navigate('/login');
  };

  useEffect(() => {
    const catsGuardadas = JSON.parse(localStorage.getItem('categoriasList'));
    if (catsGuardadas && catsGuardadas.length > 0) {
      setCategorias(catsGuardadas);
    } else {
      setCategorias(categoriasIniciales);
      localStorage.setItem('categoriasList', JSON.stringify(categoriasIniciales));
    }
  }, []);

  const guardarEnStorage = (nuevas) => {
    setCategorias(nuevas);
    localStorage.setItem('categoriasList', JSON.stringify(nuevas));
    window.dispatchEvent(new Event('categoriasUpdated'));
  };

  const limpiarFormulario = () => {
    setNombre('');
    setEditandoIdx(null);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError('El nombre de la categoría es obligatorio.');
      return;
    }

    if (editandoIdx !== null) {
      const actualizadas = [...categorias];
      actualizadas[editandoIdx] = nombre.trim();
      guardarEnStorage(actualizadas);
      setMensaje('¡Categoría actualizada correctamente!');
    } else {
      if (categorias.some(c => c.toLowerCase() === nombre.trim().toLowerCase())) {
        setError('Esta categoría ya existe.');
        return;
      }
      guardarEnStorage([...categorias, nombre.trim()]);
      setMensaje('¡Categoría creada exitosamente!');
    }

    limpiarFormulario();
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleEditar = (index) => {
    setEditandoIdx(index);
    setNombre(categorias[index]);
    setError('');
  };

  const handleEliminar = (index) => {
    if (window.confirm(`¿Seguro que deseas eliminar la categoría "${categorias[index]}"?`)) {
      const filtradas = categorias.filter((_, i) => i !== index);
      guardarEnStorage(filtradas);
      setMensaje('Categoría eliminada.');
      if (editandoIdx === index) {
        limpiarFormulario();
      }
      setTimeout(() => setMensaje(''), 3000);
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
      {/* Sidebar Lateral */}
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

      {/* Área Principal */}
      <main className="flex-grow-1 p-4 overflow-auto">
        <h2 className="fw-bold mb-3">Gestión de Categorías</h2>

        {mensaje && <div className="alert alert-success fw-bold py-2">{mensaje}</div>}

        <div className="row g-4">
          {/* Columna Izquierda: Formulario */}
          <div className="col-12 col-xl-5">
            <div className="card p-3 shadow-sm border-0">
              <h5 className="fw-bold mb-3">
                {editandoIdx !== null ? '✏️ Editar Categoría' : '🏷️ Nueva Categoría'}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold mb-1">Nombre de Categoría</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-sm ${error ? 'is-invalid' : ''}`}
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Ej: Camioneta"
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary btn-sm fw-bold w-100">
                    {editandoIdx !== null ? 'Guardar Cambios' : 'Agregar Categoría'}
                  </button>
                  {editandoIdx !== null && (
                    <button type="button" onClick={limpiarFormulario} className="btn btn-secondary btn-sm">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Columna Derecha: Tabla */}
          <div className="col-12 col-xl-7">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white py-2">
                <h6 className="fw-bold m-0">🏷️ Categorías Registradas ({categorias.length})</h6>
              </div>
              <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th style={{ width: '60px' }}>#</th>
                      <th>Nombre de Categoría</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorias.map((cat, idx) => (
                      <tr key={idx}>
                        <td className="small text-muted">{idx + 1}</td>
                        <td className="fw-bold">{cat}</td>
                        <td className="text-end">
                          <div className="d-flex gap-1 justify-content-end">
                            <button onClick={() => handleEditar(idx)} className="btn btn-sm btn-warning fw-bold py-0 px-2">
                              Editar
                            </button>
                            <button onClick={() => handleEliminar(idx)} className="btn btn-sm btn-danger py-0 px-2">
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

export default AdminCategorias;