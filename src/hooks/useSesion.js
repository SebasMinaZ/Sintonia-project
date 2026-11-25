import { createContext, useContext } from "react";

export const SesionContext = createContext(null);

export function useSesion() {
  const valor = useContext(SesionContext);
  if (!valor) throw new Error("SesionProvider requerido");
  return valor;
}
