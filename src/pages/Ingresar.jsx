import { useEffect } from "react";
import FormularioIngreso from "../components/FormularioIngreso/FormularioIngreso.jsx";
import GestorCookies from "../components/GestorCookies/GestorCookies.jsx";
import Marca from "../components/Marca/Marca.jsx";
import PortadaAlbum from "../components/PortadaAlbum/PortadaAlbum.jsx";
import SaltarContenido from "../components/SaltarContenido/SaltarContenido.jsx";
import { proyecto } from "../config/proyecto.js";
import { useRecurso } from "../hooks/useRecurso.js";
import { useTextos } from "../hooks/useTextos.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import { formatear } from "../utils/formatear.js";
import "./Ingresar.css";

// Figma: la presentación muestra 8 portadas (3 en móvil, por CSS)
const PORTADAS = 8;

// Ruta /ingresar, fuera de LayoutPublico (Figma no muestra navbar ni footer).
// Solo compone: logo, título, formulario, derechos y presentación con las
// portadas de los primeros géneros (GET /generos, ya pedido en main.jsx).
// Complejidad: O(1), siempre hay como mucho 8 portadas.
export default function Ingresar() {
  const { seo, presentacion, formulario } = useTextos().paginas.ingresar;
  const { general, footer } = useTextos();
  useTituloPagina(seo.titulo, seo.descripcion);
  const { datos } = useRecurso("/generos");
  const generos = datos?.datos.slice(0, PORTADAS) ?? [];

  // Al entrar desde otra página, se empieza arriba (como hace LayoutPublico).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`landing ${proyecto.id}`}>
      <SaltarContenido texto={general.aria.saltarAlContenido} />
      <main id="contenido" tabIndex={-1} className="ingresar">
        <div className="ingresar-columna">
          <Marca nombre={proyecto.nombre} tipo={proyecto.id} />
          <div className="ingresar-contenido">
            <h1 className="ingresar-titulo titular-h1">{formulario.titulo}</h1>
            <p className="ingresar-subtitulo cuerpo-m">
              {formulario.subtitulo}
            </p>
            <FormularioIngreso />
          </div>
          <p className="ingresar-derechos detalle-nota">
            {formatear(footer.legal.derechos, {
              anio: new Date().getFullYear(),
            })}
          </p>
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
      </main>
      <GestorCookies />
    </div>
  );
}
