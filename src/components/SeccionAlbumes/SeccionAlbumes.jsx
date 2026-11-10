import { Link } from "react-router";
import Flecha from "../Flecha/Flecha.jsx";
import TarjetaAlbum from "../TarjetaAlbum/TarjetaAlbum.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./SeccionAlbumes.css";
export default function SeccionAlbumes({
  visibles,
  genero,
  setGenero,
  onSeleccionar,
}) {
  const { paginas, general } = useTextos();
  const { destacados } = paginas.inicioPublico;
  return (
    <section
      className="ancho-home seccion-albumes"
      id="albumes"
      aria-labelledby="albumes-titulo"
    >
      <div className="titulo-seccion">
        <h2 id="albumes-titulo">{genero || destacados.titulo}</h2>
        {genero ? (
          <button className="enlace-home" onClick={() => setGenero(null)}>
            {general.acciones.verTodo} <Flecha />
          </button>
        ) : (
          <Link className="enlace-home" to="/catalogo">
            {destacados.enlaces.descubrirMas} <Flecha />
          </Link>
        )}
      </div>
      <div className="albumes-grid">
        {visibles.map((album) => (
          <TarjetaAlbum
            key={album.nombre}
            album={album}
            onSeleccionar={onSeleccionar}
          />
        ))}
      </div>
      {!visibles.length && <p role="status">{paginas.catalogo.vacio.titulo}</p>}
    </section>
  );
}
