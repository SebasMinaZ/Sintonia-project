import { Routes, Route } from "react-router";
import LayoutPublico from "./components/LayoutPublico/LayoutPublico.jsx";
import Home from "./pages/Home.jsx";
import PaginaProvisional from "./pages/PaginaProvisional.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutPublico />}>
        <Route index element={<Home />} />
        <Route
          path="catalogo"
          element={<PaginaProvisional pagina="catalogo" />}
        />
        <Route
          path="ingresar"
          element={<PaginaProvisional pagina="ingresar" />}
        />
        <Route
          path="registro"
          element={<PaginaProvisional pagina="registro" />}
        />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
