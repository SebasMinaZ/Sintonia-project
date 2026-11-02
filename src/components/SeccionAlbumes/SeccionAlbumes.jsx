import Flecha from "../Flecha/Flecha.jsx";
import TarjetaAlbum from "../TarjetaAlbum/TarjetaAlbum.jsx";
import "./SeccionAlbumes.css";
export default function SeccionAlbumes({
  visibles,
  genero,
  en,
  setGenero,
  onSeleccionar,
}) {
  return (
    <section
      className="ancho-home seccion-albumes"
      id="albumes"
      aria-labelledby="albumes-titulo"
    >
      <div className="titulo-seccion">
        <h2 id="albumes-titulo">
          {genero || (en ? "Playing this week" : "Suena esta semana")}
        </h2>
        {genero ? (
          <button className="enlace-home" onClick={() => setGenero(null)}>
            {en ? "View all" : "Ver todos"} <Flecha />
          </button>
        ) : (
          <a className="enlace-home" href="#generos">
            {en ? "Discover more" : "Descubrir más"} <Flecha />
          </a>
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
      {!visibles.length && (
        <p role="status">
          {en
            ? "No albums in this genre yet."
            : "Todavía no hay álbumes de este género en la selección semanal."}
        </p>
      )}
    </section>
  );
}
