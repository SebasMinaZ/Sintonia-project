import { createContext, useContext } from "react";

export const SesionContext = createContext(null);

// Lee la sesión del contexto. Complejidad: O(1).
export function useSesion() {
  const valor = useContext(SesionContext);
  if (!valor) throw new Error("SesionProvider requerido");
  return valor;
}
