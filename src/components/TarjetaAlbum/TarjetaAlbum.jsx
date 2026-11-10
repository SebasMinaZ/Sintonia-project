import { Link } from "react-router";
import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import "./TarjetaAlbum.css";
// Con "to" es un enlace (Catálogo → ruta de detalle); sin "to", un botón (Inicio → ventana)
export default function TarjetaAlbum({ album, to, onSeleccionar }) {
  const contenido = (
    <>
      <PortadaAlbum portada={album.portada} />
      <span className="cuerpo-m-fuerte">{album.titulo}</span>
      <small className="cuerpo-p">{album.artista.nombre}</small>
    </>
  );
  if (to) {
    return (
      <Link className="tarjeta-album" to={to}>
        {contenido}
      </Link>
    );
  }
  return (
    <button className="tarjeta-album" onClick={() => onSeleccionar(album)}>
      {contenido}
    </button>
  );
}
