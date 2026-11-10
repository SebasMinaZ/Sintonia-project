// La API nombra los colores como tokens de Figma ("portada/3", "fijo/negro", "fondo/sutil").
// Se convierten en la variable CSS correspondiente: "portada/3" → var(--portada-3).
export function colorToken(referencia) {
  return `var(--${referencia.replace("/", "-")})`;
}
