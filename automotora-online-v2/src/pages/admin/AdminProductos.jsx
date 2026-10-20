import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const categoriasPorDefecto = ['Deportivo', 'Deportivo Premium', 'Sedán', 'Sedán Premium', 'SUV', 'SUV Premium', 'Camioneta'];

const productosIniciales = [
  { id: 1, titulo: 'Ford Mustang GT', categoria: 'Deportivo', precio: '$45.000.000', descripcion: 'Motor V8 5.0L de alto rendimiento y diseño icónico.' },
  { id: 2, titulo: 'Honda Civic Sport', categoria: 'Sedán', precio: '$22.000.000', descripcion: 'Sedán eficiente, cómodo y con gran equipamiento tecnológico.' },
  { id: 3, titulo: 'Audi Q5 Sportback', categoria: 'SUV Premium', precio: '$52.000.000', descripcion: 'SUV de lujo con tracción Quattro y acabados de alta gama.' }
];

const AdminProductos = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState(categoriasPorDefecto);
  const [editandoId, setEditandoId] = useState(null);

  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    window.dispatchEvent(new Event('userSessionChanged'));
    navigate('/login');
  };

  useEffect(() => {
    const prodsGuardados = JSON.parse(localStorage.getItem('productos'));
    if (prodsGuardados && prodsGuardados.length > 0) {
      setProductos(prodsGuardados);
    } else {
      setProductos(productosIniciales);
      localStorage.setItem('productos', JSON.stringify(productosIniciales));
    }

    const catsGuardadas = JSON.parse(localStorage.getItem('categoriasList'));
    if (catsGuardadas && catsGuardadas.length > 0) {
      setListaCategorias(catsGuardadas);
    }
  }, []);

  const guardarEnStorage = (nuevos) => {
    setProductos(nuevos);
    localStorage.setItem('productos', JSON.stringify(nuevos));
  };

  const limpiarFormulario = () => {
    setTitulo('');
    setCategoria('');
    setPrecio('');
    setDescripcion('');
    setEditandoId(null);
    setErrores({});
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!titulo.trim()) nuevosErrores.titulo = 'El título/modelo es obligatorio.';
    if (!categoria) nuevosErrores.categoria = 'Seleccione una categoría.';
    if (!precio.trim()) nuevosErrores.precio = 'El precio es obligatorio.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    if (editandoId !== null) {
      const actualizados = productos.map((p) =>
        p.id === editandoId
          ? { ...p, titulo, categoria, precio, descripcion }
          : p
      );
      guardarEnStorage(actualizados);
      setMensaje('¡Producto actualizado correctamente!');
    } else {
      const nuevo = {
        id: Date.now(),
        titulo,
        categoria,
        precio,
        descripcion
      };
      guardarEnStorage([...productos, nuevo]);
      setMensaje('¡Producto registrado correctamente!');
    }

    limpiarFormulario();
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleEditarClick = (p) => {
    setEditandoId(p.id);
    setTitulo(p.titulo || '');
    setCategoria(p.categoria || '');
    setPrecio(p.precio || '');
    setDescripcion(p.descripcion || '');
    setErrores({});
  };

  const handleEliminarClick = (p) => {
    if (window.confirm(`¿Seguro que deseas eliminar el vehículo ${p.titulo}?`)) {
      const filtrados = productos.filter((item) => item.id !== p.id);
      guardarEnStorage(filtrados);
      setMensaje('Producto eliminado.');
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
        <h2 className="fw-bold mb-3">Gestión de Productos</h2>

        {mensaje && <div className="alert alert-success fw-bold py-2">{mensaje}</div>}

        <div className="row g-4">
          {/* Formulario */}
          <div className="col-12 col-xl-5">
            <div className="card p-3 shadow-sm border-0">
              <h5 className="fw-bold mb-3">
                {editandoId !== null ? '✏️ Editar Producto' : '➕ Agregar Vehículo'}
              </h5>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-2">
                  <label className="form-label small fw-bold mb-1">Modelo / Nombre</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-sm ${errores.titulo ? 'is-invalid' : ''}`}
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    placeholder="Ej: Ford Mustang GT"
                  />
                  {errores.titulo && <div className="invalid-feedback">{errores.titulo}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold mb-1">Categoría</label>
                  <select 
                    className={`form-select form-select-sm ${errores.categoria ? 'is-invalid' : ''}`}
                    value={categoria} 
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="">-- Seleccionar --</option>
                    {listaCategorias.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold mb-1">Precio</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-sm ${errores.precio ? 'is-invalid' : ''}`}
                    value={precio} 
                    onChange={(e) => setPrecio(e.target.value)} 
                    placeholder="Ej: $45.000.000"
                  />
                  {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold mb-1">Descripción</label>
                  <textarea 
                    className="form-control form-control-sm"
                    rows="3"
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary btn-sm fw-bold w-100">
                    {editandoId !== null ? 'Guardar Cambios' : 'Agregar Producto'}
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

          {/* Tabla de Productos */}
          <div className="col-12 col-xl-7">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white py-2">
                <h6 className="fw-bold m-0">🚗 Productos Registrados ({productos.length})</h6>
              </div>
              <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th>Modelo</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th className="text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="fw-bold">{p.titulo}</div>
                          {p.descripcion && (
                            <small className="text-muted d-block text-truncate" style={{ maxWidth: '220px' }}>
                              {p.descripcion}
                            </small>
                          )}
                        </td>
                        <td><span className="badge bg-secondary">{p.categoria}</span></td>
                        <td className="fw-bold text-success small">{p.precio}</td>
                        <td className="text-end">
                          <div className="d-flex gap-1 justify-content-end">
                            <button onClick={() => handleEditarClick(p)} className="btn btn-sm btn-warning fw-bold py-0 px-2">
                              Editar
                            </button>
                            <button onClick={() => handleEliminarClick(p)} className="btn btn-sm btn-danger py-0 px-2">
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

export default AdminProductos;