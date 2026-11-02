import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import "./TarjetaAlbum.css";
export default function TarjetaAlbum({ album, onSeleccionar }) {
  return (
    <button
      className="tarjeta-album"

      onClick={() => onSeleccionar(album)}
    >
      <PortadaAlbum variante={album.arte} />
      <span>{album.nombre}</span>
      <small>{album.artista}</small>
    </button>
  );
}
