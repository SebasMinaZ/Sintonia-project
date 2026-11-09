// Esta funcion sustituye las marcas {clave} de un texto de la API por sus valores.
// Ejemplo: formatear("© {anio} Sintonía", { anio: 2026 }) → "© 2026 Sintonía"
export function formatear(plantilla, valores) {
  return plantilla.replace(/\{(\w+)\}/g, (marca, clave) =>
    clave in valores ? String(valores[clave]) : marca,
  );
}
