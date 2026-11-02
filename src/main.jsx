import "./styles/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import { PreferenciasProvider } from "./context/PreferenciasContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PreferenciasProvider>
      <Home />
    </PreferenciasProvider>
  </StrictMode>,
);
