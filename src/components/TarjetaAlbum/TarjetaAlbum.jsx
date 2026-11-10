import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import "./TarjetaAlbum.css";
export default function TarjetaAlbum({ album, onSeleccionar }) {
  return (
    <button
      className="tarjeta-album"

      onClick={() => onSeleccionar(album)}
    >
      <PortadaAlbum variante={album.arte} />
      <span className="cuerpo-m-fuerte">{album.nombre}</span>
      <small className="cuerpo-p">{album.artista}</small>
    </button>
  );
}
