import { Routes, Route } from "react-router";
import LayoutPublico from "./components/LayoutPublico/LayoutPublico.jsx";
import Home from "./pages/Home.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import PaginaProvisional from "./pages/PaginaProvisional.jsx";
import Ingresar from "./pages/Ingresar.jsx";
import DetalleAlbum from "./pages/DetalleAlbum.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";

export default function App() {
  return (
    <Routes>
      {/* Figma: el ingreso es una página completa, sin navbar ni footer */}
      <Route path="ingresar" element={<Ingresar />} />
      <Route element={<LayoutPublico />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="albumes/:id" element={<DetalleAlbum />} />
        <Route
          path="registro"
          element={<PaginaProvisional pagina="registro" />}
        />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
