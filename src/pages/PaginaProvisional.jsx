import { useTextos } from "../hooks/useTextos.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";

// Página provisional: solo muestra el título hasta construir la vista real.
export default function PaginaProvisional({ pagina }) {
  const { paginas } = useTextos();
  const encabezados = {
    catalogo: paginas.catalogo.encabezado.titulo,
    ingresar: paginas.ingresar.formulario.titulo,
    registro: paginas.registro.formulario.titulo,
  };
  useTituloPagina(paginas[pagina].seo.titulo);
  return (
    <section className="ancho-home pagina-provisional">
      <h1>{encabezados[pagina]}</h1>
    </section>
  );
}
