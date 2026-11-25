import { useTextos } from "../../hooks/useTextos.js";
import "./CatalogoEncabezado.css";

export default function CatalogoEncabezado({ idGenero, genero }) {
  const textos = useTextos();
  const { encabezado } = textos.paginas.catalogo;
  const descripcion = idGenero ? genero?.descripcion : encabezado.subtitulo;

  return (
    <header className="catalogo-encabezado">
      <h1 className="titular-h1">
        {idGenero ? (
          genero?.nombre
        ) : (
          <>
            {/* Figma: en móvil el título es el texto corto del menú */}
            <span className="titulo-escritorio">{encabezado.titulo}</span>
            <span className="titulo-movil">
              {textos.navbar.enlaces.catalogo}
            </span>
          </>
        )}
      </h1>
      <p className="cuerpo-m">{descripcion}</p>
    </header>
  );
}
