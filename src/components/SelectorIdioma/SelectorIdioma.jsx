import "./SelectorIdioma.css";
export default function SelectorIdioma({
  idioma,
  onCambiar,
  etiqueta,
  texto = "detalle-nota-fuerte",
  deshabilitado = false,
}) {
  return (
    <div className="idiomas-home" role="group" aria-label={etiqueta}>
      {["es", "en"].map((valor) => (
        <button
          type="button"
          key={valor}
          lang={valor}
          className={texto}
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
