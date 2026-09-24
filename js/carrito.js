
function obtenerCarrito() {
  let carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

function formatearDinero(valor) {
  return "$" + valor.toLocaleString("es-CL");
}

function hayUsuarioActivo() {
  return !!localStorage.getItem("usuarioActivo");
}

function agregarAlCarrito(idProducto) {
  idProducto = Number(idProducto);
  let carrito = obtenerCarrito();

  let productoEncontrado = null;
  for (let i = 0; i < listaProductosBase.length; i++) {
    if (listaProductosBase[i].id === idProducto) {
      productoEncontrado = listaProductosBase[i];
      break;
    }
  }
  if (!productoEncontrado) return;

  let itemExistente = null;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      itemExistente = carrito[i];
      break;
    }
  }

  if (itemExistente) {
    itemExistente.cantidad = itemExistente.cantidad + 1;
  } else {
    carrito.push({
      id: productoEncontrado.id,
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      img: productoEncontrado.img,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  renderizarCarrito();
  alert(productoEncontrado.nombre + " fue añadido al carrito.");
}

function eliminarDelCarrito(idProducto) {
  idProducto = Number(idProducto);
  let carrito = obtenerCarrito();
  let nuevoCarrito = [];

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== idProducto) {
      nuevoCarrito.push(carrito[i]);
    }
  }

  guardarCarrito(nuevoCarrito);
  renderizarCarrito();
}

function cambiarCantidadCarrito(idProducto, delta) {
  idProducto = Number(idProducto);
  let carrito = obtenerCarrito();

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      carrito[i].cantidad = carrito[i].cantidad + delta;
      if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
      }
      break;
    }
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

function vaciarCarrito() {
  guardarCarrito([]);
  renderizarCarrito();
}

function actualizarContador() {
  let contador = document.getElementById("cant-carrito");
  if (!contador) return;

  let carrito = obtenerCarrito();
  let totalItems = 0;
  for (let i = 0; i < carrito.length; i++) {
    totalItems += carrito[i].cantidad;
  }
  contador.textContent = totalItems;
}

function renderizarProductos() {
  let contenedor = document.getElementById("contenedor-productos");
  if (!contenedor || contenedor.children.length > 0) return;

  let html = "";
  listaProductosBase.forEach(function (p) {
    html += `
      <article class="product-card">
        <div class="card-media">
          <img src="${p.img}" alt="${p.nombre}">
        </div>
        <div class="card-body">
          <span class="product-category">${p.categoria}</span>
          <h3 class="product-title">${p.nombre}</h3>
          <div class="card-footer">
            <span class="product-price">${formatearDinero(p.precio)}</span>
            <button class="btn-add-cart btn-agregar" data-id="${p.id}">Añadir al Carrito</button>
          </div>
        </div>
      </article>
    `;
  });

  contenedor.innerHTML = html;
}

function renderizarCarrito() {
  let contenedor = document.getElementById("items-carrito");
  let contenedorTotal = document.getElementById("total-carrito");
  if (!contenedor) return;

  let carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = `<tr><td colspan="5" class="carrito-vacio">Tu carrito está vacío. Añade vehículos desde el catálogo.</td></tr>`;
    if (contenedorTotal) contenedorTotal.textContent = formatearDinero(0);
    return;
  }

  let total = 0;
  let html = "";

  carrito.forEach(function (item) {
    let subtotal = item.precio * item.cantidad;
    total += subtotal;

    html += `
      <tr>
        <td class="celda-producto">
          <img src="${item.img}" alt="${item.nombre}" class="miniatura-carrito">
          <span>${item.nombre}</span>
        </td>
        <td>${formatearDinero(item.precio)}</td>
        <td>
          <div class="control-cantidad">
            <button type="button" class="btn-cantidad" onclick="cambiarCantidadCarrito(${item.id}, -1)">-</button>
            <span>${item.cantidad}</span>
            <button type="button" class="btn-cantidad" onclick="cambiarCantidadCarrito(${item.id}, 1)">+</button>
          </div>
        </td>
        <td>${formatearDinero(subtotal)}</td>
        <td><button type="button" class="btn-quitar" onclick="eliminarDelCarrito(${item.id})">Quitar</button></td>
      </tr>
    `;
  });

  contenedor.innerHTML = html;
  if (contenedorTotal) contenedorTotal.textContent = formatearDinero(total);
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "index.html";
}

function irAPagar() {
  let carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega vehículos antes de pagar.");
    return;
  }
  window.location.href = "pago.html";
}

function renderizarResumenPago() {
  let contenedor = document.getElementById("resumen-items-pago");
  let contenedorTotal = document.getElementById("resumen-total-pago");
  if (!contenedor) return;

  let carrito = obtenerCarrito();
  let total = 0;
  let html = "";

  carrito.forEach(function (item) {
    let subtotal = item.precio * item.cantidad;
    total += subtotal;

    html += `
      <tr>
        <td class="celda-producto">
          <img src="${item.img}" alt="${item.nombre}" class="miniatura-carrito">
          <span>${item.nombre}</span>
        </td>
        <td>${formatearDinero(item.precio)}</td>
        <td>${item.cantidad}</td>
        <td>${formatearDinero(subtotal)}</td>
      </tr>
    `;
  });

  contenedor.innerHTML = html;
  if (contenedorTotal) contenedorTotal.textContent = formatearDinero(total);
}


function confirmarPago() {
  vaciarCarrito();
  alert("¡Pago realizado con éxito! Tu pedido ha sido procesado y pronto un ejecutivo se contactará contigo.");
  window.location.href = "usuario-home.html";
}


document.addEventListener("click", function (e) {
  let botonAgregar = e.target.closest(".btn-agregar");
  if (botonAgregar && botonAgregar.dataset.id) {
    agregarAlCarrito(botonAgregar.dataset.id);
    return;
  }

  let botonSalir = e.target.closest(".btn-cerrar-sesion");
  if (botonSalir) {
    e.preventDefault();
    cerrarSesion();
    return;
  }

  let botonPagar = e.target.closest(".btn-pagar");
  if (botonPagar) {
    irAPagar();
  }
});

document.addEventListener("DOMContentLoaded", function () {

  if (document.getElementById("resumen-items-pago") && !hayUsuarioActivo()) {
    window.location.href = "login.html";
    return;
  }


  if (document.getElementById("resumen-items-pago") && obtenerCarrito().length === 0) {
    window.location.href = "carrito.html";
    return;
  }

  renderizarProductos();
  renderizarCarrito();
  renderizarResumenPago();
  actualizarContador();
});
