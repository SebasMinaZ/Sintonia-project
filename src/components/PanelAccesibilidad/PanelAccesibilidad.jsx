import { useEffect, useId, useRef } from "react";
import { Link } from "react-router";
import { useTextos } from "../../hooks/useTextos.js";
import {
  TAMANO,
  useAjustesAccesibilidad,
} from "../../hooks/useAjustesAccesibilidad.js";
import { formatear } from "../../utils/formatear.js";
import "./PanelAccesibilidad.css";

// Cada interruptor: clave del ajuste y clave de sus textos en la API
const INTERRUPTORES = [
  ["contraste", "altoContraste"],
  ["movimiento", "reducirMovimiento"],
  ["subrayar", "subrayarEnlaces"],
  ["espaciado", "espaciado"],
];

export default function PanelAccesibilidad({ abierto, onCerrar }) {
  const { accesibilidad: t } = useTextos();
  const { ajustes, cambiar, restablecer } = useAjustesAccesibilidad();
  const dialogo = useRef(null);
  const id = useId();

  // Igual que el menú móvil: el estado de React abre y cierra el <dialog>
  useEffect(() => {
    const panel = dialogo.current;
    if (abierto && !panel.open) panel.showModal();
    if (!abierto && panel.open) panel.close();
  }, [abierto]);

  const tamano = ajustes.tamano;

  return (
    <dialog
      ref={dialogo}
      className="panel-accesibilidad"
      aria-labelledby={`${id}-titulo`}
      onClose={onCerrar}
    >
      <div className="panel-accesibilidad-cabecera">
        <h2 id={`${id}-titulo`} className="titular-h3">
          {t.titulo}
        </h2>
        <button
          type="button"
          className="cerrar-accesibilidad"
          aria-label={t.aria.cerrar}
          onClick={onCerrar}
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

      <p id={`${id}-tamano`} className="cuerpo-m-fuerte">
        {t.tamanoTexto.etiqueta}
      </p>
      <div
        className="control-tamano"
        role="group"
        aria-labelledby={`${id}-tamano`}
      >
        <button
          type="button"
          aria-label={t.tamanoTexto.reducir}
          disabled={tamano <= TAMANO.minimo}
          onClick={() => cambiar("tamano", tamano - TAMANO.paso)}
        >
          −
        </button>
        <output className="cuerpo-m-fuerte" aria-live="polite">
          {formatear(t.tamanoTexto.valor, { valor: tamano })}
        </output>
        <button
          type="button"
          aria-label={t.tamanoTexto.aumentar}
          disabled={tamano >= TAMANO.maximo}
          onClick={() => cambiar("tamano", tamano + TAMANO.paso)}
        >
          +
        </button>
      </div>

      <ul className="lista-interruptores">
        {INTERRUPTORES.map(([clave, textos]) => (
          <li key={clave}>
            <span>
              <span id={`${id}-${clave}`} className="cuerpo-m-fuerte">
                {t[textos].etiqueta}
              </span>
              <span id={`${id}-${clave}-ayuda`} className="cuerpo-m">
                {t[textos].ayuda}
              </span>
            </span>
            <button
              type="button"
              role="switch"
              className="interruptor"
              aria-checked={ajustes[clave]}
              aria-labelledby={`${id}-${clave}`}
              aria-describedby={`${id}-${clave}-ayuda`}
              onClick={() => cambiar(clave, !ajustes[clave])}
            />
          </li>
        ))}
      </ul>

      <p className="cuerpo-p nota-accesibilidad">{t.mensajes.nota}</p>

      <div className="pie-accesibilidad">
        {/* Página del sprint 2: por ahora lleva a "No encontrado" */}
        <Link
          className="cuerpo-m-fuerte"
          to="/accesibilidad"
          onClick={onCerrar}
        >
          {t.enlaces.declaracion}
        </Link>
        <button
          type="button"
          className="boton-restablecer cuerpo-m-fuerte"
          onClick={restablecer}
        >
          {t.botones.restablecer}
        </button>
      </div>
    </dialog>
  );
}
