import { Link, useSearchParams } from "react-router";
import Flecha from "../components/Flecha/Flecha.jsx";
import TarjetaGenero from "../components/TarjetaGenero/TarjetaGenero.jsx";
import TarjetaAlbum from "../components/TarjetaAlbum/TarjetaAlbum.jsx";
import TarjetaArtista from "../components/TarjetaArtista/TarjetaArtista.jsx";
import ListaCanciones from "../components/ListaCanciones/ListaCanciones.jsx";
import NoEncontrado from "./NoEncontrado.jsx";
import { useRecurso } from "../hooks/useRecurso.js";
import { useAlbumesDestacados } from "../hooks/useAlbumesDestacados.js";
import { useTextos } from "../hooks/useTextos.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import { formatear } from "../utils/formatear.js";
import "./Catalogo.css";

export default function Catalogo() {
  const textos = useTextos();
  const { catalogo } = textos.paginas;
  useTituloPagina(catalogo.seo.titulo);

  // El filtro vive en la URL: /catalogo?genero=gen_andina
  const [parametros] = useSearchParams();
  const idGenero = parametros.get("genero");

  const { datos } = useRecurso("/generos");
  const generos = datos?.datos ?? [];
  const { datos: genero, error } = useRecurso(
    idGenero ? `/generos/${idGenero}` : null,
  );
  // Sin género elegido se muestran los álbumes destacados
  const destacados = useAlbumesDestacados(idGenero ? [] : generos);

  if (error?.codigo === "no_encontrado") return <NoEncontrado />;

  const descripcion = idGenero
    ? genero?.descripcion
    : catalogo.encabezado.subtitulo;

  return (
    <div className="catalogo">
      <header className="catalogo-encabezado">
        <h1 className="titular-h1">
          {idGenero ? (
            genero?.nombre
          ) : (
            <>
              {/* Figma: en móvil el título es el texto corto del menú */}
              <span className="titulo-escritorio">
                {catalogo.encabezado.titulo}
              </span>
              <span className="titulo-movil">
                {textos.navbar.enlaces.catalogo}
              </span>
            </>
          )}
        </h1>
        <p className="cuerpo-m">{descripcion}</p>
      </header>

      <section
        className="catalogo-seccion catalogo-seccion-generos"
        aria-labelledby="catalogo-generos"
      >
        <div className="titulo-seccion">
          <h2 id="catalogo-generos" className="titular-h2">
            {catalogo.generos.titulo}
          </h2>
        </div>
        <div className="catalogo-generos">
          {generos.map((g) => (
            <TarjetaGenero
              key={g.id}
              genero={g}
              etiquetaActiva={
                g.id === idGenero ? catalogo.generos.aria.seleccionado : null
              }
            />
          ))}
        </div>
      </section>

      {!idGenero && (
        <section
          className="catalogo-seccion"
          aria-labelledby="catalogo-destacados"
        >
          <div className="titulo-seccion">
            <h2 id="catalogo-destacados" className="titular-h2">
              {catalogo.destacados.titulo}
            </h2>
            {/* Ruta del sprint 2: por ahora lleva a "No encontrado" */}
            <Link className="enlace-home cuerpo-p-fuerte" to="/albumes">
              {catalogo.destacados.enlaces.descubrirMas} <Flecha />
            </Link>
          </div>
          <div className="albumes-grid catalogo-albumes">
            {destacados.map((album) => (
              <TarjetaAlbum
                key={album.id}
                album={album}
                to={`/albumes/${album.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {genero && (
        <>
          <section
            className="catalogo-seccion"
            aria-labelledby="catalogo-artistas"
          >
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

          <section
            className="catalogo-seccion"
            aria-labelledby="catalogo-albumes"
          >
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
      )}
    </div>
  );
}
