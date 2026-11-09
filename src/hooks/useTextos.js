import { createContext, useContext } from "react";

export const TextosContext = createContext(null);

export function useTextos() {
  const valor = useContext(TextosContext);
  if (!valor) throw new Error("TextosProvider requerido");
  return valor;
}
