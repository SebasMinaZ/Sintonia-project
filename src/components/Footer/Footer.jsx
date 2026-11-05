import Marca from "../Marca/Marca.jsx";
import { interfaz } from "../../data/interfaz.js";
import "./Footer.css";
export default function Footer({
  nombre,
  tipo,
  descripcion,
  destino,
  onCuenta,
  idioma,
}) {
  const t = interfaz[idioma];
  return (
    <footer className="pie-home">
      <div className="ancho-home">
        <div className="columnas-pie">
          <div className="pie-marca">
            <Marca nombre={nombre} tipo={tipo} />
            <p>{descripcion}</p>
          </div>
          <div className="pie-columna">
            <h2>{t.explora}</h2>
            <ul>
              <li>
                <a href="#contenido">{t.inicio}</a>
              </li>
              <li>
                <a href={destino}>{t.pieCatalogo}</a>
              </li>
            </ul>
          </div>
          <div className="pie-columna">
            <h2>{t.cuenta}</h2>
            <ul>
              <li>
                <button type="button" onClick={() => onCuenta("ingresar")}>
                  {t.pieIngresar}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onCuenta("registro")}>
                  {t.registro}
                </button>
              </li>
            </ul>
          </div>
          <div className="pie-columna">
            <h2>{t.legal}</h2>
            <ul>
              <li>
                <a href="/terminos">{t.terminos}</a>
              </li>
              <li>
                <a href="/accesibilidad">{t.accesibilidad}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pie-creditos">
          <p>{t.derechos}</p>
          <p>{t.notaAudio}</p>
        </div>
      </div>
    </footer>
  );
}
