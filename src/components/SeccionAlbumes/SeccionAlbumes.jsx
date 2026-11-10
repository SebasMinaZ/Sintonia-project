import { Link } from "react-router";
import Flecha from "../Flecha/Flecha.jsx";
import TarjetaAlbum from "../TarjetaAlbum/TarjetaAlbum.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./SeccionAlbumes.css";
export default function SeccionAlbumes({ albumes, onSeleccionar }) {
  const { destacados } = useTextos().paginas.inicioPublico;
  return (
    <section
      className="ancho-home seccion-albumes"
      id="albumes"
      aria-labelledby="albumes-titulo"
    >
      <div className="titulo-seccion">
        <h2 id="albumes-titulo" className="titular-h2">
          {destacados.titulo}
        </h2>
        <Link className="enlace-home cuerpo-p-fuerte" to="/catalogo">
          {destacados.enlaces.descubrirMas} <Flecha />
        </Link>
      </div>
      <div className="albumes-grid">
        {albumes.map((album) => (
          <TarjetaAlbum
            key={album.id}
            album={album}
            onSeleccionar={onSeleccionar}
          />
        ))}
      </div>
    </section>
  );
}
