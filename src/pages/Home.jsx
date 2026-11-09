import HeroSintonia from "../components/HeroSintonia/HeroSintonia.jsx";
import SeccionAlbumes from "../components/SeccionAlbumes/SeccionAlbumes.jsx";
import SeccionGeneros from "../components/SeccionGeneros/SeccionGeneros.jsx";
import InvitacionRegistro from "../components/InvitacionRegistro/InvitacionRegistro.jsx";
import PortadaAlbum from "../components/PortadaAlbum/PortadaAlbum.jsx";
import DialogoDetalle from "../components/DialogoDetalle/DialogoDetalle.jsx";
import { useDetalle } from "../hooks/useDetalle.js";
import { useCatalogo } from "../hooks/useCatalogo.js";
import { albumes, generos } from "../data/catalogo.js";
import { useTituloPagina } from "../hooks/useTituloPagina.js";
import { useTextos } from "../hooks/useTextos.js";

export default function Home() {
  const { paginas } = useTextos();
  useTituloPagina(paginas.inicioPublico.seo.titulo);
  const { detalle, setDetalle } = useDetalle();
  const { genero, setGenero, visibles, filtrar } = useCatalogo(albumes);
  function abrirAlbum(album) {
    setDetalle({
      titulo: album.nombre,
      descripcion: `${album.artista} · ${album.genero}`,
      contenido: <PortadaAlbum variante={album.arte} />,
    });
  }
  return (
    <>
      <HeroSintonia totalGeneros={generos.length} />
      <SeccionAlbumes
        visibles={visibles}
        genero={genero}
        setGenero={setGenero}
        onSeleccionar={abrirAlbum}
      />
      <SeccionGeneros generos={generos} genero={genero} filtrar={filtrar} />
      <InvitacionRegistro />
      <DialogoDetalle detalle={detalle} onCerrar={() => setDetalle(null)} />
    </>
  );
}