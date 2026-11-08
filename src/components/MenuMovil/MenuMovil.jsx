import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "react-router";
import Marca from "../Marca/Marca.jsx";
import Button from "../ui/Button.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import "./MenuMovil.css";

export default function MenuMovil({
  nombre,
  tipo,
  idioma,
  onCambiarIdioma,
  textos,
}) {
  const [abierto, setAbierto] = useState(false);
  const dialogo = useRef(null);
  const id = useId();

  useEffect(() => {
    const panel = dialogo.current;
    if (abierto && !panel.open) panel.showModal();
    if (!abierto && panel.open) panel.close();
  }, [abierto]);

  return (
    <>
      <button
        type="button"
        className="boton-menu"
        aria-label={textos.abrirMenu}
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
        aria-label={textos.navegacion}
        onClose={() => setAbierto(false)}
      >
        <div className="panel-menu-cabecera">
          <Marca nombre={nombre} tipo={tipo} />
          <button
            type="button"
            className="cerrar-menu"
            aria-label={textos.cerrarMenu}
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

        <nav className="panel-menu-enlaces" aria-label={textos.navegacion}>
          <NavLink className="cuerpo-m-fuerte" to="/" end>
            {textos.inicio}
          </NavLink>
          <NavLink className="cuerpo-m-fuerte" to="/catalogo">
            {textos.catalogo}
          </NavLink>
        </nav>

        <div className="panel-menu-preferencias">
          <span className="cuerpo-m-fuerte" aria-hidden="true">
            {textos.idioma}
          </span>
          <SelectorIdioma
            idioma={idioma}
            onCambiar={onCambiarIdioma}
            etiqueta={textos.idioma}
            texto="cuerpo-m-fuerte"
          />
        </div>

        <div className="panel-menu-acciones">
          <Button to="/registro" texto="cuerpo-m-fuerte">
            {textos.registro}
          </Button>
          <Button variante="secundario" to="/ingresar" texto="cuerpo-m-fuerte">
            {textos.ingresar}
          </Button>
        </div>
      </dialog>
    </>
  );
}
