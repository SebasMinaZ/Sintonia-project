import Flecha from "../Flecha/Flecha.jsx";
import TarjetaGenero from "../TarjetaGenero/TarjetaGenero.jsx";
import "./SeccionGeneros.css";
export default function SeccionGeneros({
  generos,
  genero,
  en,
  setGenero,
  filtrar,
}) {
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
        <a
          className="enlace-home"
          href="#albumes"
          onClick={() => setGenero(null)}
        >
          {en ? "View catalogue" : "Ver catálogo"} <Flecha />
        </a>
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
