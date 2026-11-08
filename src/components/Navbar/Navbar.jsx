import Button from "../ui/Button.jsx";
import { useId, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import Marca from "../Marca/Marca.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import { interfaz } from "../../data/interfaz.js";
import "./Navbar.css";
export default function Navbar({ nombre, tipo, idioma, onCambiarIdioma }) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef(null);
  const id = useId();
  const t = interfaz[idioma];
  return (
    <header
      className="cabecera-home"
      onKeyDown={(evento) => {
        if (evento.key === "Escape" && abierto) {
          setAbierto(false);
          boton.current?.focus();
        }
      }}
    >
      <div className="ancho-home fila-cabecera">
        <Marca nombre={nombre} tipo={tipo} />
        <Link className="ingreso-movil cuerpo-p" to="/ingresar">
          {t.ingresar}
        </Link>
        <MenuMovil
          abierto={abierto}
          onAlternar={() => setAbierto(!abierto)}
          menuId={id}
          botonRef={boton}
          textos={t}
        />
        <nav
          id={id}
          className={`menu-home ${abierto ? "abierto" : ""}`}
          aria-label={t.navegacion}
        >
          <NavLink to="/" end onClick={() => setAbierto(false)}>
            {t.inicio}
          </NavLink>
          <NavLink to="/catalogo" onClick={() => setAbierto(false)}>
            {t.catalogo}
          </NavLink>
          <div className="acciones-home">
            <SelectorIdioma
              idioma={idioma}
              onCambiar={onCambiarIdioma}
              etiqueta={t.idioma}
            />
            <Link
              className="ingresar-home"
              to="/ingresar"
              onClick={() => setAbierto(false)}
            >
              {t.ingresar}
            </Link>
            <Button to="/registro" onClick={() => setAbierto(false)}>
              {t.registro}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
