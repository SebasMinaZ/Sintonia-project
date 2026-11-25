import { useEffect, useState } from "react";
import { consultar } from "../services/api.js";

const CANTIDAD = 6;

// Álbumes destacados: los álbumes completos (tipo "album") de todos los géneros,
// en el orden de GET /generos. Cada uno se marca con el nombre de su género.
// Devuelve { albumes, cargando, error, recargar }. Complejidad: O(g + a), con
// g géneros y a álbumes (una pasada por cada lista).
export function useAlbumesDestacados(generos) {
  const ids = generos.map((genero) => genero.id).join(",");
  const [intento, setIntento] = useState(0);
  const [resultado, setResultado] = useState({
    clave: null,
    albumes: [],
    error: null,
  });
  const clave = ids ? `${ids}#${intento}` : null;

  useEffect(() => {
    if (!ids) return;
    const controlador = new AbortController();
    let vigente = true;
    const peticiones = ids
      .split(",")
      .map((id) => consultar(`/generos/${id}`, { signal: controlador.signal }));
    Promise.all(peticiones)
      .then((detalles) => {
        if (!vigente) return;
        const albumes = detalles
          .flatMap((detalle) =>
            detalle.albumes
              .filter((album) => album.tipo === "album")
              .map((album) => ({ ...album, genero: detalle.nombre })),
          )
          .slice(0, CANTIDAD);
        setResultado({ clave, albumes, error: null });
      })
      .catch((error) => {
        if (vigente && error.name !== "AbortError")
          setResultado({ clave, albumes: [], error });
      });
    return () => {
      vigente = false;
      controlador.abort();
    };
  }, [ids, clave]);

  const listo = clave !== null && resultado.clave === clave;
  return {
    albumes: listo ? resultado.albumes : [],
    error: listo ? resultado.error : null,
    cargando: clave !== null && !listo,
    recargar: () => setIntento((valor) => valor + 1),
  };
}
