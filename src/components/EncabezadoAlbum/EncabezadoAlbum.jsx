import { Link } from "react-router";
import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import { formatear } from "../../utils/formatear.js";
import "./EncabezadoAlbum.css";

// Botón de volver (solo móvil, como en Figma) + portada y datos del álbum.
// Ícono oficial public/iconos/chevL.svg, dentro del JSX para heredar currentColor.
// Complejidad: O(1).
export default function EncabezadoAlbum({ album }) {
  const { encabezado, noEncontrado } = useTextos().paginas.album;
  const { tipo, resumen } = encabezado.etiquetas;
  const nombreArtista = album.artista.nombre;

  const canciones = formatear(
    album.totalPistas === 1
      ? encabezado.canciones.uno
      : encabezado.canciones.otro,
    { cantidad: album.totalPistas },
  );
  const duracion = formatear(encabezado.duracion, {
    minutos: Math.round(album.duracionSeg / 60),
  });
  const textoResumen = formatear(resumen, {
    artista: nombreArtista,
    anio: album.fechaPublicacion.slice(0, 4),
    canciones,
    duracion,
  });

  return (
    <>
      <Link
        className="encabezado-album-volver"
        to="/catalogo"
        aria-label={noEncontrado.botones.volver}
      >
        <svg
          viewBox="0 0 18 18"
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11.25 13.5L6.75 9L11.25 4.5" />
        </svg>
      </Link>
      <header className="encabezado-album">
        <PortadaAlbum
          portada={album.portada}
          className="encabezado-album-portada"
        />
        <div className="encabezado-album-datos">
          <span className="encabezado-album-tipo detalle-nota-fuerte">
            {tipo[album.tipo]}
          </span>
          <h1 className="encabezado-album-titulo">{album.titulo}</h1>
          <p className="encabezado-album-resumen cuerpo-p">
            <PortadaAlbum
              portada={album.portada}
              className="encabezado-album-mini"
            />
            {textoResumen.startsWith(nombreArtista) ? (
              <>
                <span className="encabezado-album-artista">
                  {nombreArtista}
                </span>
                {textoResumen.slice(nombreArtista.length)}
              </>
            ) : (
              textoResumen
            )}
          </p>
        </div>
      </header>
    </>
  );
}
