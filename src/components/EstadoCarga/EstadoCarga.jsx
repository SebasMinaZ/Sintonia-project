import "./EstadoCarga.css";

// Esqueletos con la forma de las tarjetas que reemplazan: "genero" o "album".
// "className" reutiliza la cuadrícula de la vista. Complejidad: O(cantidad).
export default function EstadoCarga({
  etiqueta,
  forma,
  cantidad,
  className = "",
}) {
  const esqueletos = Array.from({ length: cantidad }, (_, indice) => (
    <span
      key={indice}
      className={`estado-carga-esqueleto estado-carga-${forma}`}
      aria-hidden="true"
    >
      {forma === "album" && (
        <>
          <span className="estado-carga-portada" />
          <span className="estado-carga-linea" />
          <span className="estado-carga-linea estado-carga-linea-corta" />
        </>
      )}
    </span>
  ));

  return (
    <div
      className={`estado-carga ${className}`.trim()}
      role="status"
      aria-busy="true"
    >
      <span className="solo-lectores">{etiqueta}</span>
      {esqueletos}
    </div>
  );
}
