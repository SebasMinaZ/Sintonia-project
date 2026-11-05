import { Routes, Route } from "react-router";
import LayoutPublico from "./components/LayoutPublico/LayoutPublico.jsx";
import Home from "./pages/Home.jsx";
import PaginaProvisional from "./pages/PaginaProvisional.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutPublico />}>
        <Route index element={<Home />} />
        <Route
          path="catalogo"
          element={<PaginaProvisional clave="pieCatalogo" />}
        />
        <Route
          path="ingresar"
          element={<PaginaProvisional clave="ingresar" />}
        />
        <Route
          path="registro"
          element={<PaginaProvisional clave="registro" />}
        />
      </Route>
    </Routes>
  );
}
