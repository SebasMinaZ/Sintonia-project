import { useState } from "react";
import { Link, NavLink } from "react-router";
import Marca from "../Marca/Marca.jsx";
import Button from "../ui/Button.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import BotonAccesibilidad from "../BotonAccesibilidad/BotonAccesibilidad.jsx";
import PanelAccesibilidad from "../PanelAccesibilidad/PanelAccesibilidad.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./Navbar.css";
export default function Navbar({
  nombre,
  tipo,
  idioma,
  idiomas,
  onCambiarIdioma,
}) {
  const { navbar } = useTextos();
  // Un solo panel, que se abre desde el Navbar o desde el menú móvil
  const [accesibilidad, setAccesibilidad] = useState(false);
  return (
    <header className="cabecera-home">
      <div className="ancho-home fila-cabecera">
        <Marca nombre={nombre} tipo={tipo} />
        <Link className="ingreso-movil cuerpo-p-fuerte" to="/ingresar">
          {navbar.botones.invitado.ingresar}
        </Link>
        <MenuMovil
          nombre={nombre}
          tipo={tipo}
          idioma={idioma}
          idiomas={idiomas}
          onCambiarIdioma={onCambiarIdioma}
          onAbrirAccesibilidad={() => setAccesibilidad(true)}
        />
        <nav className="menu-home" aria-label={navbar.aria.navegacion}>
          <NavLink className="cuerpo-p-fuerte" to="/" end>
            {navbar.enlaces.inicio}
          </NavLink>
          <NavLink className="cuerpo-p-fuerte" to="/catalogo">
            {navbar.enlaces.catalogo}
          </NavLink>
          <div className="acciones-home">
            <BotonAccesibilidad
              etiqueta={navbar.aria.accesibilidad}
              onClick={() => setAccesibilidad(true)}
            />
            <SelectorIdioma
              idioma={idioma}
              idiomas={idiomas}
              onCambiar={onCambiarIdioma}
              etiqueta={navbar.aria.idioma}
            />
            <Link className="ingresar-home cuerpo-p-fuerte" to="/ingresar">
              {navbar.botones.invitado.ingresar}
            </Link>
            <Button to="/registro">
              {navbar.botones.invitado.crearCuenta}
            </Button>
          </div>
        </nav>
      </div>
      <PanelAccesibilidad
        abierto={accesibilidad}
        onCerrar={() => setAccesibilidad(false)}
      />
    </header>
  );
}
