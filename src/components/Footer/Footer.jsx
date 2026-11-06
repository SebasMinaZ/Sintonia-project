import { Link } from "react-router";
import Marca from "../Marca/Marca.jsx";
import { interfaz } from "../../data/interfaz.js";
import "./Footer.css";
export default function Footer({ nombre, tipo, descripcion, idioma }) {
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
                <Link to="/">{t.inicio}</Link>
              </li>
              <li>
                <Link to="/catalogo">{t.pieCatalogo}</Link>
              </li>
            </ul>
          </div>
          <div className="pie-columna">
            <h2>{t.cuenta}</h2>
            <ul>
              <li>
                <Link to="/ingresar">{t.pieIngresar}</Link>
              </li>
              <li>
                <Link to="/registro">{t.registro}</Link>
              </li>
            </ul>
          </div>
          <div className="pie-columna">
            <h2>{t.legal}</h2>
            <ul>
              <li>
                <Link to="/terminos">{t.terminos}</Link>
              </li>
              <li>
                <Link to="/accesibilidad">{t.accesibilidad}</Link>
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
