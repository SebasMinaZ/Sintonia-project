import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "react-router";
import Marca from "../Marca/Marca.jsx";
import Button from "../ui/Button.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import BotonAccesibilidad from "../BotonAccesibilidad/BotonAccesibilidad.jsx";
import { useSesion } from "../../hooks/useSesion.js";
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
  const { usuario } = useSesion();
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
            {/* Figma: los íconos solo aparecen en el menú con sesión */}
            {usuario && (
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
                <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" />
                <path d="M2.5 8.33322C2.49994 8.09078 2.55278 7.85124 2.65482 7.63132C2.75687 7.4114 2.90566 7.21639 3.09083 7.05989L8.92417 2.06073C9.22499 1.80648 9.60613 1.66699 10 1.66699C10.3939 1.66699 10.775 1.80648 11.0758 2.06073L16.9092 7.05989C17.0943 7.21639 17.2431 7.4114 17.3452 7.63132C17.4472 7.85124 17.5001 8.09078 17.5 8.33322V15.8332C17.5 16.2753 17.3244 16.6992 17.0118 17.0117C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0117C2.67559 16.6992 2.5 16.2753 2.5 15.8332V8.33322Z" />
              </svg>
            )}
            {menuMovil.enlaces.inicio}
          </NavLink>
          <NavLink className="cuerpo-m-fuerte" to="/catalogo">
            {usuario && (
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
            )}
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

        {usuario ? (
          <div className="panel-menu-cuenta">
            <span
              className="panel-menu-avatar cuerpo-p-fuerte"
              aria-hidden="true"
            >
              {usuario.iniciales}
            </span>
            <div className="panel-menu-persona">
              {/* Figma: solo el primer nombre */}
              <span className="cuerpo-m-fuerte">
                {usuario.nombre.split(" ")[0]}
              </span>
              <span className="panel-menu-estado detalle-nota">
                {menuMovil.secciones.cuenta}
              </span>
            </div>
            <Button variante="secundario" onClick={() => setAbierto(false)}>
              {menuMovil.botones.conSesion.cerrarSesion}
            </Button>
          </div>
        ) : (
          <div className="panel-menu-acciones">
            <Button to="/registro" texto="cuerpo-m-fuerte">
              {menuMovil.botones.invitado.crearCuenta}
            </Button>
            <Button
              variante="secundario"
              to="/ingresar"
              texto="cuerpo-m-fuerte"
            >
              {menuMovil.botones.invitado.ingresar}
            </Button>
          </div>
        )}
      </dialog>
    </>
  );
}
