import "./BannerCookies.css";
export default function BannerCookies({ textos, onAceptar, onRechazar }) {
  return (
    <aside className="banner-cookies" aria-labelledby="banner-cookies-titulo">
      <div className="banner-cookies-texto">
        <h2 id="banner-cookies-titulo">{textos.banner}</h2>
        <p>{textos.descripcion}</p>
      </div>
      <div className="grupo-botones">
        <button
          type="button"
          className="boton-home secundario"
          onClick={onRechazar}
        >
          {textos.rechazar}
        </button>
        <button
          type="button"
          className="boton-home primario"
          onClick={onAceptar}
        >
          {textos.aceptar}
        </button>
      </div>
    </aside>
  );
}
