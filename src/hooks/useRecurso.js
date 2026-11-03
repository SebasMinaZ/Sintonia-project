import { useEffect, useState } from "react";
import { consultar } from "../services/api.js";

export function useRecurso(ruta) {
  const [intento, setIntento] = useState(0);
  const [resultado, setResultado] = useState({
    clave: null,
    datos: null,
    error: null,
  });
  const clave = ruta ? `${ruta}#${intento}` : null;

  useEffect(() => {
    if (!ruta) return;
    const controlador = new AbortController();
    let vigente = true;
    consultar(ruta, { signal: controlador.signal })
      .then((datos) => {
        if (vigente) setResultado({ clave, datos, error: null });
      })
      .catch((error) => {
        if (vigente && error.name !== "AbortError")
          setResultado({ clave, datos: null, error });
      });
    return () => {
      vigente = false;
      controlador.abort();
    };
  }, [ruta, clave]);

  const listo = clave !== null && resultado.clave === clave;
  return {
    datos: listo ? resultado.datos : null,
    error: listo ? resultado.error : null,
    cargando: Boolean(ruta) && !listo,
    recargar: () => setIntento((valor) => valor + 1),
  };
}
