(function () {
  const CLAVE_TEMA = "tema";
  const ICONO_SOL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const ICONO_LUNA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function temaActual() {
    return document.documentElement.getAttribute("data-tema") === "claro" ? "claro" : "oscuro";
  }

  function aplicarTema(tema) {
    document.documentElement.setAttribute("data-tema", tema);
    const boton = document.getElementById("temaBoton");
    if (boton) {
      boton.innerHTML = tema === "oscuro" ? ICONO_SOL : ICONO_LUNA;
      boton.setAttribute("aria-label", tema === "oscuro" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    }
  }

  function crearBotonTema() {
    if (document.getElementById("temaBoton")) return;
    const nav = document.querySelector(".mini-nav");
    if (!nav) return;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.id = "temaBoton";
    boton.className = "boton-tema";
    boton.innerHTML = temaActual() === "oscuro" ? ICONO_SOL : ICONO_LUNA;
    boton.setAttribute("aria-label", temaActual() === "oscuro" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");

    boton.addEventListener("click", () => {
      const nuevo = temaActual() === "oscuro" ? "claro" : "oscuro";
      boton.classList.add("girando");
      aplicarTema(nuevo);
      try {
        localStorage.setItem(CLAVE_TEMA, nuevo);
      } catch (e) {}
      setTimeout(() => boton.classList.remove("girando"), 450);
    });

    nav.appendChild(boton);
  }

  // El atributo data-tema ya se fija en <head> antes de pintar (anti-parpadeo);
  // aquí solo sincronizamos el ícono y creamos el botón.
  aplicarTema(temaActual());
  crearBotonTema();

  // Si el tema cambia en otra pestaña o en el sitio principal (mismo dominio),
  // se sincroniza acá también.
  window.addEventListener("storage", (e) => {
    if (e.key === CLAVE_TEMA && e.newValue) aplicarTema(e.newValue);
  });
})();