import Button from "../components/ui/Button.jsx";
import { useTextos } from "../hooks/useTextos.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";

export default function NoEncontrado() {
  const { noEncontrado } = useTextos().estados;
  useTituloPagina(noEncontrado.titulo);
  return (
    <section className="ancho-home pagina-no-encontrada">
      <h1>{noEncontrado.titulo}</h1>
      <p>{noEncontrado.descripcion}</p>
      <Button to="/">{noEncontrado.botones.irAlInicio}</Button>
    </section>
  );
}
