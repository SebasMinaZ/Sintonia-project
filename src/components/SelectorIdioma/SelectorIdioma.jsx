import "./SelectorIdioma.css";
export default function SelectorIdioma({
  idioma,
  onCambiar,
  etiqueta,
  deshabilitado = false,
}) {
  return (
    <div className="idiomas-home" role="group" aria-label={etiqueta}>
      {["es", "en"].map((valor) => (
        <button
          type="button"
          key={valor}
          lang={valor}
          className="detalle-nota-fuerte"
          aria-pressed={idioma === valor}
          disabled={deshabilitado}
          onClick={() => onCambiar(valor)}
        >
          {valor.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
