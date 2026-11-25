import "./IconoOjo.css";

// Íconos oficiales public/iconos/eye.svg y eyeOff.svg, dentro del JSX para
// heredar currentColor. Complejidad: O(1).
export default function IconoOjo({ tachado = false }) {
  return (
    <svg
      className="icono-ojo"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {tachado ? (
        <>
          <path d="M4.5 4.5L19.5 19.5" />
          <path d="M10.833 6.25C11.22 6.197 11.61 6.169 12 6.167C17.333 6.167 20.333 12 20.333 12C19.619 13.265 18.72 14.416 17.667 15.417" />
          <path d="M7.5 7.5C5.167 9 3.667 12 3.667 12C3.667 12 6.667 17.833 12 17.833C13.597 17.829 15.159 17.366 16.5 16.5" />
          <path d="M10.25 10.25C9.889 10.731 9.714 11.327 9.756 11.927C9.799 12.527 10.057 13.092 10.482 13.518C10.908 13.943 11.473 14.201 12.073 14.244C12.673 14.286 13.269 14.111 13.75 13.75" />
        </>
      ) : (
        <>
          <path d="M3.667 12C3.667 12 6.667 6.167 12 6.167C17.333 6.167 20.333 12 20.333 12C20.333 12 17.333 17.833 12 17.833C6.667 17.833 3.667 12 3.667 12Z" />
          <path d="M14.5 12C14.5 13.381 13.381 14.5 12 14.5C10.619 14.5 9.5 13.381 9.5 12C9.5 10.619 10.619 9.5 12 9.5C13.381 9.5 14.5 10.619 14.5 12Z" />
        </>
      )}
    </svg>
  );
}
