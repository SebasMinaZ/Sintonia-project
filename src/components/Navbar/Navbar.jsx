import { useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import Marca from "../Marca/Marca.jsx";
import Button from "../ui/Button.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import BotonAccesibilidad from "../BotonAccesibilidad/BotonAccesibilidad.jsx";
import PanelAccesibilidad from "../PanelAccesibilidad/PanelAccesibilidad.jsx";
import MenuCuenta from "../MenuCuenta/MenuCuenta.jsx";
import { useSesion } from "../../hooks/useSesion.js";
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
  const { usuario } = useSesion();
  // Un solo panel, que se abre desde el Navbar o desde el menú móvil
  const [accesibilidad, setAccesibilidad] = useState(false);
  const botonAccesibilidad = useRef(null);
  return (
    <header className="cabecera-home">
      <div className="ancho-home fila-cabecera">
        <Marca nombre={nombre} tipo={tipo} />
        {usuario ? (
          <Link
            className="buscar-movil"
            to="/buscar"
            aria-label={navbar.buscador.placeholder}
          >
            <svg
              viewBox="0 0 20 20"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" />
              <path d="M17.5001 17.5001L13.9167 13.9167" />
            </svg>
          </Link>
        ) : (
          <Link className="ingreso-movil cuerpo-p-fuerte" to="/ingresar">
            {navbar.botones.invitado.ingresar}
          </Link>
        )}
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
              ref={botonAccesibilidad}
              etiqueta={navbar.aria.accesibilidad}
              onClick={() => setAccesibilidad(true)}
            />
            <SelectorIdioma
              idioma={idioma}
              idiomas={idiomas}
              onCambiar={onCambiarIdioma}
              etiqueta={navbar.aria.idioma}
            />
            {usuario ? (
              <MenuCuenta />
            ) : (
              <>
                <Link className="ingresar-home cuerpo-p-fuerte" to="/ingresar">
                  {navbar.botones.invitado.ingresar}
                </Link>
                <Button to="/registro">
                  {navbar.botones.invitado.crearCuenta}
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
      <PanelAccesibilidad
        abierto={accesibilidad}
        ancla={botonAccesibilidad}
        onCerrar={() => setAccesibilidad(false)}
      />
    </header>
  );
}
