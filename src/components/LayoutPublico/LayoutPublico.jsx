import { proyecto } from "../../config/proyecto.js";
import { usePreferencias } from "../../hooks/usePreferencias.js";
import { interfaz } from "../../data/interfaz.js";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import SaltarContenido from "../SaltarContenido/SaltarContenido.jsx";
import GestorCookies from "../GestorCookies/GestorCookies.jsx";
import "./LayoutPublico.css";
export default function LayoutPublico({
  destino,
  etiqueta,
  descripcion,
  onCuenta,
  children,
}) {
  const { idioma, cambiarIdioma } = usePreferencias();
  return (
    <div className={`landing ${proyecto.id}`}>
      <SaltarContenido texto={interfaz[idioma].saltar} />
      <Navbar
        nombre={proyecto.nombre}
        tipo={proyecto.id}
        idioma={idioma}
        onCambiarIdioma={cambiarIdioma}
        destino={destino}
        etiqueta={etiqueta}
        onCuenta={onCuenta}
      />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <Footer
        nombre={proyecto.nombre}
        tipo={proyecto.id}
        idioma={idioma}
        descripcion={descripcion}
        destino={destino}
        onCuenta={onCuenta}
      />
      <GestorCookies />
    </div>
  );
}
