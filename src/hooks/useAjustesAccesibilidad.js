import { useEffect, useState } from "react";

const CLAVE = "sintonia-accesibilidad";
// Hasta 130 %: con más, la vista de 390 px se desborda
export const TAMANO = { minimo: 90, maximo: 130, paso: 10 };

// Valores iniciales: los que la persona ya definió en su sistema operativo
function ajustesDelSistema() {
  const prefiere = (consulta) => window.matchMedia(consulta).matches;
  return {
    tamano: 100,
    contraste: prefiere("(prefers-contrast: more)"),
    movimiento: prefiere("(prefers-reduced-motion: reduce)"),
    subrayar: false,
    espaciado: false,
  };
}

// Se guarda en localStorage (este dispositivo), no en una cookie
function leerGuardados() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE));
    return { ...ajustesDelSistema(), ...guardados };
  } catch {
    return ajustesDelSistema();
  }
}

export function useAjustesAccesibilidad() {
  const [ajustes, setAjustes] = useState(leerGuardados);

  // Aplica los ajustes a <html> cada vez que cambian
  useEffect(() => {
    const html = document.documentElement;
    html.style.zoom = ajustes.tamano === 100 ? "" : `${ajustes.tamano}%`;
    html.classList.toggle("a11y-contraste", ajustes.contraste);
    html.classList.toggle("a11y-movimiento", ajustes.movimiento);
    html.classList.toggle("a11y-subrayar", ajustes.subrayar);
    html.classList.toggle("a11y-espaciado", ajustes.espaciado);
  }, [ajustes]);

  function cambiar(clave, valor) {
    const nuevos = { ...ajustes, [clave]: valor };
    setAjustes(nuevos);
    try {
      localStorage.setItem(CLAVE, JSON.stringify(nuevos));
    } catch {
      // Si el navegador bloquea el almacenamiento, el ajuste dura hasta recargar
    }
  }

  function restablecer() {
    try {
      localStorage.removeItem(CLAVE);
    } catch {
      // Nada que borrar
    }
    setAjustes(ajustesDelSistema());
  }

  return { ajustes, cambiar, restablecer };
}
