import React from 'react';
import { Link } from 'react-router-dom';

export const articulosBlog = [
  {
    id: 1,
    categoria: "MANTENIMIENTO",
    titulo: "5 Consejos para el mantenimiento de un auto deportivo",
    extracto: "Aprende cómo cuidar el motor, frenos y suspensión de vehículos de alto rendimiento para maximizar su vida útil.",
    contenido: "Los vehículos de alto rendimiento exigen una atención minuciosa en sus mantenimientos periódicos. En primer lugar, la elección del aceite de motor sintético de alta viscosidad es crucial para resistir elevadas temperaturas. Además, el sistema de frenos cerámicos o ventilados debe inspeccionarse con mayor frecuencia debido al desgaste por altas velocidades. Mantener la presión de inflado en neumáticos de perfil bajo, revisar periódicamente la suspensión y permitir que el turbo se enfríe antes de apagar el motor son claves para conservar el rendimiento óptimo de tu deportivo.",
    imagen: "img/mustang.jpg",
    fecha: "15 Oct 2026",
    autor: "Equipo AutoMotors"
  },
  {
    id: 2,
    categoria: "GUÍAS DE COMPRA",
    titulo: "Guía de compra: ¿Cómo elegir la SUV ideal para tu familia?",
    extracto: "Comparamos espacio interior, eficiencia de combustible, seguridad y tracción para ayudarte a tomar la mejor decisión.",
    contenido: "Elegir la SUV adecuada requiere equilibrar las necesidades familiares de espacio, seguridad y consumo. Un aspecto primordial es la cantidad de filas de asientos y la capacidad de maletero útil para viajes largos. Por otro lado, contar con sistemas de tracción AWD o 4WD aporta tranquilidad ante climas adversos o caminos irregulares. Revisa también los anclajes ISOFIX para sillas infantiles y la calificación de seguridad en pruebas de impacto antes de concretar tu decisión.",
    imagen: "img/rav4.jpg",
    fecha: "10 Oct 2026",
    autor: "Carlos Mendoza"
  },
  {
    id: 3,
    categoria: "COMPARATIVAS",
    titulo: "Sedán Premium vs SUV: ¿Cuál se adapta mejor a tu estilo de vida?",
    extracto: "Analizamos el desempeño en carretera, la comodidad en viajes largos y los costos de mantención de ambos segmentos.",
    contenido: "La duda entre un sedán de alta gama y un SUV compacto surge a menudo al renovar vehículo. Los sedanes ofrecen una mejor dinámica de conducción, mayor aerodinámica y menor consumo en autopista gracias a su centro de gravedad bajo. Por contraparte, los SUV destacan por una posición de manejo elevada, mejor visibilidad y mayor facilidad para enfrentar baches o resaltos urbanos. Tu elección dependerá de si priorizas el confort deportivo o la versatilidad de espacio.",
    imagen: "img/bmw3.jpg",
    fecha: "05 Oct 2026",
    autor: "Sofía Ibáñez"
  },
  {
    id: 4,
    categoria: "TECNOLOGÍA",
    titulo: "Autos Híbridos y Eléctricos: Todo lo que debes saber antes de dar el paso",
    extracto: "Descubre los beneficios del consumo eficiente, la carga eléctrica y el menor impacto ambiental de la movilidad sustentable.",
    contenido: "La transición hacia vehículos de bajas o nulas emisiones trae consigo importantes ventajas económicas y ambientales. Los modelos híbridos autorecargables combinan la autonomía del motor a combustión con la eficiencia eléctrica en ciudad. Por su parte, los eléctricos puros (BEV) eliminan por completo el costo de combustible tradicional y reducen significativamente el mantenimiento de piezas móviles.",
    imagen: "img/civic.jpg",
    fecha: "28 Sep 2026",
    autor: "Martín Silva"
  },
  {
    id: 5,
    categoria: "TODOTERRENO",
    titulo: "Preparación 4x4: Equipamiento esencial para tus aventuras fuera de ruta",
    extracto: "Conoce los accesorios de tracción, protecciones y neumáticos recomendados para enfrentar terrenos exigentes de forma segura.",
    contenido: "Para internarse en rutas de arena, barro o cordillera es imprescindible contar con la preparación técnica adecuada. Equipar tu todoterreno con neumáticos All-Terrain (A/T) o Mud-Terrain (M/T), planchas de desatasco, compresor de aire portátil y protecciones inferiores de chasis garantizará una travesía segura sin dañar componentes críticos.",
    imagen: "img/jeep.jpg",
    fecha: "20 Sep 2026",
    autor: "Diego Morales"
  },
  {
    id: 6,
    categoria: "SEGURIDAD",
    titulo: "Sistemas ADAS: Cómo la asistencia avanzada a la conducción previene accidentes",
    extracto: "Revisamos el frenado autónomo de emergencia, detector de punto ciego y control de crucero adaptativo de última generación.",
    contenido: "Las asistencias activas al conductor (ADAS) han revolucionado la seguridad vial. Tecnologías como el frenado autónomo ante detección de peatones, la alerta de mantenimiento de carril y el sensor de tráfico cruzado posterior reducen drásticamente la probabilidad de colisiones en entornos urbanos y carreteras.",
    imagen: "img/audiq5.jpg",
    fecha: "12 Sep 2026",
    autor: "Camila Reyes"
  },
  {
    id: 7,
    categoria: "NOVEDADES",
    titulo: "Camionetas Pick-up: Potencia de trabajo y confort de pasajeros en 2026",
    extracto: "Evaluamos la capacidad de carga, remolque y la tecnología interior de las camionetas modernas del mercado actual.",
    contenido: "Las camionetas pick-up actuales combinan la fuerza de trabajo pesado con el refinamiento interior de una SUV de lujo. Con suspensiones traseras de resortes helicoidales y motores turboalimentados de alto par, brindan una capacidad de remolque superior sin sacrificar el confort diario de los ocupantes.",
    imagen: "img/raptor.jpg",
    fecha: "02 Sep 2026",
    autor: "Equipo AutoMotors"
  },
  {
    id: 8,
    categoria: "FINANZAS",
    titulo: "Financiamiento Automotriz: Claves para renovar tu vehículo sin sorpresas",
    extracto: "Te explicamos las diferencias entre crédito convencional, compra inteligente y leasing para particulares.",
    contenido: "Elegir la modalidad de financiamiento idónea es un paso determinante al adquirir un auto nuevo o seminuevo. Analizamos la tasa de interés efectiva (CAE), los plazos de cuotas y los valores residuales garantizados para tomar una decisión informada acorde a tu presupuesto mensual.",
    imagen: "img/cx5.jpg",
    fecha: "25 Ago 2026",
    autor: "Valentina Gómez"
  }
];

const Blogs = () => {
  return (
    <main className="main-content">
      <section className="hero-banner">
        <h1>Blog Automotriz</h1>
        <p>Noticias, consejos de mantenimiento y novedades del mundo del motor.</p>
      </section>

      <div className="section-header">
        <h2 className="section-title">Artículos Destacados</h2>
      </div>

      <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {articulosBlog.map((art) => (
          <div className="product-card" key={art.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="card-image">
                <img src={art.imagen} alt={art.titulo} style={{ height: '200px', objectFit: 'cover' }} />
              </div>
              <div className="card-content" style={{ padding: '15px' }}>
                <span className="card-category" style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#888' }}>
                  {art.categoria} • {art.fecha}
                </span>
                <h3 className="card-title" style={{ fontSize: '1.1rem', margin: '8px 0 10px', height: '50px', overflow: 'hidden' }}>
                  {art.titulo}
                </h3>
                <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: '1.4', marginBottom: '15px' }}>
                  {art.extracto}
                </p>
              </div>
            </div>

            <div style={{ padding: '0 15px 15px' }}>
              <Link
                to={`/blog/${art.id}`}
                className="btn-add-cart"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  backgroundColor: '#1d2530',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                Leer artículo
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Blogs;