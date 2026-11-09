import { Link } from "react-router";
import Flecha from "../Flecha/Flecha.jsx";
import TarjetaGenero from "../TarjetaGenero/TarjetaGenero.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./SeccionGeneros.css";
export default function SeccionGeneros({ generos, genero, filtrar }) {
  const textos = useTextos().paginas.inicioPublico.generos;
  return (
    <section
      className="ancho-home seccion-generos"
      id="generos"
      aria-labelledby="generos-titulo"
    >
      <div className="titulo-seccion">
        <h2 id="generos-titulo">{textos.titulo}</h2>
        <Link className="enlace-home" to="/catalogo">
          {textos.enlaces.verCatalogo} <Flecha />
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
