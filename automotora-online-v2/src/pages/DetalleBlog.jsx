import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { articulosBlog } from './Blogs';

const DetalleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const articulo = articulosBlog.find((a) => a.id === parseInt(id));

  if (!articulo) {
    return (
      <main className="contenedor" style={{ padding: '50px 0', textAlign: 'center' }}>
        <h2>Artículo no encontrado</h2>
        <p>El artículo solicitado no existe o fue removido.</p>
        <Link to="/blogs" className="btn-primario" style={{ display: 'inline-block', marginTop: '15px' }}>
          Volver a Blogs
        </Link>
      </main>
    );
  }

  return (
    <main className="contenedor" style={{ padding: '40px 0' }}>
      <button 
        onClick={() => navigate('/blogs')} 
        style={{ 
          backgroundColor: '#6c757d', 
          color: '#fff', 
          border: 'none', 
          padding: '8px 16px', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          marginBottom: '20px' 
        }}
      >
        ← Volver a Blogs
      </button>

      <article className="caja-formulario" style={{ maxWidth: '850px', margin: '0 auto', padding: '35px' }}>
        <span style={{ color: '#e63946', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase' }}>
          {articulo.categoria}
        </span>
        
        <h1 style={{ fontSize: '2.2rem', margin: '10px 0 15px', color: '#1d2530' }}>
          {articulo.titulo}
        </h1>

        <div style={{ color: '#777', fontSize: '0.9rem', marginBottom: '25px', display: 'flex', gap: '15px' }}>
          <span>Por: <strong>{articulo.autor}</strong></span>
          <span>•</span>
          <span>{articulo.fecha}</span>
        </div>

        <img 
          src={`/${articulo.imagen}`} 
          alt={articulo.titulo} 
          style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '8px', marginBottom: '25px' }} 
        />

        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '1.15rem', color: '#555' }}>
            {articulo.extracto}
          </p>
          <p>{articulo.contenido}</p>
        </div>
      </article>
    </main>
  );
};

export default DetalleBlog;