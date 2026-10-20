import React from 'react';

const AdminDashboard = () => (
  <div className="container my-5">
    <h2>Panel de Administración (Dashboard)</h2>
    <div className="row mt-4">
      <div className="col-md-4"><div className="card p-3 bg-primary text-white">Compras: 1,234</div></div>
      <div className="col-md-4"><div className="card p-3 bg-success text-white">Productos: 400</div></div>
      <div className="col-md-4"><div className="card p-3 bg-warning text-dark">Usuarios: 890</div></div>
    </div>
  </div>
);

export default AdminDashboard;