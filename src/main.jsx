import "./styles/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { PreferenciasProvider } from "./context/PreferenciasContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PreferenciasProvider>
        <App />
      </PreferenciasProvider>
    </BrowserRouter>
  </StrictMode>,
);