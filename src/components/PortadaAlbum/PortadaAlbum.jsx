import { colorToken } from "../../utils/colores.js";
import "./PortadaAlbum.css";

// Dibuja la portada con portada.patron y portada.colores de la API.
// Patrones: 0 anillos, 1 rayas, 2 colina, 3 puntos.
export default function PortadaAlbum({ portada, className = "" }) {
  const [fondo, figura] = portada.colores.map(colorToken);
  const detalle = "var(--fijo-blanco)";
  return (
    <svg
      className={`portada-album ${className}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <rect width="200" height="200" style={{ fill: fondo }} />
      {portada.patron === 0 && (
        <>
          <circle
            cx="205"
            cy="205"
            r="155"
            strokeWidth="46"
            style={{ fill: "none", stroke: figura }}
          />
          <circle cx="205" cy="205" r="65" style={{ fill: figura }} />
        </>
      )}
      {portada.patron === 1 &&
        Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            d={`M-60 ${i * 48}L260 ${i * 48 - 200}`}
            strokeWidth="23"
            style={{ stroke: figura }}
          />
        ))}
      {portada.patron === 2 && (
        <>
          <circle cx="153" cy="47" r="22" style={{ fill: detalle }} />
          <circle cx="100" cy="174" r="68" style={{ fill: figura }} />
        </>
      )}
      {portada.patron === 3 &&
        Array.from({ length: 9 }, (_, i) => (
          <circle
            key={i}
            cx={45 + (i % 3) * 55}
            cy={45 + Math.floor(i / 3) * 55}
            r="18"
            style={{ fill: i % 2 ? figura : detalle }}
          />
        ))}
    </svg>
  );
}
