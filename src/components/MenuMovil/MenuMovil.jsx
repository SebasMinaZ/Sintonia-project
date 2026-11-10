import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "react-router";
import Marca from "../Marca/Marca.jsx";
import Button from "../ui/Button.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import BotonAccesibilidad from "../BotonAccesibilidad/BotonAccesibilidad.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./MenuMovil.css";

export default function MenuMovil({
  nombre,
  tipo,
  idioma,
  idiomas,
  onCambiarIdioma,
  onAbrirAccesibilidad,
}) {
  const { navbar, menuMovil } = useTextos();
  const [abierto, setAbierto] = useState(false);
  const dialogo = useRef(null);
  const id = useId();

  useEffect(() => {
    const panel = dialogo.current;
    if (abierto && !panel.open) panel.showModal();
    if (!abierto && panel.open) panel.close();
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const escritorio = window.matchMedia("(min-width: 641px)");
    const alCambiar = (evento) => {
      if (evento.matches) setAbierto(false);
    };
    escritorio.addEventListener("change", alCambiar);
    return () => escritorio.removeEventListener("change", alCambiar);
  }, [abierto]);

  return (
    <>
      <button
        type="button"
        className="boton-menu"
        aria-label={menuMovil.abrir}
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto(true)}
      >
        <svg
          viewBox="0 0 20 20"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>

      <dialog
        id={id}
        ref={dialogo}
        className="panel-menu"
        aria-label={menuMovil.aria}
        onClose={() => setAbierto(false)}
        onClick={(evento) => {
          if (evento.target.closest("a")) setAbierto(false);
        }}
      >
        <div className="panel-menu-cabecera">
          <Marca nombre={nombre} tipo={tipo} />
          <button
            type="button"
            className="cerrar-menu"
            aria-label={menuMovil.cerrar}
            onClick={() => setAbierto(false)}
          >
            <svg
              viewBox="0 0 18 18"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M13.5 4.5 4.5 13.5M4.5 4.5l9 9" />
            </svg>
          </button>
        </div>

        <nav className="panel-menu-enlaces" aria-label={navbar.aria.navegacion}>
          <NavLink className="cuerpo-m-fuerte" to="/" end>
            {menuMovil.enlaces.inicio}
          </NavLink>
          <NavLink className="cuerpo-m-fuerte" to="/catalogo">
            {menuMovil.enlaces.catalogo}
          </NavLink>
        </nav>

        <div className="panel-menu-preferencias">
          <span className="cuerpo-m-fuerte" aria-hidden="true">
            {menuMovil.secciones.idioma}
          </span>
          <SelectorIdioma
            idioma={idioma}
            idiomas={idiomas}
            onCambiar={onCambiarIdioma}
            etiqueta={menuMovil.secciones.idioma}
            texto="cuerpo-m-fuerte"
          />
        </div>

        <div className="panel-menu-preferencias panel-menu-accesibilidad">
          <span className="cuerpo-m-fuerte" aria-hidden="true">
            {menuMovil.secciones.accesibilidad}
          </span>
          <BotonAccesibilidad
            etiqueta={navbar.aria.accesibilidad}
            onClick={() => {
              setAbierto(false);
              onAbrirAccesibilidad();
            }}
          />
        </div>

        <div className="panel-menu-acciones">
          <Button to="/registro" texto="cuerpo-m-fuerte">
            {menuMovil.botones.invitado.crearCuenta}
          </Button>
          <Button variante="secundario" to="/ingresar" texto="cuerpo-m-fuerte">
            {menuMovil.botones.invitado.ingresar}
          </Button>
        </div>
      </dialog>
    </>
  );
}
