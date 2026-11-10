import HeroSintonia from "../components/HeroSintonia/HeroSintonia.jsx";
import SeccionAlbumes from "../components/SeccionAlbumes/SeccionAlbumes.jsx";
import SeccionGeneros from "../components/SeccionGeneros/SeccionGeneros.jsx";
import InvitacionRegistro from "../components/InvitacionRegistro/InvitacionRegistro.jsx";
import PortadaAlbum from "../components/PortadaAlbum/PortadaAlbum.jsx";
import DialogoDetalle from "../components/DialogoDetalle/DialogoDetalle.jsx";
import { useDetalle } from "../hooks/useDetalle.js";
import { useRecurso } from "../hooks/useRecurso.js";
import { useAlbumesDestacados } from "../hooks/useAlbumesDestacados.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import { useTextos } from "../hooks/useTextos.js";

// Figma: el Inicio muestra 8 géneros (4 en móvil, por CSS)
const GENEROS_EN_INICIO = 8;

export default function Home() {
  const { paginas } = useTextos();
  useTituloPagina(paginas.inicioPublico.seo.titulo);
  const { datos } = useRecurso("/generos");
  const generos = datos?.datos ?? [];
  const albumes = useAlbumesDestacados(generos);
  const { detalle, setDetalle } = useDetalle();

  function abrirAlbum(album) {
    setDetalle({
      titulo: album.titulo,
      descripcion: `${album.artista.nombre} · ${album.genero}`,
      contenido: <PortadaAlbum portada={album.portada} />,
    });
  }

  return (
    <>
      <HeroSintonia
        totalGeneros={generos.length}
        portadas={generos.map((genero) => genero.portada)}
      />
      <SeccionAlbumes albumes={albumes} onSeleccionar={abrirAlbum} />
      <SeccionGeneros generos={generos.slice(0, GENEROS_EN_INICIO)} />
      <InvitacionRegistro />
      <DialogoDetalle detalle={detalle} onCerrar={() => setDetalle(null)} />
    </>
  );
}
