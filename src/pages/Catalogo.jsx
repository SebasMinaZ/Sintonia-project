import { useSearchParams } from "react-router";
import TarjetaGenero from "../components/TarjetaGenero/TarjetaGenero.jsx";
import CatalogoEncabezado from "../components/CatalogoEncabezado/CatalogoEncabezado.jsx";
import CatalogoDestacados from "../components/CatalogoDestacados/CatalogoDestacados.jsx";
import CatalogoGenero from "../components/CatalogoGenero/CatalogoGenero.jsx";
import EstadoCarga from "../components/EstadoCarga/EstadoCarga.jsx";
import EstadoError from "../components/EstadoError/EstadoError.jsx";
import NoEncontrado from "./NoEncontrado.jsx";
import { useRecurso } from "../hooks/useRecurso.js";
import { useTextos } from "../hooks/useTextos.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import "./Catalogo.css";

// Figma: 8 géneros en el Catálogo (4 filas de 2 en móvil)
const ESQUELETOS_GENEROS = 8;

export default function Catalogo() {
  const { paginas, estados, errores } = useTextos();
  const { catalogo } = paginas;
  useTituloPagina(catalogo.seo.titulo, catalogo.seo.descripcion);

  // El filtro vive en la URL: /catalogo?genero=gen_andina
  const [parametros] = useSearchParams();
  const idGenero = parametros.get("genero");

  const generos = useRecurso("/generos");
  const detalle = useRecurso(idGenero ? `/generos/${idGenero}` : null);

  if (detalle.error?.codigo === "no_encontrado") return <NoEncontrado />;

  return (
    <div className="catalogo">
      <CatalogoEncabezado idGenero={idGenero} genero={detalle.datos} />

      <section
        className="catalogo-seccion catalogo-seccion-generos"
        aria-labelledby="catalogo-generos"
      >
        <div className="titulo-seccion">
          <h2 id="catalogo-generos" className="titular-h2">
            {catalogo.generos.titulo}
          </h2>
        </div>
        {generos.cargando && (
          <EstadoCarga
            etiqueta={estados.cargando.aria}
            forma="genero"
            cantidad={ESQUELETOS_GENEROS}
            className="catalogo-generos"
          />
        )}
        {generos.error && (
          <EstadoError
            titulo={estados.error.titulo}
            descripcion={
              errores[generos.error.codigo] ?? estados.error.descripcion
            }
            textoBoton={estados.error.botones.reintentar}
            onReintentar={generos.recargar}
          />
        )}
        {generos.datos && (
          <div className="catalogo-generos">
            {generos.datos.datos.map((g) => (
              <TarjetaGenero
                key={g.id}
                genero={g}
                etiquetaActiva={
                  g.id === idGenero ? catalogo.generos.aria.seleccionado : null
                }
              />
            ))}
          </div>
        )}
      </section>

      {idGenero ? (
        <CatalogoGenero
          genero={detalle.datos}
          cargando={detalle.cargando}
          error={detalle.error}
          recargar={detalle.recargar}
        />
      ) : (
        <CatalogoDestacados respuesta={generos.datos} />
      )}
    </div>
  );
}
