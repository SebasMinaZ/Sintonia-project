import TarjetaArtista from "../TarjetaArtista/TarjetaArtista.jsx";
import TarjetaAlbum from "../TarjetaAlbum/TarjetaAlbum.jsx";
import ListaCanciones from "../ListaCanciones/ListaCanciones.jsx";
import EstadoCarga from "../EstadoCarga/EstadoCarga.jsx";
import EstadoError from "../EstadoError/EstadoError.jsx";
import EstadoVacio from "../EstadoVacio/EstadoVacio.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import { formatear } from "../../utils/formatear.js";
import "./CatalogoGenero.css";

// Figma: una fila de 6 tarjetas de álbum
const ESQUELETOS_ALBUMES = 6;

// Detalle del género elegido: artistas, álbumes y canciones.
// Mientras carga o si falla (salvo «no encontrado», que resuelve la página)
// muestra el estado correspondiente.
export default function CatalogoGenero({ genero, cargando, error, recargar }) {
  const { paginas, estados, errores } = useTextos();
  const { catalogo } = paginas;

  if (cargando) {
    return (
      <section className="catalogo-seccion">
        <EstadoCarga
          etiqueta={estados.cargando.aria}
          forma="album"
          cantidad={ESQUELETOS_ALBUMES}
          className="albumes-grid catalogo-albumes"
        />
      </section>
    );
  }
  if (error) {
    return (
      <section className="catalogo-seccion">
        <EstadoError
          titulo={estados.error.titulo}
          descripcion={errores[error.codigo] ?? estados.error.descripcion}
          textoBoton={estados.error.botones.reintentar}
          onReintentar={recargar}
        />
      </section>
    );
  }

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
          <EstadoVacio
            titulo={catalogo.vacio.titulo}
            texto={catalogo.vacio.texto}
          />
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
