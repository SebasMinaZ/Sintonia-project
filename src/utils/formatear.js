// Esta funcion sustituye las marcas {clave} de un texto de la API por sus valores.
// Ejemplo: formatear("© {anio} Sintonía", { anio: 2026 }) → "© 2026 Sintonía"
export function formatear(plantilla, valores) {
  return plantilla.replace(/\{(\w+)\}/g, (marca, clave) =>
    clave in valores ? String(valores[clave]) : marca,
  );
}
// Convierte segundos en minutos y segundos: 80 → "1:20"
export function formatearDuracion(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = String(segundos % 60).padStart(2, "0");
  return `${minutos}:${resto}`;
}
