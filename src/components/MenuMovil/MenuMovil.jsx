import "./MenuMovil.css";
export default function MenuMovil({
  abierto,
  onAlternar,
  menuId,
  botonRef,
  textos,
}) {
  return (
    <button
      type="button"
      ref={botonRef}
      className="boton-menu"
      aria-label={abierto ? textos.cerrarMenu : textos.abrirMenu}
      aria-expanded={abierto}
      aria-controls={menuId}
      onClick={onAlternar}
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
        <path
          d={
            abierto
              ? "M14.5 5.5 5.5 14.5M5.5 5.5l9 9"
              : "M3 5h14M3 10h14M3 15h14"
          }
        />
      </svg>
    </button>
  );
}
