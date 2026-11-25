import Button from "../ui/Button.jsx";
import "./EstadoError.css";

// Ícono oficial public/iconos/alert.svg, dentro del JSX para heredar currentColor.
// Complejidad: O(1).
export default function EstadoError({
  titulo,
  descripcion,
  textoBoton,
  onReintentar,
}) {
  return (
    <div className="estado-error">
      <div className="estado-error-aviso" role="alert">
        <svg
          className="estado-error-icono"
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
        <div className="estado-error-contenido">
          <p className="estado-error-titulo cuerpo-p-fuerte">{titulo}</p>
          <p className="estado-error-descripcion cuerpo-p">{descripcion}</p>
        </div>
      </div>
      <Button
        className="estado-error-boton"
        texto="cuerpo-m-fuerte"
        onClick={onReintentar}
      >
        {textoBoton}
      </Button>
    </div>
  );
}
