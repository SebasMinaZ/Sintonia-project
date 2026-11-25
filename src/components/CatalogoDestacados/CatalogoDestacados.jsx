import { Link } from "react-router";
import Flecha from "../Flecha/Flecha.jsx";
import TarjetaAlbum from "../TarjetaAlbum/TarjetaAlbum.jsx";
import EstadoCarga from "../EstadoCarga/EstadoCarga.jsx";
import EstadoError from "../EstadoError/EstadoError.jsx";
import EstadoVacio from "../EstadoVacio/EstadoVacio.jsx";
import { useAlbumesDestacados } from "../../hooks/useAlbumesDestacados.js";
import { useTextos } from "../../hooks/useTextos.js";
import "./CatalogoDestacados.css";

// Figma: una fila de 6 tarjetas
const ESQUELETOS = 6;

// Sin género elegido se muestran los álbumes destacados.
// "respuesta" es la respuesta de GET /generos: null mientras carga o si falló
// (la página ya muestra ese estado), y entonces no se pinta nada.
export default function CatalogoDestacados({ respuesta }) {
  const { paginas, estados, errores } = useTextos();
  const textos = paginas.catalogo.destacados;
  const { albumes, cargando, error, recargar } = useAlbumesDestacados(
    respuesta ? respuesta.datos : [],
  );
  if (!respuesta) return null;

  return (
    <section className="catalogo-seccion" aria-labelledby="catalogo-destacados">
      <div className="titulo-seccion">
        <h2 id="catalogo-destacados" className="titular-h2">
          {textos.titulo}
        </h2>
        {/* Ruta del sprint 2: por ahora lleva a "No encontrado" */}
        <Link className="enlace-home cuerpo-p-fuerte" to="/albumes">
          {textos.enlaces.descubrirMas} <Flecha />
        </Link>
      </div>
      {cargando && (
        <EstadoCarga
          etiqueta={estados.cargando.aria}
          forma="album"
          cantidad={ESQUELETOS}
          className="albumes-grid catalogo-albumes"
        />
      )}
      {error && (
        <EstadoError
          titulo={estados.error.titulo}
          descripcion={errores[error.codigo] ?? estados.error.descripcion}
          textoBoton={estados.error.botones.reintentar}
          onReintentar={recargar}
        />
      )}
      {!cargando && !error && albumes.length === 0 && (
        <EstadoVacio titulo={estados.vacio.generico} />
      )}
      {albumes.length > 0 && (
        <div className="albumes-grid catalogo-albumes">
          {albumes.map((album) => (
            <TarjetaAlbum
              key={album.id}
              album={album}
              to={`/albumes/${album.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
