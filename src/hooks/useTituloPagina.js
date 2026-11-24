import { useEffect } from "react";

export function useTituloPagina(titulo, descripcion) {
  useEffect(() => {
    document.title = titulo;
    if (descripcion) {
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", descripcion);
    }
  }, [titulo, descripcion]);
}
