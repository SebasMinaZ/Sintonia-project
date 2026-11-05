import { usePreferencias } from "../hooks/usePreferencias.js";
import { interfaz } from "../data/interfaz.js";

// Página provisional: solo muestra el título hasta construir la vista real.
export default function PaginaProvisional({ clave }) {
  const { idioma } = usePreferencias();
  return (
    <section className="ancho-home pagina-provisional">
      <h1>{interfaz[idioma][clave]}</h1>
    </section>
  );
}
