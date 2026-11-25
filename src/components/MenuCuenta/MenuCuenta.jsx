import { useEffect, useId, useRef, useState } from "react";
import { useSesion } from "../../hooks/useSesion.js";
import { useTextos } from "../../hooks/useTextos.js";
import "./MenuCuenta.css";

// Avatar con las iniciales que abre el menú de la cuenta (solo con sesión).
// Se cierra con Escape o con un clic fuera. Complejidad: O(1).
export default function MenuCuenta() {
  const { navbar } = useTextos();
  const { usuario } = useSesion();
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef(null);
  const boton = useRef(null);
  const id = useId();

  // Al cerrar, el foco vuelve al botón; si el clic fue en otro control, ese
  // control conserva el foco. Complejidad: O(1) por evento.
  useEffect(() => {
    if (!abierto) return;
    const alPulsarTecla = (evento) => {
      if (evento.key !== "Escape") return;
      setAbierto(false);
      boton.current.focus();
    };
    const alHacerClic = (evento) => {
      if (contenedor.current.contains(evento.target)) return;
      setAbierto(false);
      const foco = document.activeElement;
      if (foco === document.body || contenedor.current.contains(foco)) {
        boton.current.focus();
      }
    };
    document.addEventListener("keydown", alPulsarTecla);
    document.addEventListener("click", alHacerClic);
    return () => {
      document.removeEventListener("keydown", alPulsarTecla);
      document.removeEventListener("click", alHacerClic);
    };
  }, [abierto]);

  return (
    <div className="menu-cuenta" ref={contenedor}>
      <button
        ref={boton}
        type="button"
        className="menu-cuenta-avatar cuerpo-p-fuerte"
        aria-label={navbar.usuario.menu}
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto(!abierto)}
      >
        {usuario.iniciales}
      </button>
      <div id={id} className="menu-cuenta-panel" hidden={!abierto}>
        <div className="menu-cuenta-datos">
          <span
            className="menu-cuenta-avatar cuerpo-p-fuerte"
            aria-hidden="true"
          >
            {usuario.iniciales}
          </span>
          <div className="menu-cuenta-persona">
            <p className="cuerpo-p-fuerte">{usuario.nombre}</p>
            <p className="menu-cuenta-correo detalle-nota">{usuario.correo}</p>
          </div>
        </div>
        <button
          type="button"
          className="menu-cuenta-salir cuerpo-p-fuerte"
          onClick={() => {
            setAbierto(false);
            boton.current.focus();
          }}
        >
          <svg
            viewBox="0 0 18 18"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75" />
            <path d="M12 12.75L15.75 9L12 5.25" />
            <path d="M15.75 9H6.75" />
          </svg>
          {navbar.usuario.cerrarSesion}
        </button>
      </div>
    </div>
  );
}
