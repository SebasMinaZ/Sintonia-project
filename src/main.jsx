import "./styles/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { PreferenciasProvider } from "./context/PreferenciasContext.jsx";
import { TextosProvider } from "./context/TextosContext.jsx";
import { consultar } from "./services/api.js";

// Se pide a la vez que /textos, sin esperar a que se pinte la página.
consultar("/generos");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PreferenciasProvider>
        <TextosProvider>
          <App />
        </TextosProvider>
      </PreferenciasProvider>
    </BrowserRouter>
  </StrictMode>,
);
