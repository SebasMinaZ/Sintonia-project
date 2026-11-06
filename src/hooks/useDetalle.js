import { useState } from "react";
export function useDetalle() {
  const [detalle, setDetalle] = useState(null);
  return { detalle, setDetalle };
}
