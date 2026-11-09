import Button from "../ui/Button.jsx";
import CollagePortadas from "../CollagePortadas/CollagePortadas.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./HeroSintonia.css";
export default function HeroSintonia({ totalGeneros }) {
  const { hero, cifras } = useTextos().paginas.inicioPublico;
  return (
    <section className="ancho-home hero-sintonia">
      <div className="texto-hero">
        <span className="etiqueta-sintonia">{hero.etiquetas.temporada}</span>
        <h1>{hero.titulo}</h1>
        <p>{hero.subtitulo}</p>
        <div className="grupo-botones">
          <Button to="/registro">{hero.botones.crearCuentaGratis}</Button>
          <Button variante="secundario" to="/catalogo">
            {hero.botones.explorarCatalogo}
          </Button>
        </div>
        <dl className="cifras-sintonia">
          <div>
            <dt>{cifras.canciones.valor}</dt>
            <dd>{cifras.canciones.etiqueta}</dd>
          </div>
          <div>
            <dt>{totalGeneros}</dt>
            <dd>{cifras.generos.etiqueta}</dd>
          </div>
          <div>
            <dt>{cifras.cortes.valor}</dt>
            <dd>{cifras.cortes.etiqueta}</dd>
          </div>
        </dl>
      </div>
      <CollagePortadas />
    </section>
  );
}
