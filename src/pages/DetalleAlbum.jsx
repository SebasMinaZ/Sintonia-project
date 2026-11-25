import { useParams } from "react-router";
import EncabezadoAlbum from "../components/EncabezadoAlbum/EncabezadoAlbum.jsx";
import TablaPistas from "../components/TablaPistas/TablaPistas.jsx";
import MasDelArtista from "../components/MasDelArtista/MasDelArtista.jsx";
import { useRecurso } from "../hooks/useRecurso.js";
import "./DetalleAlbum.css";

// Ruta /albumes/:id. Solo compone: pide GET /albumes/:id y reparte los datos.
export default function DetalleAlbum() {
  const { id } = useParams();
  const { datos: album } = useRecurso(`/albumes/${id}`);
  if (!album) return null;

  return (
    <div className="detalle-album">
      <EncabezadoAlbum album={album} />
      <TablaPistas pistas={album.pistas} />
      <MasDelArtista artista={album.artista} albumes={album.masDelArtista} />
    </div>
  );
}
