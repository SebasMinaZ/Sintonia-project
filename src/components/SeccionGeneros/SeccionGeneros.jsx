import { Link } from "react-router";
import Flecha from "../Flecha/Flecha.jsx";
import TarjetaGenero from "../TarjetaGenero/TarjetaGenero.jsx";
import "./SeccionGeneros.css";
export default function SeccionGeneros({ generos, genero, en, filtrar }) {
  return (
    <section
      className="ancho-home seccion-generos"
      id="generos"
      aria-labelledby="generos-titulo"
    >
      <div className="titulo-seccion">
        <h2 id="generos-titulo">
          {en ? "Explore by genre" : "Explora por género"}
        </h2>
        <Link className="enlace-home" to="/catalogo">
          {en ? "View catalogue" : "Ver catálogo"} <Flecha />
        </Link>
      </div>
      <div className="generos-grid">
        {generos.map((nombre, i) => (
          <TarjetaGenero
            key={nombre}
            nombre={nombre}
            i={i}
            genero={genero}
            filtrar={filtrar}
          />
        ))}
      </div>
    </section>
  );
}
