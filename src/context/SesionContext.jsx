import { useState } from "react";
import { SesionContext } from "../hooks/useSesion.js";

// Guarda el usuario de la sesión (o null). El token de la API no se guarda.
// Base mínima: la ficha 06 la completa. Complejidad: O(1).
export function SesionProvider({ children }) {
  const [usuario, guardarUsuario] = useState(null);
  return (
    <SesionContext.Provider value={{ usuario, guardarUsuario }}>
      {children}
    </SesionContext.Provider>
  );
}
