import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionesYcomunas } from '../utils/datosChile'; // <-- Importamos los datos centralizados

const Registro = () => {
  const navigate = useNavigate();

  const [run, setRun] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState(false);

  const validarRun = (rut) => {
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');
    return rutLimpio.length >= 8 && rutLimpio.length <= 9;
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!run.trim()) nuevosErrores.run = 'El RUN es obligatorio.';
    else if (!validarRun(run)) nuevosErrores.run = 'Ingresa un RUN válido (ej: 19011022K).';

    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre completo es obligatorio.';
    if (!correo.trim()) nuevosErrores.correo = 'El correo es obligatorio.';
    else if (!/\S+@\S+\.\S+/.test(correo)) nuevosErrores.correo = 'Formato de correo inválido.';

    if (!pass) nuevosErrores.pass = 'La contraseña es obligatoria.';
    else if (pass.length < 6) nuevosErrores.pass = 'Mínimo 6 caracteres.';

    if (!region) nuevosErrores.region = 'Selecciona una región.';
    if (!comuna) nuevosErrores.comuna = 'Selecciona una comuna.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setComuna('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const nuevoUsuario = { run, nombre, correo, pass, region, comuna, rol: 'Cliente' };
      
      usuariosRegistrados.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

      setMensajeExito(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <main className="contenedor">
      <div className="caja-formulario">
        <h2>Registro de Usuario</h2>
        <p>Completa tus datos para crear una nueva cuenta.</p>

        {mensajeExito && (
          <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '15px' }}>
            ¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...
          </div>
        )}

        <form id="form-registro" onSubmit={handleSubmit} noValidate>
          <div className="campo">
            <label htmlFor="reg-run">RUN (sin puntos, con dígito verificador)</label>
            <input type="text" id="reg-run" placeholder="19011022K" value={run} onChange={(e) => setRun(e.target.value)} style={{ borderColor: errores.run ? 'red' : '' }} />
            {errores.run && <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>{errores.run}</small>}
          </div>

          <div className="campo">
            <label htmlFor="reg-nombre">Nombre Completo</label>
            <input type="text" id="reg-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ borderColor: errores.nombre ? 'red' : '' }} />
            {errores.nombre && <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>{errores.nombre}</small>}
          </div>

          <div className="campo">
            <label htmlFor="reg-correo">Correo Electrónico</label>
            <input type="email" id="reg-correo" placeholder="ejemplo@duoc.cl" value={correo} onChange={(e) => setCorreo(e.target.value)} style={{ borderColor: errores.correo ? 'red' : '' }} />
            {errores.correo && <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>{errores.correo}</small>}
          </div>

          <div className="campo">
            <label htmlFor="reg-pass">Contraseña</label>
            <input type="password" id="reg-pass" value={pass} onChange={(e) => setPass(e.target.value)} style={{ borderColor: errores.pass ? 'red' : '' }} />
            {errores.pass && <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>{errores.pass}</small>}
          </div>

          <div className="campo">
            <label htmlFor="reg-region">Región</label>
            <select id="reg-region" value={region} onChange={handleRegionChange} style={{ borderColor: errores.region ? 'red' : '' }}>
              <option value="">Selecciona una región</option>
              {/* Cambiamos comunasPorRegion por regionesYcomunas */}
              {Object.keys(regionesYcomunas).map((reg) => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
            {errores.region && <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>{errores.region}</small>}
          </div>

          <div className="campo">
            <label htmlFor="reg-comuna">Comuna</label>
            <select id="reg-comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} disabled={!region} style={{ borderColor: errores.comuna ? 'red' : '' }}>
              <option value="">Selecciona una comuna</option>
              {/* Cambiamos comunasPorRegion por regionesYcomunas */}
              {region && regionesYcomunas[region]?.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errores.comuna && <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>{errores.comuna}</small>}
          </div>

          <button type="submit" className="btn-primario" style={{ marginTop: '15px' }}>
            Crear Cuenta
          </button>
        </form>
      </div>
    </main>
  );
};

export default Registro;