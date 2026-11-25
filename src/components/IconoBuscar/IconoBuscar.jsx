import "./IconoBuscar.css";
// Ícono oficial public/iconos/search.svg, dentro del JSX para heredar currentColor.
// Complejidad: O(1).
export default function IconoBuscar() {
  return (
    <svg
      className="icono-buscar"
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
  );
}
