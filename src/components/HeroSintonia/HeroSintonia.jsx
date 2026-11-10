import Button from "../ui/Button.jsx";
import CollagePortadas from "../CollagePortadas/CollagePortadas.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./HeroSintonia.css";
export default function HeroSintonia({ totalGeneros, portadas }) {
  const { hero, cifras } = useTextos().paginas.inicioPublico;
  return (
    <section className="ancho-home hero-sintonia">
      <div className="texto-hero">
        <span className="etiqueta-sintonia detalle-nota-fuerte">
          {hero.etiquetas.temporada}
        </span>
        <h1 className="titular-gigante">{hero.titulo}</h1>
        <p className="cuerpo-g">{hero.subtitulo}</p>
        <div className="grupo-botones">
          <Button texto="cuerpo-m-fuerte" to="/registro">
            {hero.botones.crearCuentaGratis}
          </Button>
          <Button texto="cuerpo-m-fuerte" variante="secundario" to="/catalogo">
            {hero.botones.explorarCatalogo}
          </Button>
        </div>
        <dl className="cifras-sintonia">
          <div>
            <dt className="dato-cifra">{cifras.canciones.valor}</dt>
            <dd className="detalle-nota">{cifras.canciones.etiqueta}</dd>
          </div>
          {totalGeneros > 0 && (
            <div>
              <dt className="dato-cifra">{totalGeneros}</dt>
              <dd className="detalle-nota">{cifras.generos.etiqueta}</dd>
            </div>
          )}
          <div>
            <dt className="dato-cifra">{cifras.cortes.valor}</dt>
            <dd className="detalle-nota">{cifras.cortes.etiqueta}</dd>
          </div>
        </dl>
      </div>
      <CollagePortadas portadas={portadas} />
    </section>
  );
}
