import { Link } from "react-router";
import { colorToken } from "../../utils/colores.js";
import "./TarjetaArtista.css";
// Círculo con el color de fondo de la portada del artista, su nombre y la etiqueta "Artista"
export default function TarjetaArtista({ artista, etiqueta }) {
  return (
    <Link className="tarjeta-artista" to={`/artistas/${artista.id}`}>
      <span
        className="avatar-artista"
        style={{ background: colorToken(artista.portada.colores[0]) }}
        aria-hidden="true"
      />
      <span className="cuerpo-m-fuerte">{artista.nombre}</span>
      <span className="cuerpo-p">{etiqueta}</span>
    </Link>
  );
}
