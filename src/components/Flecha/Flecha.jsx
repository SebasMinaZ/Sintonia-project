import "./Flecha.css";
// Ícono oficial public/iconos/arrowR.svg, dentro del JSX para heredar currentColor.
export default function Flecha() {
  return (
    <svg
      className="icono-flecha"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.333 8h9.334M8 3.333 12.667 8 8 12.667" />
    </svg>
  );
}
