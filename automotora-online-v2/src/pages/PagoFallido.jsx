import React from 'react';
import { Link } from 'react-router-dom';

const PagoFallido = () => {
  return (
    <main className="container text-center py-5" style={{ minHeight: '60vh' }}>
      <div className="card shadow-sm p-5 mx-auto" style={{ maxWidth: '500px', borderRadius: '12px' }}>
        <div className="display-1 text-danger mb-3">❌</div>
        <h2 className="fw-bold mb-3">Transacción Rechazada</h2>
        <p className="text-muted mb-4">
          Hubo un problema al procesar tu pago. Tus productos siguen guardados en el carrito para que puedas volver a intentarlo.
        </p>
        <div className="d-flex gap-2 justify-content-center">
          <Link to="/pago" className="btn btn-danger px-4 py-2 fw-bold">
            Volver a intentar
          </Link>
          <Link to="/" className="btn btn-secondary px-4 py-2">
            Inicio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PagoFallido;