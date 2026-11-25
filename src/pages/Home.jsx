import HeroSintonia from "../components/HeroSintonia/HeroSintonia.jsx";
import SeccionAlbumes from "../components/SeccionAlbumes/SeccionAlbumes.jsx";
import SeccionGeneros from "../components/SeccionGeneros/SeccionGeneros.jsx";
import InvitacionRegistro from "../components/InvitacionRegistro/InvitacionRegistro.jsx";
import { useRecurso } from "../hooks/useRecurso.js";
import { useAlbumesDestacados } from "../hooks/useAlbumesDestacados.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import { useTextos } from "../hooks/useTextos.js";

// Figma: el Inicio muestra 8 géneros (4 en móvil, por CSS)
const GENEROS_EN_INICIO = 8;

export default function Home() {
  const { paginas } = useTextos();
  const { seo } = paginas.inicioPublico;
  useTituloPagina(seo.titulo, seo.descripcion);
  const { datos } = useRecurso("/generos");
  const generos = datos?.datos ?? [];
  const { albumes } = useAlbumesDestacados(generos);

  return (
    <>
      <HeroSintonia
        totalGeneros={generos.length}
        portadas={generos.map((genero) => genero.portada)}
      />
      <SeccionAlbumes albumes={albumes} />
      <SeccionGeneros generos={generos.slice(0, GENEROS_EN_INICIO)} />
      <InvitacionRegistro />
    </>
  );
}
