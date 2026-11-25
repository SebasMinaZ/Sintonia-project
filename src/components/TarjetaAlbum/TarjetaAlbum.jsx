import { Link } from "react-router";
import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import "./TarjetaAlbum.css";
// Enlace al detalle del álbum ("to").
// "subtitulo" es opcional: sin él se muestra el nombre del artista.
export default function TarjetaAlbum({ album, to, subtitulo }) {
  return (
    <Link className="tarjeta-album" to={to}>
      <PortadaAlbum portada={album.portada} />
      <span className="cuerpo-m-fuerte">{album.titulo}</span>
      <small className="cuerpo-p">{subtitulo ?? album.artista.nombre}</small>
    </Link>
  );
}
