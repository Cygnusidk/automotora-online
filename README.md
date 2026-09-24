#  Automotora Online

Plataforma e-commerce y sistema de gestión integral para la comercialización de vehículos, administración de inventario, atención a clientes y publicación de contenido automotriz.


##  Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Características Principales](#-características-principales)
4. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
5. [Instalación y Uso](#-instalación-y-uso)
6. [Roadmap de Desarrollo](#-roadmap-de-desarrollo)
7. [Licencia](#-licencia)


##  Descripción General

**Automotora Online** es una solución digital diseñada para conectar compradores y vendedores del rubro automotriz. Ofrece un portal público moderno para la exploración de vehículos, cotización en línea y contacto directo, acompañado de un panel de administración unificado para controlar productos, usuarios y contenidos.


##  Estructura del Proyecto

```text
automotora-online/
├── index.html              # Página principal / Catálogo de vehículos
├── carrito.html            # Carrito de cotización y reservas
├── contacto.html           # Formulario de soporte y consultas
├── blogs.html              # Sección de noticias, reseñas y artículos
├── admin-home.html         # Panel principal de administración (Dashboard)
├── admin-productos.html    # Gestión de inventario (CRUD de vehículos)
├── admin-usuarios.html     # Control de usuarios, roles y accesos
├── styles.css              # Hoja de estilos global y diseño responsivo
└── README.md               # Documentación del proyecto
```


##  Características Principales

### Portal Público (Cliente B2C)
* **Catálogo de Vehículos:** Visualización detallada de modelos con especificaciones técnicas, precios y galería de imágenes.
* **Carrito de Cotización (`carrito.html`):** Selección múltiple de modelos para realizar solicitudes grupales de cotización o reserva.
* **Formulario de Contacto (`contacto.html`):** Canal directo de atención y consultas de clientes.
* **Blog Automotriz (`blogs.html`):** Publicación de artículos de interés, novedades del sector e Inbound Marketing.

###  Panel de Administración (Admin)
* **Dashboard Central (`admin-home.html`):** Indicadores clave de rendimiento (KPIs), métricas de cotizaciones e inventario activo.
* **Gestión de Productos (`admin-productos.html`):** Alta, baja, modificación e imágenes de vehículos en stock.
* **Gestión de Usuarios (`admin-usuarios.html`):** Administración de roles de usuario (Administrador, Vendedor, Cliente registrado).


##  Tecnologías Utilizadas

* **HTML5:** Marcado semántico para accesibilidad y SEO.
* **CSS3:** Estilos personalizados, Flexbox, CSS Grid y diseño totalmente responsivo (*Mobile First*).
* **Font Awesome:** Iconografía vectorial para mejorar la experiencia visual.
* **Google Fonts (Plus Jakarta Sans):** Tipografía moderna y de fácil lectura.


##  Instalación y Uso

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/automotora-online.git
   ```

2. **Abrir en el navegador:**
   No se requiere un entorno de servidor ni proceso de compilación para la versión actual. Basta con abrir `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).

3. **Visualizar el Panel de Administración:**
   Abre `admin-home.html` directamente para acceder a las vistas del gestor.

##  Roadmap de Desarrollo

- [x] **Fase 1:** Maquetación HTML5 y diseño responsivo en CSS3 (Completado).
- [ ] **Fase 2:** Integración de JavaScript para dinamismo en carrito y filtros de búsqueda.
- [ ] **Fase 3:** Desarrollo e integración de API RESTful con Backend y Base de Datos.
- [ ] **Fase 4:** Pasarela de pagos online y simulación de crédito automotriz.
