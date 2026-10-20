import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errores, setErrores] = useState({});
  const [errorAutenticacion, setErrorAutenticacion] = useState('');

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nuevosErrores.email = 'Ingresa un formato de correo válido (ej: usuario@duoc.cl).';
    }

    if (!password) {
      nuevosErrores.password = 'La contraseña es obligatoria.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorAutenticacion('');

    if (validarFormulario()) {
      if (email === 'admin@duoc.cl' && password === 'admin123') {
        const usuarioAdmin = { nombre: 'Administrador', correo: email, rol: 'Admin' };
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioAdmin));
        window.dispatchEvent(new Event('userSessionChanged'));
        navigate('/admin');
        return;
      }

      const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioEncontrado = usuariosRegistrados.find(
        (u) => u.correo === email && u.pass === password
      );

      if (usuarioEncontrado) {
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
        window.dispatchEvent(new Event('userSessionChanged'));
        navigate('/usuario-home');
      } else {
        setErrorAutenticacion('Credenciales incorrectas. Verifique correo y contraseña.');
      }
    }
  };

  return (
    <main className="contenedor">
      <div className="caja-formulario">
        <h2>Iniciar Sesión</h2>
        <p>Ingresa tus credenciales para acceder a la plataforma.</p>

        {errorAutenticacion && (
          <div 
            style={{ 
              padding: '10px', 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              borderRadius: '4px', 
              marginBottom: '15px', 
              fontWeight: 'bold' 
            }}
          >
            {errorAutenticacion}
          </div>
        )}

        <form id="form-login" onSubmit={handleSubmit} noValidate>
          <div className="campo">
            <label htmlFor="login-email">Correo Electrónico</label>
            <input 
              type="email" 
              id="login-email" 
              placeholder="ejemplo@duoc.cl" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: errores.email ? 'red' : '' }}
            />
            {errores.email && (
              <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>
                {errores.email}
              </small>
            )}
          </div>

          <div className="campo">
            <label htmlFor="login-pass">Contraseña</label>
            <input 
              type="password" 
              id="login-pass" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: errores.password ? 'red' : '' }}
            />
            {errores.password && (
              <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>
                {errores.password}
              </small>
            )}
          </div>

          <button type="submit" className="btn-primario" style={{ marginTop: '15px' }}>
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;