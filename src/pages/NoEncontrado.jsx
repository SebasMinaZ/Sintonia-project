import Button from "../components/ui/Button.jsx";
import { useTextos } from "../hooks/useTextos.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";

// Sin props muestra el «no encontrado» genérico; con props, el de una vista concreta.
export default function NoEncontrado({
  titulo,
  descripcion,
  textoBoton,
  destino = "/",
}) {
  const { noEncontrado } = useTextos().estados;
  const tituloFinal = titulo ?? noEncontrado.titulo;
  useTituloPagina(tituloFinal);
  return (
    <section className="ancho-home pagina-no-encontrada">
      <h1>{tituloFinal}</h1>
      <p>{descripcion ?? noEncontrado.descripcion}</p>
      <Button to={destino}>
        {textoBoton ?? noEncontrado.botones.irAlInicio}
      </Button>
    </section>
  );
}
