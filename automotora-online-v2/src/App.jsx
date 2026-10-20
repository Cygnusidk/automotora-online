import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Encabezado
import Header from './components/Header';

// Páginas Públicas y de Cliente
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import DetalleBlog from './pages/DetalleBlog';
import Contacto from './pages/Contacto';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import Pago from './pages/Pago';
import PagoExitoso from './pages/PagoExitoso';
import PagoFallido from './pages/PagoFallido';
import UserHome from './pages/UserHome';
import DetalleProducto from './pages/DetalleProducto';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';

// Páginas de Administración
import AdminHome from './pages/admin/AdminHome';
import AdminProductos from './pages/admin/AdminProductos';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminPerfil from './pages/admin/AdminPerfil';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Rutas Públicas y Cliente */}
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<DetalleBlog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Carrito />} />
        
        {/* Flujo de Compra */}
        <Route path="/pago" element={<Pago />} />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/pago-fallido" element={<PagoFallido />} />
        
        <Route path="/usuario-home" element={<UserHome />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />

        {/* Rutas de Administración */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/ordenes" element={<AdminOrdenes />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/categorias" element={<AdminCategorias />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/perfil" element={<AdminPerfil />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;