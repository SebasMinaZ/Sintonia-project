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
            <p className="cuerpo-p">{footer.lema}</p>
          </div>
          <div className="pie-columna">
            <h2 className="detalle-etiqueta">{explora.titulo}</h2>
            <ul>
              <li>
                <Link className="cuerpo-p" to="/">
                  {explora.enlaces.inicio}
                </Link>
              </li>
              <li>
                <Link className="cuerpo-p" to="/catalogo">
                  {explora.enlaces.catalogo}
                </Link>
              </li>
            </ul>
          </div>
          <div className="pie-columna">
            <h2 className="detalle-etiqueta">{cuenta.titulo}</h2>
            <ul>
              <li>
                <Link className="cuerpo-p" to="/ingresar">
                  {cuenta.enlaces.ingresar}
                </Link>
              </li>
              <li>
                <Link className="cuerpo-p" to="/registro">
                  {cuenta.enlaces.crearCuenta}
                </Link>
              </li>
            </ul>
          </div>
          <div className="pie-columna">
            <h2 className="detalle-etiqueta">{legal.titulo}</h2>
            <ul>
              <li>
                <Link className="cuerpo-p" to="/terminos">
                  {legal.enlaces.terminos}
                </Link>
              </li>
              <li>
                <Link className="cuerpo-p" to="/accesibilidad">
                  {legal.enlaces.accesibilidad}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pie-creditos">
          <p className="detalle-nota">
            {formatear(footer.legal.derechos, {
              anio: new Date().getFullYear(),
            })}
          </p>
          <p className="detalle-nota">{footer.legal.nota}</p>
        </div>
      </div>
    </footer>
  );
}
