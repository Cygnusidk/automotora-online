import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PagoExitoso = () => {
  useEffect(() => {
    localStorage.removeItem('carrito');

    window.dispatchEvent(new Event('cartUpdated'));
  }, []);

  return (
    <main className="container text-center py-5" style={{ minHeight: '60vh' }}>
      <div className="card shadow-sm p-5 mx-auto" style={{ maxWidth: '500px', borderRadius: '12px' }}>
        <div className="display-1 text-success mb-3">✅</div>
        <h2 className="fw-bold mb-3">¡Pago Exitoso!</h2>
        <p className="text-muted mb-4">
          Muchas gracias por tu compra. Tu pedido ha sido procesado correctamente y hemos enviado el comprobante a tu correo.
        </p>
        <Link to="/" className="btn btn-primary px-4 py-2 fw-bold">
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
};

export default PagoExitoso;