import "./AvisoFormulario.css";

// Aviso de un formulario (errores de campos, credenciales, conexión…).
// Se anuncia a lectores de pantalla con role="alert"; si hay título, el texto
// lleva aria-live="off" para que una cuenta regresiva no se repita cada segundo.
// Ícono oficial public/iconos/alert.svg, dentro del JSX para heredar
// currentColor. Complejidad: O(1).
export default function AvisoFormulario({ titulo, texto }) {
  return (
    <div className="aviso-formulario" role="alert">
      <svg
        className="aviso-formulario-icono"
        viewBox="0 0 18 18"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" />
        <path d="M9 6V9" />
        <path d="M9 12H9.0075" />
      </svg>
      <div className="aviso-formulario-contenido">
        {titulo && (
          <p className="aviso-formulario-titulo cuerpo-p-fuerte">{titulo}</p>
        )}
        <p
          className="aviso-formulario-texto cuerpo-p"
          aria-live={titulo ? "off" : undefined}
        >
          {texto}
        </p>
      </div>
    </div>
  );
}
