import { useParams } from "react-router";
import EncabezadoAlbum from "../components/EncabezadoAlbum/EncabezadoAlbum.jsx";
import TablaPistas from "../components/TablaPistas/TablaPistas.jsx";
import MasDelArtista from "../components/MasDelArtista/MasDelArtista.jsx";
import EstadoCarga from "../components/EstadoCarga/EstadoCarga.jsx";
import EstadoError from "../components/EstadoError/EstadoError.jsx";
import NoEncontrado from "./NoEncontrado.jsx";
import { useRecurso } from "../hooks/useRecurso.js";
import { useTextos } from "../hooks/useTextos.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import { formatear } from "../utils/formatear.js";
import "./DetalleAlbum.css";

// Figma: 5 tarjetas en «Más de {artista}»
const ESQUELETOS = 5;

// Título de la pestaña mientras el álbum no está disponible: 404, error o carga. O(1).
function tituloSinAlbum(error, noExiste, textosAlbum, estados) {
  if (noExiste) return textosAlbum.noEncontrado.titulo;
  return error ? estados.error.titulo : estados.cargando.titulo;
}

// Ruta /albumes/:id. Solo compone: pide GET /albumes/:id y reparte los datos.
// Complejidad: O(1).
export default function DetalleAlbum() {
  const { id } = useParams();
  const { paginas, estados, errores } = useTextos();
  const { seo, noEncontrado } = paginas.album;
  const {
    datos: album,
    cargando,
    error,
    recargar,
  } = useRecurso(`/albumes/${id}`);
  const noExiste = error?.codigo === "no_encontrado";

  // Metadatos del álbum; mientras no hay álbum, el título del estado en curso
  useTituloPagina(
    album
      ? formatear(seo.titulo, { titulo: album.titulo })
      : tituloSinAlbum(error, noExiste, paginas.album, estados),
    album
      ? `${album.titulo} · ${album.artista.nombre}. ${seo.descripcion}`
      : undefined,
  );

  if (noExiste) {
    return (
      <NoEncontrado
        titulo={noEncontrado.titulo}
        descripcion={noEncontrado.texto}
        textoBoton={noEncontrado.botones.volver}
        destino="/catalogo"
      />
    );
  }

  return (
    <div className="detalle-album">
      {cargando && (
        <EstadoCarga
          etiqueta={estados.cargando.aria}
          forma="album"
          cantidad={ESQUELETOS}
          className="detalle-album-esqueletos"
        />
      )}
      {error && (
        <EstadoError
          titulo={estados.error.titulo}
          descripcion={errores[error.codigo] ?? estados.error.descripcion}
          textoBoton={estados.error.botones.reintentar}
          onReintentar={recargar}
        />
      )}
      {album && (
        <>
          <EncabezadoAlbum album={album} />
          <TablaPistas pistas={album.pistas} />
          <MasDelArtista
            artista={album.artista}
            albumes={album.masDelArtista}
          />
        </>
      )}
    </div>
  );
}
