import { Link } from "react-router";
import { formatearDuracion } from "../../utils/formatear.js";
import "./ListaCanciones.css";
// Canciones más escuchadas: la API ya las entrega ordenadas por reproducciones.
// Cada fila enlaza al detalle de su álbum, donde se consulta la lista de canciones.
export default function ListaCanciones({ pistas }) {
  return (
    <ol className="lista-canciones">
      {pistas.map((pista, i) => (
        <li key={pista.id}>
          <Link className="fila-cancion" to={`/albumes/${pista.album.id}`}>
            <span className="cuerpo-m numero-cancion">{i + 1}</span>
            <span className="datos-cancion">
              <span className="cuerpo-m-fuerte">{pista.titulo}</span>
              <span className="cuerpo-p">{pista.artista.nombre}</span>
            </span>
            <span className="cuerpo-p duracion-cancion">
              {formatearDuracion(pista.duracionSeg)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
