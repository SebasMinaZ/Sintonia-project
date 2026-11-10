import "./BotonAccesibilidad.css";
// Botón redondo con el icono de persona (public/iconos/person.svg)
export default function BotonAccesibilidad({
  etiqueta,
  onClick,
  className = "",
  ref,
}) {
  return (
    <button
      ref={ref}
      type="button"
      className={`boton-accesibilidad ${className}`.trim()}
      aria-label={etiqueta}
      aria-haspopup="dialog"
      onClick={onClick}
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
        <path d="M10 5a.83.83 0 1 0 0-1.67A.83.83 0 0 0 10 5Z" />
        <path d="M7.5 16.67 10 11.67l2.5 5" />
        <path d="M5 6.67 10 8.33l5-1.66" />
        <path d="M10 8.33v3.34" />
      </svg>
    </button>
  );
}
