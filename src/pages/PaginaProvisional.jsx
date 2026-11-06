import { usePreferencias } from "../hooks/usePreferencias.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import { interfaz } from "../data/interfaz.js";

// Página provisional: solo muestra el título hasta construir la vista real.
export default function PaginaProvisional({ clave, seo }) {
  const { idioma } = usePreferencias();
  const t = interfaz[idioma];
  useTituloPagina(t[seo]);
  return (
    <section className="ancho-home pagina-provisional">
      <h1>{t[clave]}</h1>
    </section>
  );
}
