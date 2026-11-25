import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { SesionContext } from "../hooks/useSesion.js";
import { consultar } from "../services/api.js";

// Guarda el usuario de la sesión (o null), la comprueba y la cierra. La sesión
// viaja en la cookie httpOnly: el token de la API no se guarda.
export function SesionProvider({ children }) {
  const [usuario, mostrarUsuario] = useState(null);
  const ultimoUsuario = useRef(null);
  const cambios = useRef(0);
  // navigate cambia con cada ruta: se guarda en una ref para que la
  // comprobación no se repita al navegar.
  const navegar = useNavigate();
  const refNavegar = useRef(navegar);

  useEffect(() => {
    refNavegar.current = navegar;
  }, [navegar]);

  // Complejidad: O(1).
  const guardarUsuario = useCallback((nuevo) => {
    cambios.current += 1;
    ultimoUsuario.current = nuevo;
    mostrarUsuario(nuevo);
  }, []);

  // Pregunta GET /sesion. Si mientras tanto se ingresó o se salió, la respuesta
  // ya es vieja y se ignora. Si había usuario y la sesión venció, lleva al
  // ingreso; un visitante se queda donde está. Complejidad: O(1).
  const comprobarSesion = useCallback(() => {
    const alPedir = cambios.current;
    consultar("/sesion").then(
      (datos) => {
        if (alPedir === cambios.current) guardarUsuario(datos);
      },
      (error) => {
        if (alPedir !== cambios.current) return;
        if (error.codigo !== "no_autenticado") return;
        const habiaUsuario = ultimoUsuario.current !== null;
        guardarUsuario(null);
        if (habiaUsuario) refNavegar.current("/ingresar");
      },
    );
  }, [guardarUsuario]);

  // Comprueba al cargar (sin bloquear el pintado) y al volver a la pestaña.
  // Complejidad: O(1).
  useEffect(() => {
    comprobarSesion();
    const alCambiarVisibilidad = () => {
      if (document.visibilityState === "visible") comprobarSesion();
    };
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    return () =>
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
  }, [comprobarSesion]);

  // DELETE /sesion y vuelta al inicio. Un 401 significa que ya estaba cerrada;
  // con cualquier otro error la sesión se mantiene. Complejidad: O(1).
  async function cerrarSesion() {
    try {
      await consultar("/sesion", { metodo: "DELETE" });
    } catch (error) {
      if (error.codigo !== "no_autenticado") return;
    }
    guardarUsuario(null);
    refNavegar.current("/");
  }

  return (
    <SesionContext.Provider value={{ usuario, guardarUsuario, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
}
