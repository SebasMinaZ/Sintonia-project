import { Outlet, useNavigate } from "react-router";
import { proyecto } from "../../config/proyecto.js";
import { usePreferencias } from "../../hooks/usePreferencias.js";
import { interfaz } from "../../data/interfaz.js";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import SaltarContenido from "../SaltarContenido/SaltarContenido.jsx";
import GestorCookies from "../GestorCookies/GestorCookies.jsx";
import "./LayoutPublico.css";
export default function LayoutPublico() {
  const { idioma, cambiarIdioma } = usePreferencias();
  const navegar = useNavigate();
  const t = interfaz[idioma];
  function irACuenta(tipo) {
    navegar(tipo === "registro" ? "/registro" : "/ingresar");
  }
  return (
    <div className={`landing ${proyecto.id}`}>
      <SaltarContenido texto={t.saltar} />
      <Navbar
        nombre={proyecto.nombre}
        tipo={proyecto.id}
        idioma={idioma}
        onCambiarIdioma={cambiarIdioma}
      />
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer
        nombre={proyecto.nombre}
        tipo={proyecto.id}
        idioma={idioma}
        descripcion={t.lema}
        destino="/catalogo"
        onCuenta={irACuenta}
      />
      <GestorCookies />
    </div>
  );
}
