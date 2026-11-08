import "./SelectorIdioma.css";
export default function SelectorIdioma({
  idioma,
  idiomas,
  onCambiar,
  etiqueta,
  texto = "detalle-nota-fuerte",
  deshabilitado = false,
}) {
  if (idiomas.length === 0) return null;
  return (
    <div className="idiomas-home" role="group" aria-label={etiqueta}>
      {idiomas.map(({ codigo, nombre }) => (
        // Aqui, aplico destructuring... Saco sus propiedades directamente
        <button
          type="button"
          key={codigo}
          lang={codigo}
          className={texto}
          aria-label={nombre}
          aria-pressed={idioma === codigo}
          disabled={deshabilitado}
          onClick={() => onCambiar(codigo)}
        >
          {codigo.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
