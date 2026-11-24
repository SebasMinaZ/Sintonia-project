import { useSearchParams } from "react-router";
import TarjetaGenero from "../components/TarjetaGenero/TarjetaGenero.jsx";
import CatalogoEncabezado from "../components/CatalogoEncabezado/CatalogoEncabezado.jsx";
import CatalogoDestacados from "../components/CatalogoDestacados/CatalogoDestacados.jsx";
import CatalogoGenero from "../components/CatalogoGenero/CatalogoGenero.jsx";
import NoEncontrado from "./NoEncontrado.jsx";
import { useRecurso } from "../hooks/useRecurso.js";
import { useTextos } from "../hooks/useTextos.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import "./Catalogo.css";

export default function Catalogo() {
  const { catalogo } = useTextos().paginas;
  useTituloPagina(catalogo.seo.titulo);

  // El filtro vive en la URL: /catalogo?genero=gen_andina
  const [parametros] = useSearchParams();
  const idGenero = parametros.get("genero");

  const { datos } = useRecurso("/generos");
  const generos = datos?.datos ?? [];
  const { datos: genero, error } = useRecurso(
    idGenero ? `/generos/${idGenero}` : null,
  );

  if (error?.codigo === "no_encontrado") return <NoEncontrado />;

  return (
    <div className="catalogo">
      <CatalogoEncabezado idGenero={idGenero} genero={genero} />

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

      {!idGenero && <CatalogoDestacados generos={generos} />}
      {genero && <CatalogoGenero genero={genero} />}
    </div>
  );
}
