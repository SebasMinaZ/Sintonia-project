import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import "./TarjetaAlbum.css";
export default function TarjetaAlbum({ album, onSeleccionar }) {
  return (
    <button className="tarjeta-album" onClick={() => onSeleccionar(album)}>
      <PortadaAlbum portada={album.portada} />
      <span className="cuerpo-m-fuerte">{album.titulo}</span>
      <small className="cuerpo-p">{album.artista.nombre}</small>
    </button>
  );
}
