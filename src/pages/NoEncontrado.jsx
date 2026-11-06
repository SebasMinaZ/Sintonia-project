import Button from "../components/ui/Button.jsx";
import { usePreferencias } from "../hooks/usePreferencias.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import { interfaz } from "../data/interfaz.js";

export default function NoEncontrado() {
  const { idioma } = usePreferencias();
  const t = interfaz[idioma];
  useTituloPagina(t.noEncontradoTitulo);
  return (
    <section className="ancho-home pagina-no-encontrada">
      <h1>{t.noEncontradoTitulo}</h1>
      <p>{t.noEncontradoDescripcion}</p>
      <Button to="/">{t.irAlInicio}</Button>
    </section>
  );
}
