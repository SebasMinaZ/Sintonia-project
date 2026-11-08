import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { proyecto } from "../../config/proyecto.js";
import { usePreferencias } from "../../hooks/usePreferencias.js";
import { useTextos } from "../../hooks/useTextos.js";
import { useRecurso } from "../../hooks/useRecurso.js";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import SaltarContenido from "../SaltarContenido/SaltarContenido.jsx";
import GestorCookies from "../GestorCookies/GestorCookies.jsx";
import "./LayoutPublico.css";
export default function LayoutPublico() {
  const { idioma, cambiarIdioma } = usePreferencias();

  const textos = useTextos();
  const { datos: respuestaIdiomas } = useRecurso("/idiomas");
  const idiomas = respuestaIdiomas?.datos ?? [];
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`landing ${proyecto.id}`}>
      <SaltarContenido texto={textos.general.aria.saltarAlContenido} />
      <Navbar
        nombre={proyecto.nombre}
        tipo={proyecto.id}
        idioma={idioma}
        idiomas={idiomas}
        onCambiarIdioma={cambiarIdioma}
      />
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer
        nombre={proyecto.nombre}
        tipo={proyecto.id}
        idioma={idioma}
        descripcion={textos.footer.lema}
      />
      <GestorCookies />
    </div>
  );
}
