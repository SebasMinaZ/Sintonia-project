import LayoutPublico from "../components/LayoutPublico/LayoutPublico.jsx";
import HeroSintonia from "../components/HeroSintonia/HeroSintonia.jsx";
import SeccionAlbumes from "../components/SeccionAlbumes/SeccionAlbumes.jsx";
import SeccionGeneros from "../components/SeccionGeneros/SeccionGeneros.jsx";
import InvitacionRegistro from "../components/InvitacionRegistro/InvitacionRegistro.jsx";
import PortadaAlbum from "../components/PortadaAlbum/PortadaAlbum.jsx";
import DialogoDetalle from "../components/DialogoDetalle/DialogoDetalle.jsx";
import { usePreferencias } from "../hooks/usePreferencias.js";
import { useDetalle } from "../hooks/useDetalle.js";
import { useCatalogo } from "../hooks/useCatalogo.js";
import { albumes, generos } from "../data/catalogo.js";

export default function Home() {
  const { idioma } = usePreferencias();
  const en = idioma === "en";
  const { detalle, setDetalle, abrirCuenta } = useDetalle(idioma);
  const { genero, setGenero, visibles, filtrar } = useCatalogo(albumes);
  function abrirAlbum(album) {
    setDetalle({
      titulo: album.nombre,
      descripcion: `${album.artista} · ${album.genero}`,
      contenido: <PortadaAlbum variante={album.arte} />,
      cerrar: en ? "Close" : "Cerrar",
    });
  }
  return (
    <LayoutPublico
      destino="#generos"
      etiqueta={en ? "Catalogue" : "Catálogo"}
      descripcion={
        en
          ? "Albums and artists of every genre, in one place."
          : "Álbumes y artistas de todos los géneros, en un solo lugar."
      }
      onCuenta={abrirCuenta}
    >
      <HeroSintonia
        en={en}
        abrirCuenta={abrirCuenta}
        totalGeneros={generos.length}
      />
      <SeccionAlbumes
        visibles={visibles}
        genero={genero}
        en={en}
        setGenero={setGenero}
        onSeleccionar={abrirAlbum}
      />
      <SeccionGeneros
        generos={generos}
        genero={genero}
        en={en}
        setGenero={setGenero}
        filtrar={filtrar}
      />
      <InvitacionRegistro en={en} abrirCuenta={abrirCuenta} />
      <DialogoDetalle detalle={detalle} onCerrar={() => setDetalle(null)} />
    </LayoutPublico>
  );
}
