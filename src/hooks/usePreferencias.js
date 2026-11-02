import { createContext, useContext } from "react";

export const PreferenciasContext = createContext(null);

export function usePreferencias() {
  const valor = useContext(PreferenciasContext);
  if (!valor) throw new Error("PreferenciasProvider requerido");
  return valor;
}