import "./BannerCookies.css";
export default function BannerCookies({ textos, onAceptar, onRechazar }) {
  return (
    <aside className="banner-cookies" aria-label={textos.banner}>
      <h2>{textos.banner}</h2>
      <p>{textos.descripcion}</p>
      <div className="grupo-botones">
        <button className="boton-home primario" onClick={onAceptar}>
          {textos.aceptar}
        </button>
        <button className="boton-home secundario" onClick={onRechazar}>
          {textos.rechazar}
        </button>
      </div>
    </aside>
  );
}
