import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import "./TarjetaGenero.css";
export default function TarjetaGenero({ nombre, i, genero, filtrar }) {
  return (
    <button
      className={`tarjeta-genero genero-${i}`}
      aria-pressed={genero === nombre}
      onClick={() => filtrar(nombre)}
    >
      <span>{nombre}</span>
      <PortadaAlbum variante={[0, 4, 1, 3, 5, 2, 0, 1][i]} />
    </button>
  );
}
