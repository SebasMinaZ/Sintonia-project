import TarjetaArtista from "../TarjetaArtista/TarjetaArtista.jsx";
import TarjetaAlbum from "../TarjetaAlbum/TarjetaAlbum.jsx";
import ListaCanciones from "../ListaCanciones/ListaCanciones.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import { formatear } from "../../utils/formatear.js";
import "./CatalogoGenero.css";

// Detalle del género elegido: artistas, álbumes y canciones
export default function CatalogoGenero({ genero }) {
  const { catalogo } = useTextos().paginas;

  return (
    <>
      <section className="catalogo-seccion" aria-labelledby="catalogo-artistas">
        <div className="titulo-seccion">
          <h2 id="catalogo-artistas" className="titular-h2">
            {catalogo.genero.artistas.titulo}
          </h2>
        </div>
        <div className="catalogo-artistas">
          {genero.artistas.map((artista) => (
            <TarjetaArtista
              key={artista.id}
              artista={artista}
              etiqueta={catalogo.genero.artistas.etiqueta}
            />
          ))}
        </div>
      </section>

      <section className="catalogo-seccion" aria-labelledby="catalogo-albumes">
        <div className="titulo-seccion">
          <h2 id="catalogo-albumes" className="titular-h2">
            {formatear(catalogo.genero.albumes.titulo, {
              genero: genero.nombre,
            })}
          </h2>
        </div>
        {genero.albumes.length > 0 ? (
          <div className="albumes-grid catalogo-albumes">
            {genero.albumes.map((album) => (
              <TarjetaAlbum
                key={album.id}
                album={album}
                to={`/albumes/${album.id}`}
              />
            ))}
          </div>
        ) : (
          <div>
            <p className="cuerpo-m-fuerte">{catalogo.vacio.titulo}</p>
            <p className="cuerpo-p">{catalogo.vacio.texto}</p>
          </div>
        )}
      </section>

      <section
        className="catalogo-seccion catalogo-seccion-canciones"
        aria-labelledby="catalogo-canciones"
      >
        <div className="titulo-seccion">
          <h2 id="catalogo-canciones" className="titular-h2">
            {catalogo.genero.canciones.titulo}
          </h2>
        </div>
        <ListaCanciones pistas={genero.pistas} />
      </section>
    </>
  );
}
