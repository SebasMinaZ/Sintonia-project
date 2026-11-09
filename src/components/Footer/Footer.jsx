import { Link } from "react-router";
import Marca from "../Marca/Marca.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import { formatear } from "../../utils/formatear.js";
import "./Footer.css";
export default function Footer({ nombre, tipo }) {
  const { footer } = useTextos();
  const { explora, cuenta, legal } = footer.columnas;
  return (
    <footer className="pie-home">
      <div className="ancho-home">
        <div className="columnas-pie">
          <div className="pie-marca">
            <Marca nombre={nombre} tipo={tipo} />
            <p>{footer.lema}</p>
          </div>
          <div className="pie-columna">
            <h2>{explora.titulo}</h2>
            <ul>
              <li>
                <Link to="/">{explora.enlaces.inicio}</Link>
              </li>
              <li>
                <Link to="/catalogo">{explora.enlaces.catalogo}</Link>
              </li>
            </ul>
          </div>
          <div className="pie-columna">
            <h2>{cuenta.titulo}</h2>
            <ul>
              <li>
                <Link to="/ingresar">{cuenta.enlaces.ingresar}</Link>
              </li>
              <li>
                <Link to="/registro">{cuenta.enlaces.crearCuenta}</Link>
              </li>
            </ul>
          </div>
          <div className="pie-columna">
            <h2>{legal.titulo}</h2>
            <ul>
              <li>
                <Link to="/terminos">{legal.enlaces.terminos}</Link>
              </li>
              <li>
                <Link to="/accesibilidad">{legal.enlaces.accesibilidad}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pie-creditos">
          <p>
            {formatear(footer.legal.derechos, {
              anio: new Date().getFullYear(),
            })}
          </p>
          <p>{footer.legal.nota}</p>
        </div>
      </div>
    </footer>
  );
}
