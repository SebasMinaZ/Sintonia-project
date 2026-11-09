import Button from "../ui/Button.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./BannerCookies.css";
export default function BannerCookies({ onAceptar, onRechazar }) {
  const { banner } = useTextos().cookies;
  return (
    <aside className="banner-cookies" aria-labelledby="banner-cookies-titulo">
      <div className="banner-cookies-texto">
        <h2 id="banner-cookies-titulo">{banner.titulo}</h2>
        <p>{banner.texto}</p>
      </div>
      <div className="grupo-botones">
        <Button variante="secundario" onClick={onRechazar}>
          {banner.botones.rechazar}
        </Button>
        <Button onClick={onAceptar}>{banner.botones.aceptar}</Button>
      </div>
    </aside>
  );
}
