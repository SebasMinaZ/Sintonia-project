import { useEffect } from "react";

// Pone título y descripción de la vista; al salir restaura la descripción anterior.
export function useTituloPagina(titulo, descripcion) {
  useEffect(() => {
    document.title = titulo;
    if (!descripcion) return undefined;
    const meta = document.querySelector('meta[name="description"]');
    const anterior = meta.getAttribute("content");
    meta.setAttribute("content", descripcion);
    return () => meta.setAttribute("content", anterior);
  }, [titulo, descripcion]);
}
