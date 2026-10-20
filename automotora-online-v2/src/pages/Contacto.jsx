import React, { useState } from 'react';

const Contacto = () => {
  // Estados de los campos
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [comentario, setComentario] = useState('');

  // Estados de validación y respuesta
  const [errores, setErrores] = useState({});
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  // Validación de campos
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre completo es obligatorio.';
    } else if (nombre.trim().length > 100) {
      nuevosErrores.nombre = 'El nombre no puede superar los 100 caracteres.';
    }

    if (!email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nuevosErrores.email = 'Ingresa un correo electrónico válido.';
    }

    if (!comentario.trim()) {
      nuevosErrores.comentario = 'El comentario es obligatorio.';
    } else if (comentario.trim().length > 500) {
      nuevosErrores.comentario = 'El comentario no puede superar los 500 caracteres.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      setMensajeEnviado(true);
      // Limpiar campos tras el envío exitoso
      setNombre('');
      setEmail('');
      setComentario('');
      setErrores({});
    }
  };

  return (
    <main className="contenedor">
      <div className="caja-formulario">
        <h2>Contáctanos</h2>
        <p>Envíanos un mensaje y te responderemos a la brevedad.</p>

        {mensajeEnviado && (
          <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '15px' }}>
            ¡Mensaje enviado con éxito! Te responderemos pronto.
          </div>
        )}

        <form id="form-contacto" onSubmit={handleSubmit} noValidate>
          {/* Campo Nombre */}
          <div className="campo">
            <label htmlFor="nombre">Nombre Completo (Máx 100 caracteres)</label>
            <input 
              type="text" 
              id="nombre" 
              maxLength={100}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ borderColor: errores.nombre ? 'red' : '' }}
            />
            {errores.nombre && (
              <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>
                {errores.nombre}
              </small>
            )}
          </div>

          {/* Campo Email */}
          <div className="campo">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
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

          {/* Campo Comentario */}
          <div className="campo">
            <label htmlFor="comentario">Comentario (Máx 500 caracteres)</label>
            <textarea 
              id="comentario" 
              maxLength={500}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              style={{ borderColor: errores.comentario ? 'red' : '' }}
              rows={4}
            />
            {errores.comentario && (
              <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>
                {errores.comentario}
              </small>
            )}
          </div>

          <button type="submit" className="btn-primario" style={{ marginTop: '15px' }}>
            Enviar Mensaje
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contacto;