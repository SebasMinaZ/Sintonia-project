import FormularioIngreso from "../components/FormularioIngreso/FormularioIngreso.jsx";
import PortadaAlbum from "../components/PortadaAlbum/PortadaAlbum.jsx";
import { useRecurso } from "../hooks/useRecurso.js";
import { useTextos } from "../hooks/useTextos.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import "./Ingresar.css";

// Figma: la presentación muestra 8 portadas (3 en móvil, por CSS)
const PORTADAS = 8;

// Ruta /ingresar. Solo compone: título, formulario y presentación con las
// portadas de los primeros géneros (GET /generos, ya pedido en main.jsx).
// Complejidad: O(1), siempre hay como mucho 8 portadas.
export default function Ingresar() {
  const { seo, presentacion, formulario } = useTextos().paginas.ingresar;
  useTituloPagina(seo.titulo, seo.descripcion);
  const { datos } = useRecurso("/generos");
  const generos = datos?.datos.slice(0, PORTADAS) ?? [];

  return (
    <section className="ingresar">
      <div className="ingresar-columna">
        <h1 className="ingresar-titulo titular-h1">{formulario.titulo}</h1>
        <p className="ingresar-subtitulo cuerpo-m">{formulario.subtitulo}</p>
        <FormularioIngreso />
      </div>
      <div className="ingresar-presentacion">
        <div className="ingresar-portadas" aria-hidden="true">
          {generos.map((genero) => (
            <PortadaAlbum
              key={genero.id}
              portada={genero.portada}
              className="ingresar-portada"
            />
          ))}
        </div>
        <h2 className="ingresar-presentacion-titulo titular-h1">
          {presentacion.titulo}
        </h2>
        <p className="ingresar-presentacion-texto cuerpo-g">
          {presentacion.texto}
        </p>
      </div>
    </section>
  );
}
