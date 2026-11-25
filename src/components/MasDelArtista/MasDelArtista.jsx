import { Link } from "react-router";
import TarjetaAlbum from "../TarjetaAlbum/TarjetaAlbum.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import { formatear } from "../../utils/formatear.js";
import "./MasDelArtista.css";

// «Más de {artista}»: otras publicaciones del mismo artista.
// "Ver discografía" apunta a una ruta del sprint 3 (por ahora cae en No encontrado).
// Complejidad: O(n) con n = álbumes de masDelArtista.
export default function MasDelArtista({ artista, albumes }) {
  const { masDelArtista, encabezado } = useTextos().paginas.album;
  if (albumes.length === 0) return null;

  return (
    <section className="mas-del-artista" aria-labelledby="mas-del-artista">
      <div className="titulo-seccion">
        <h2 id="mas-del-artista" className="titular-h2">
          {formatear(masDelArtista.titulo, { artista: artista.nombre })}
        </h2>
        <Link
          className="mas-del-artista-enlace cuerpo-p-fuerte"
          to={`/artistas/${artista.id}`}
        >
          {masDelArtista.enlaces.verDiscografia}
        </Link>
      </div>
      <div className="mas-del-artista-lista">
        {albumes.map((album) => (
          <TarjetaAlbum
            key={album.id}
            album={album}
            to={`/albumes/${album.id}`}
            subtitulo={formatear(masDelArtista.etiquetas.anioYTipo, {
              anio: album.fechaPublicacion.slice(0, 4),
              tipo: encabezado.etiquetas.tipo[album.tipo],
            })}
          />
        ))}
      </div>
    </section>
  );
}
