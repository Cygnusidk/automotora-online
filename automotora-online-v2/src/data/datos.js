// src/data/datos.js

const productosIniciales = [
  { id: 1, imagen: "img/mustang.jpg", categoria: "Deportivo", titulo: "Ford Mustang GT", precio: "$45.000.000", descripcion: "V8 5.0L de alto rendimiento" },
  { id: 5, imagen: "img/camaro.jpg", categoria: "Deportivo", titulo: "Chevrolet Camaro SS", precio: "$42.000.000", descripcion: "Motor V8 deportivo" },
  { id: 10, imagen: "img/porsche.jpg", categoria: "Deportivo Premium", titulo: "Porsche 911 Carrera", precio: "$120.000.000", descripcion: "Deportivo de lujo" },
  { id: 7, imagen: "img/bmw3.jpg", categoria: "Sedán Premium", titulo: "BMW Serie 3 330i", precio: "$48.000.000", descripcion: "Sedán deportivo luxury" },
  { id: 3, imagen: "img/civic.jpg", categoria: "Sedán", titulo: "Honda Civic Sport", precio: "$22.000.000", descripcion: "Eficiencia y diseño" },
  { id: 9, imagen: "img/audiq5.jpg", categoria: "SUV Premium", titulo: "Audi Q5 Sportback", precio: "$52.000.000", descripcion: "SUV tracción quattro" },
  { id: 6, imagen: "img/cx5.jpg", categoria: "SUV", titulo: "Mazda CX-5 Signature", precio: "$26.000.000", descripcion: "SUV elegante y confortable" },
  { id: 4, imagen: "img/jeep.jpg", categoria: "Todoterreno", titulo: "Jeep Wrangler Rubicon", precio: "$55.000.000", descripcion: "Tracción 4x4 todoterreno" },
  { id: 8, imagen: "img/raptor.jpg", categoria: "Camioneta", titulo: "Ford F-150 Raptor", precio: "$65.000.000", descripcion: "Pick-up de alta potencia" },
  { id: 2, imagen: "img/rav4.jpg", categoria: "SUV", titulo: "Toyota RAV4 Híbrida", precio: "$28.500.000", descripcion: "SUV híbrido eficiente" }
];

// READ: Obtener productos (Inicializa si no existen)
export const obtenerProductos = () => {
  const prods = JSON.parse(localStorage.getItem('productos'));
  if (prods && prods.length >= 10) {
    return prods;
  } else {
    localStorage.setItem('productos', JSON.stringify(productosIniciales));
    return productosIniciales;
  }
};

// CREATE: Agregar producto (Para cuando uses tu panel admin)
export const agregarProducto = (nuevoProducto) => {
  const prods = obtenerProductos();
  prods.push(nuevoProducto);
  localStorage.setItem('productos', JSON.stringify(prods));
  window.dispatchEvent(new Event('productosUpdated')); // Avisa a React que actualice
};

// UPDATE: Actualizar producto
export const actualizarProducto = (id, datosActualizados) => {
  let prods = obtenerProductos();
  prods = prods.map(p => p.id === id ? { ...p, ...datosActualizados } : p);
  localStorage.setItem('productos', JSON.stringify(prods));
  window.dispatchEvent(new Event('productosUpdated'));
};

// DELETE: Eliminar producto
export const eliminarProducto = (id) => {
  let prods = obtenerProductos();
  prods = prods.filter(p => p.id !== id);
  localStorage.setItem('productos', JSON.stringify(prods));
  window.dispatchEvent(new Event('productosUpdated'));
};