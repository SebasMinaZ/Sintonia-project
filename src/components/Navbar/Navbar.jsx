import { Link, NavLink } from "react-router";
import Marca from "../Marca/Marca.jsx";
import Button from "../ui/Button.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import { interfaz } from "../../data/interfaz.js";
import "./Navbar.css";
export default function Navbar({ nombre, tipo, idioma, onCambiarIdioma }) {
  const t = interfaz[idioma];
  return (
    <header className="cabecera-home">
      <div className="ancho-home fila-cabecera">
        <Marca nombre={nombre} tipo={tipo} />
        <Link className="ingreso-movil cuerpo-p" to="/ingresar">
          {t.ingresar}
        </Link>
        <MenuMovil
          nombre={nombre}
          tipo={tipo}
          idioma={idioma}
          onCambiarIdioma={onCambiarIdioma}
          textos={t}
        />
        <nav className="menu-home" aria-label={t.navegacion}>
          <NavLink to="/" end>
            {t.inicio}
          </NavLink>
          <NavLink to="/catalogo">{t.catalogo}</NavLink>
          <div className="acciones-home">
            <SelectorIdioma
              idioma={idioma}
              onCambiar={onCambiarIdioma}
              etiqueta={t.idioma}
            />
            <Link className="ingresar-home" to="/ingresar">
              {t.ingresar}
            </Link>
            <Button to="/registro">{t.registro}</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}