function validarCorreoDominio(correo) {
  let correoMin = correo.toLowerCase();
  if (correoMin.endsWith('@duoc.cl') || 
      correoMin.endsWith('@profesor.duoc.cl') || 
      correoMin.endsWith('@gmail.com')) {
    return true;
  }
  return false;
}

function validarRUN(run) {
  const regex = /^[0-9]{7,8}[0-9kK]{1}$/;
  return regex.test(run);
}

// ---- Manejo de usuarios registrados (localStorage) ----
function obtenerUsuarios() {
  let usuariosGuardados = localStorage.getItem("usuarios");
  return usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
}

function guardarUsuario(usuario) {
  let usuarios = obtenerUsuarios();
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function buscarUsuarioPorCredenciales(correo, pass) {
  let usuarios = obtenerUsuarios();
  let correoMin = correo.toLowerCase();

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo.toLowerCase() === correoMin && usuarios[i].pass === pass) {
      return usuarios[i];
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", function() {
  const selectRegion = document.getElementById("select-region");
  const selectComuna = document.getElementById("select-comuna");

  if (selectRegion && selectComuna) {
    regionesYComunas.forEach(function(item) {
      const option = document.createElement("option");
      option.value = item.region;
      option.textContent = item.region;
      selectRegion.appendChild(option);
    });

    selectRegion.addEventListener("change", function(e) {
      selectComuna.innerHTML = '<option value="">-- Seleccione comuna --</option>';
      
      let regionEncontrada = null;
      for (let i = 0; i < regionesYComunas.length; i++) {
        if (regionesYComunas[i].region === e.target.value) {
          regionEncontrada = regionesYComunas[i];
          break;
        }
      }

      if (regionEncontrada) {
        regionEncontrada.comunas.forEach(function(c) {
          const option = document.createElement("option");
          option.value = c;
          option.textContent = c;
          selectComuna.appendChild(option);
        });
      }
    });
  }

  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", function(e) {
      e.preventDefault();
      let valido = true;

      const run = document.getElementById("reg-run").value;
      const nombre = document.getElementById("reg-nombre").value;
      const correo = document.getElementById("reg-correo").value;
      const pass = document.getElementById("reg-pass").value;

      document.querySelectorAll(".error-msg").forEach(function(el) {
        el.textContent = "";
      });

      if (!validarRUN(run)) {
        document.getElementById("error-reg-run").textContent = "RUN inválido. Use formato 19011022K sin puntos.";
        valido = false;
      }

      if (nombre.trim() === "" || nombre.length > 50) {
        document.getElementById("error-reg-nombre").textContent = "Nombre requerido (máximo 50 caracteres).";
        valido = false;
      }

      if (correo.trim() === "" || !validarCorreoDominio(correo)) {
        document.getElementById("error-reg-correo").textContent = "Correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com";
        valido = false;
      }

      if (pass.length < 4 || pass.length > 10) {
        document.getElementById("error-reg-pass").textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
        valido = false;
      }

      if (valido) {
        guardarUsuario({ run: run, nombre: nombre, correo: correo, pass: pass });
        alert("Cliente registrado con éxito. Ahora puedes iniciar sesión.");
        window.location.href = "login.html";
      }
    });
  }

  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", function(e) {
      e.preventDefault();
      const correo = document.getElementById("login-email").value;
      const pass = document.getElementById("login-pass").value;

      if (!validarCorreoDominio(correo)) {
        alert("Correo inválido. Use dominios permitidos (@duoc.cl, @profesor.duoc.cl o @gmail.com).");
        return;
      }

      if (pass.length < 4 || pass.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
      }

      const usuario = buscarUsuarioPorCredenciales(correo, pass);
      if (!usuario) {
        alert("Correo o contraseña incorrectos. Verifica tus datos o regístrate primero.");
        return;
      }

      // Guarda la sesión activa para que otras vistas sepan quién ingresó
      localStorage.setItem("usuarioActivo", JSON.stringify({ correo: usuario.correo, nombre: usuario.nombre }));

      alert("Inicio de sesión exitoso");
      window.location.href = "usuario-home.html";
    });
  }

  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", function(e) {
      e.preventDefault();
      const nombre = document.getElementById("cont-nombre").value;
      const correo = document.getElementById("cont-correo").value;
      const comentario = document.getElementById("cont-comentario").value;

      if (nombre.length > 100) {
        alert("El nombre excede los 100 caracteres.");
        return;
      }

      if (!validarCorreoDominio(correo)) {
        alert("Correo inválido.");
        return;
      }

      if (comentario.length > 500) {
        alert("El comentario excede los 500 caracteres.");
        return;
      }
      
      alert("Mensaje de contacto enviado exitosamente.");
    });
  }

  const formProd = document.getElementById("form-admin-prod");
  if (formProd) {
    formProd.addEventListener("submit", function(e) {
      e.preventDefault();
      const codigo = document.getElementById("prod-codigo").value;
      const nombre = document.getElementById("prod-nombre").value;
      const precio = parseFloat(document.getElementById("prod-precio").value);
      const stock = Number(document.getElementById("prod-stock").value);

      if (codigo.length < 3) {
        alert("El código debe tener al menos 3 caracteres.");
        return;
      }

      if (nombre.length === 0 || nombre.length > 100) {
        alert("Nombre requerido (máximo 100 caracteres).");
        return;
      }

      if (isNaN(precio) || precio < 0) {
        alert("El precio debe ser mayor o igual a 0.");
        return;
      }

      if (!Number.isInteger(stock) || stock < 0) {
        alert("El stock debe ser un número entero positivo.");
        return;
      }
      
      alert("Producto guardado correctamente en el sistema.");
      this.reset();
    });
  }

  const formAdminUsu = document.getElementById("form-admin-usu");
  if (formAdminUsu) {
    formAdminUsu.addEventListener("submit", function(e) {
      e.preventDefault();
      const run = document.getElementById("usu-run").value;
      const nombre = document.getElementById("usu-nombre").value;

      if (!validarRUN(run)) {
        alert("RUN inválido. Use formato 19011022K sin puntos.");
        return;
      }

      if (nombre.length === 0 || nombre.length > 50) {
        alert("Nombre requerido (máximo 50 caracteres).");
        return;
      }
      
      alert("Usuario registrado correctamente en el mantenedor.");
      this.reset();
    });
  }

  const formPago = document.getElementById("form-pago");
  const selectMetodo = document.getElementById("pago-metodo");
  const camposTarjeta = document.getElementById("campos-tarjeta");

  if (selectMetodo && camposTarjeta) {
    selectMetodo.addEventListener("change", function () {
      camposTarjeta.style.display = (this.value === "transferencia") ? "none" : "block";
    });
  }

  if (formPago) {
    formPago.addEventListener("submit", function (e) {
      e.preventDefault();
      let valido = true;

      const nombre = document.getElementById("pago-nombre").value;
      const metodo = document.getElementById("pago-metodo").value;
      const numero = document.getElementById("pago-numero").value.replace(/\s/g, "");
      const vencimiento = document.getElementById("pago-vencimiento").value;
      const cvv = document.getElementById("pago-cvv").value;

      document.querySelectorAll(".error-msg").forEach(function (el) {
        el.textContent = "";
      });

      if (nombre.trim() === "" || nombre.length > 60) {
        document.getElementById("error-pago-nombre").textContent = "Nombre requerido (máximo 60 caracteres).";
        valido = false;
      }

      if (metodo === "") {
        document.getElementById("error-pago-metodo").textContent = "Selecciona un método de pago.";
        valido = false;
      }

      if (metodo === "credito" || metodo === "debito") {
        if (!/^[0-9]{13,19}$/.test(numero)) {
          document.getElementById("error-pago-numero").textContent = "Número de tarjeta inválido (13 a 19 dígitos).";
          valido = false;
        }

        if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(vencimiento)) {
          document.getElementById("error-pago-vencimiento").textContent = "Formato inválido. Usa MM/AA.";
          valido = false;
        }

        if (!/^[0-9]{3,4}$/.test(cvv)) {
          document.getElementById("error-pago-cvv").textContent = "CVV inválido (3 o 4 dígitos).";
          valido = false;
        }
      }

      if (valido) {
        confirmarPago();
      }
    });
  }
});