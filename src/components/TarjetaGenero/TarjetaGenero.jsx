import { Link } from "react-router";
import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import { colorToken } from "../../utils/colores.js";
import "./TarjetaGenero.css";
// "etiquetaActiva" solo llega en el catálogo, en la tarjeta del género elegido
export default function TarjetaGenero({ genero, etiquetaActiva }) {
  // Los fondos oscuros ("fondo/…", como Lo-fi) llevan el texto claro
  const oscura = genero.color.startsWith("fondo/");
  return (
    <Link
      to={`/catalogo?genero=${genero.id}`}
      className={`tarjeta-genero ${oscura ? "tarjeta-genero-oscura" : ""}`}
      style={{ background: colorToken(genero.color) }}
      aria-current={etiquetaActiva ? "true" : undefined}
    >
      <span className="titular-h3">{genero.nombre}</span>
      {etiquetaActiva && (
        <span className="solo-lectores">{etiquetaActiva}</span>
      )}
      <PortadaAlbum portada={genero.portada} />
    </Link>
  );
}
