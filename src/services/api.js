import { proyecto } from "../config/proyecto.js";

const cabecerasSimulacion = [
  ["X-Simular-Latencia", proyecto.simularLatencia],
  ["X-Simular-Error", proyecto.simularError],
];

const simulacionActiva = cabecerasSimulacion.some(([, valor]) => valor);
const cache = new Map(); // ruta -> promesa de la petición GET

function crearCabeceras(ruta, cuerpo) {
  const cabeceras = { Accept: "application/json" };
  if (cuerpo) cabeceras["Content-Type"] = "application/json";
  if (ruta.startsWith("/textos") || ruta.startsWith("/idiomas")) {
    return cabeceras;
  }
  for (const [nombre, valor] of cabecerasSimulacion) {
    if (valor) cabeceras[nombre] = valor;
  }
  return cabeceras;
}

function crearErrorRespuesta(respuesta, datos) {
  const detalle = datos.error ?? {};
  const error = new Error(detalle.mensaje || `HTTP ${respuesta.status}`);
  error.codigo = detalle.codigo;
  error.campos = detalle.campos;
  error.estado = respuesta.status;
  error.reintentarEn = Number(respuesta.headers.get("Retry-After")) || 0;
  return error;
}

async function pedir(ruta, { signal, metodo = "GET", cuerpo } = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`${proyecto.api}${ruta}`, {
      signal,
      method: metodo,
      headers: crearCabeceras(ruta, cuerpo),
      body: cuerpo && JSON.stringify(cuerpo),
    });
  } catch (fallo) {
    if (!(fallo instanceof TypeError)) throw fallo;
    const error = new Error(fallo.message);
    error.sinRed = true;
    throw error;
  }
  if (respuesta.status === 204) return null;
  const datos = await respuesta.json();
  if (!respuesta.ok) throw crearErrorRespuesta(respuesta, datos);
  return datos;
}

// Las peticiones GET se piden una sola vez por ruta: quien llega después
// recibe la misma promesa. Si falla, se borra para que «Reintentar» la repita.
// La petición compartida no usa el signal de un solo llamador. Las rutas de
// /sesion nunca se guardan: su respuesta cambia al ingresar o salir. O(1).
export function consultar(ruta, opciones = {}) {
  if (opciones.metodo && opciones.metodo !== "GET")
    return pedir(ruta, opciones);
  if (simulacionActiva || ruta.startsWith("/sesion"))
    return pedir(ruta, opciones);
  if (!cache.has(ruta)) {
    const peticion = pedir(ruta);
    peticion.catch(() => cache.delete(ruta));
    cache.set(ruta, peticion);
  }
  return cache.get(ruta);
}
