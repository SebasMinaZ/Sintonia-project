import "./IconoOjo.css";

// Íconos oficiales public/iconos/eye.svg y eyeOff.svg (exportados de Figma),
// dentro del JSX para heredar currentColor. Complejidad: O(1).
export default function IconoOjo({ tachado = false }) {
  return (
    <svg
      className="icono-ojo"
      viewBox="0 0 36 36"
      width="36"
      height="36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {tachado ? (
        <>
          <path d="M10.5 10.5L25.5 25.5" />
          <path d="M16.8334 12.25C17.22 12.1967 17.6097 12.1688 18 12.1666C23.3334 12.1666 26.3334 18 26.3334 18C25.6186 19.2646 24.7199 20.4161 23.6667 21.4166" />
          <path d="M13.5 13.5C11.1666 15 9.66663 18 9.66663 18C9.66663 18 12.6666 23.8333 18 23.8333C19.5967 23.8292 21.1587 23.3664 22.5 22.5" />
          <path d="M16.25 16.25C15.8889 16.7314 15.7136 17.3269 15.7563 17.9272C15.799 18.5275 16.0567 19.0922 16.4822 19.5178C16.9078 19.9433 17.4725 20.2011 18.0728 20.2437C18.6731 20.2864 19.2686 20.1111 19.75 19.75" />
        </>
      ) : (
        <>
          <path d="M9.66663 18.0001C9.66663 18.0001 12.6666 12.1667 18 12.1667C23.3333 12.1667 26.3333 18.0001 26.3333 18.0001C26.3333 18.0001 23.3333 23.8334 18 23.8334C12.6666 23.8334 9.66663 18.0001 9.66663 18.0001Z" />
          <path d="M20.5 18C20.5 19.3807 19.3807 20.5 18 20.5C16.6193 20.5 15.5 19.3807 15.5 18C15.5 16.6193 16.6193 15.5 18 15.5C19.3807 15.5 20.5 16.6193 20.5 18Z" />
        </>
      )}
    </svg>
  );
}
