import { useEffect, useState } from "react";
import { consultar } from "../services/api.js";

const CANTIDAD = 6;

// Álbumes destacados: los álbumes completos (tipo "album") de todos los géneros,
// en el orden de GET /generos. Cada uno se marca con el nombre de su género.
export function useAlbumesDestacados(generos) {
  const ids = generos.map((genero) => genero.id).join(",");
  const [albumes, setAlbumes] = useState([]);

  useEffect(() => {
    if (!ids) return;
    const controlador = new AbortController();
    const peticiones = ids
      .split(",")
      .map((id) => consultar(`/generos/${id}`, { signal: controlador.signal }));
    Promise.all(peticiones)
      .then((detalles) =>
        setAlbumes(
          detalles
            .flatMap((detalle) =>
              detalle.albumes
                .filter((album) => album.tipo === "album")
                .map((album) => ({ ...album, genero: detalle.nombre })),
            )
            .slice(0, CANTIDAD),
        ),
      )
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });
    return () => controlador.abort();
  }, [ids]);

  return albumes;
}
