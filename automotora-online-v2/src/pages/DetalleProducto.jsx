import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const productosIniciales = [
  { id: 1, imagen: "img/mustang.jpg", categoria: "Deportivo", titulo: "Ford Mustang GT", precio: "$45.000.000", descripcion: "V8 5.0L de alto rendimiento con transmisión manual de 6 velocidades y amortiguación deportiva.", motor: "5.0L V8 Coyote", potencia: "450 HP", transmicion: "Manual 6 Vel" },
  { id: 5, imagen: "img/camaro.jpg", categoria: "Deportivo", titulo: "Chevrolet Camaro SS", precio: "$42.000.000", descripcion: "Motor V8 deportivo con tracción trasera y modos de conducción de pista.", motor: "6.2L V8 LT1", potencia: "455 HP", transmicion: "Automática 10 Vel" },
  { id: 10, imagen: "img/porsche.jpg", categoria: "Deportivo Premium", titulo: "Porsche 911 Carrera", precio: "$120.000.000", descripcion: "Deportivo de lujo emblemático con transmisión PDK y tracción integral opcional.", motor: "3.0L Twin-Turbo Boxer 6", potencia: "385 HP", transmicion: "PDK 8 Vel" },
  { id: 7, imagen: "img/bmw3.jpg", categoria: "Sedán Premium", titulo: "BMW Serie 3 330i", precio: "$48.000.000", descripcion: "Sedán deportivo luxury con acabado M-Sport e interiores en cuero de alta calidad.", motor: "2.0L Turbo Inline-4", potencia: "258 HP", transmicion: "Steptronic 8 Vel" },
  { id: 3, imagen: "img/civic.jpg", categoria: "Sedán", titulo: "Honda Civic Sport", precio: "$22.000.000", descripcion: "Eficiencia y diseño aerodinámico con asistente de conducción avanzada Honda Sensing.", motor: "2.0L i-VTEC", potencia: "158 HP", transmicion: "CVT Sport" },
  { id: 9, imagen: "img/audiq5.jpg", categoria: "SUV Premium", titulo: "Audi Q5 Sportback", precio: "$52.000.000", descripcion: "SUV coupé con tracción quattro, suspensión adaptativa y cockpit digital.", motor: "2.0L TFSI MHEV", potencia: "249 HP", transmicion: "S tronic 7 Vel" },
  { id: 6, imagen: "img/cx5.jpg", categoria: "SUV", titulo: "Mazda CX-5 Signature", precio: "$26.000.000", descripcion: "SUV elegante y confortable con tracción i-Activ AWD y sonido Bose de 10 parlantes.", motor: "2.5L Turbo Skyactiv-G", potencia: "228 HP", transmicion: "Automática 6 Vel" },
  { id: 4, imagen: "img/jeep.jpg", categoria: "Todoterreno", titulo: "Jeep Wrangler Rubicon", precio: "$55.000.000", descripcion: "Tracción 4x4 todoterreno extrema con diferenciales bloqueables y techo desmontable.", motor: "3.6L V6 Pentastar", potencia: "285 HP", transmicion: "Automática 8 Vel" },
  { id: 8, imagen: "img/raptor.jpg", categoria: "Camioneta", titulo: "Ford F-150 Raptor", precio: "$65.000.000", descripcion: "Pick-up de alta potencia con amortiguadores FOX Racing y suspensión Off-Road.", motor: "3.5L V6 EcoBoost High-Output", potencia: "450 HP", transmicion: "Automática 10 Vel" },
  { id: 2, imagen: "img/rav4.jpg", categoria: "SUV", titulo: "Toyota RAV4 Híbrida", precio: "$28.500.000", descripcion: "SUV híbrido de baja emisión, tracción e-AWD y un consumo altamente eficiente.", motor: "2.5L Híbrido Dual VVT-i", potencia: "219 HP", transmicion: "e-CVT" }
];

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem('productos')) || productosIniciales;
    const encontrado = lista.find((p) => p.id === parseInt(id));
    
    if (encontrado) {
      setProducto(encontrado);
    } else {
      const inicial = productosIniciales.find((p) => p.id === parseInt(id));
      setProducto(inicial || null);
    }
  }, [id]);

  if (!producto) {
    return (
      <main className="contenedor" style={{ padding: '50px 0', textAlign: 'center' }}>
        <h2>Vehículo no encontrado</h2>
        <p>El vehículo seleccionado no se encuentra disponible en el catálogo.</p>
        <Link to="/" className="btn-primario" style={{ display: 'inline-block', marginTop: '15px' }}>
          Volver al Inicio
        </Link>
      </main>
    );
  }

  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
    const indice = carritoActual.findIndex((item) => item.id === producto.id);

    if (indice !== -1) {
      carritoActual[indice].cantidad += 1;
    } else {
      carritoActual.push({
        id: producto.id,
        imagen: producto.imagen,
        categoria: producto.categoria,
        titulo: producto.titulo,
        precio: producto.precio,
        cantidad: 1
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoActual));
    window.dispatchEvent(new Event('cartUpdated'));

    setAgregado(true);
    setTimeout(() => setAgregado(false), 2500);
  };

  return (
    <main className="contenedor" style={{ padding: '40px 0' }}>
      <button 
        onClick={() => navigate(-1)} 
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
        ← Volver
      </button>

      <div className="caja-formulario" style={{ maxWidth: '900px', margin: '0 auto', padding: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'center' }}>
          
          {/* Imagen principal */}
          <div>
            <img 
              src={`/${producto.imagen}`} 
              alt={producto.titulo} 
              style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
            />
          </div>

          {/* Detalles del Producto */}
          <div>
            <span style={{ color: '#e63946', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.85rem' }}>
              {producto.categoria}
            </span>
            <h1 style={{ fontSize: '2rem', margin: '10px 0' }}>{producto.titulo}</h1>
            <h2 style={{ color: '#28a745', fontSize: '1.8rem', marginBottom: '20px' }}>{producto.precio}</h2>

            <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
              {producto.descripcion || 'Vehículo de alto rendimiento garantizado por AutoMotors.'}
            </p>

            {/* Ficha Técnica */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>Ficha Técnica</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#444' }}>
                <li style={{ marginBottom: '5px' }}><strong>Motor:</strong> {producto.motor || 'V8 Turbo'}</li>
                <li style={{ marginBottom: '5px' }}><strong>Potencia:</strong> {producto.potencia || '350 HP'}</li>
                <li style={{ marginBottom: '5px' }}><strong>Transmisión:</strong> {producto.transmicion || 'Automática'}</li>
                <li><strong>Garantía:</strong> 3 Años o 100.000 km</li>
              </ul>
            </div>

            {agregado && (
              <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '15px', fontWeight: 'bold' }}>
                ✓ ¡Vehículo añadido al carrito!
              </div>
            )}

            <button 
              onClick={agregarAlCarrito} 
              className="btn-primario" 
              style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
            >
              Añadir al Carrito
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default DetalleProducto;