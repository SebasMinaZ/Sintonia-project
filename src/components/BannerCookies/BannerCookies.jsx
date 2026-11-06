import Button from "../ui/Button.jsx";
import "./BannerCookies.css";
export default function BannerCookies({ textos, onAceptar, onRechazar }) {
  return (
    <aside className="banner-cookies" aria-labelledby="banner-cookies-titulo">
      <div className="banner-cookies-texto">
        <h2 id="banner-cookies-titulo">{textos.banner}</h2>
        <p>{textos.descripcion}</p>
      </div>
      <div className="grupo-botones">
        <Button variante="secundario" onClick={onRechazar}>
          {textos.rechazar}
        </Button>
        <Button onClick={onAceptar}>{textos.aceptar}</Button>
      </div>
    </aside>
  );
}
