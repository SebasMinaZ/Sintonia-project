import { Link } from "react-router";
import Flecha from "../Flecha/Flecha.jsx";
import TarjetaAlbum from "../TarjetaAlbum/TarjetaAlbum.jsx";
import { useAlbumesDestacados } from "../../hooks/useAlbumesDestacados.js";
import { useTextos } from "../../hooks/useTextos.js";
import "./CatalogoDestacados.css";

// Sin género elegido se muestran los álbumes destacados
export default function CatalogoDestacados({ generos }) {
  const { destacados: textos } = useTextos().paginas.catalogo;
  const destacados = useAlbumesDestacados(generos);

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
  );
}
