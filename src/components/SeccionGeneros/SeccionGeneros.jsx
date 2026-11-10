import { Link } from "react-router";
import Flecha from "../Flecha/Flecha.jsx";
import TarjetaGenero from "../TarjetaGenero/TarjetaGenero.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./SeccionGeneros.css";
export default function SeccionGeneros({ generos }) {
  const textos = useTextos().paginas.inicioPublico.generos;
  return (
    <section
      className="ancho-home seccion-generos"
      id="generos"
      aria-labelledby="generos-titulo"
    >
      <div className="titulo-seccion">
        <h2 id="generos-titulo" className="titular-h2">
          {textos.titulo}
        </h2>
        <Link className="enlace-home cuerpo-p-fuerte" to="/catalogo">
          {textos.enlaces.verCatalogo} <Flecha />
        </Link>
      </div>
      <div className="generos-grid">
        {generos.map((genero) => (
          <TarjetaGenero key={genero.id} genero={genero} />
        ))}
      </div>
    </section>
  );
}
