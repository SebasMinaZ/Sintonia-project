import { useEffect, useState } from "react";
import { TextosContext } from "../hooks/useTextos.js";
import { usePreferencias } from "../hooks/usePreferencias.js";
import { consultar } from "../services/api.js";

export function TextosProvider({ children }) {
  const { idioma } = usePreferencias();
  const [porIdioma, setPorIdioma] = useState({});

  useEffect(() => {
    if (porIdioma[idioma]) return; // si ya tengo el idioma, no lo pido de nuevo.
    const controlador = new AbortController(); // Usamos AbortController para cancelar la peticion si se cmbia de idioma muy rapido.
    consultar(`/textos?idioma=${idioma}`, { signal: controlador.signal })
      .then(
        (respuesta) =>
          setPorIdioma((previos) => ({
            ...previos,
            [idioma]: respuesta.textos,
          })), // Añadimos el idioma nuevo sin borrar el anterior/Cuando la API responde, solo guardo textos
      )
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });
    return () => controlador.abort();
  }, [idioma, porIdioma]);

  const textos = porIdioma[idioma] ?? Object.values(porIdioma)[0]; // Si el idioma que se pide se tarda en llegar, se sigue usando el que este.
  if (!textos) return null;

  return (
    <TextosContext.Provider value={textos}>{children}</TextosContext.Provider>
  );
}
