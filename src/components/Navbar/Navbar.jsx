import { Link, NavLink } from "react-router";
import Marca from "../Marca/Marca.jsx";
import Button from "../ui/Button.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./Navbar.css";
export default function Navbar({
  nombre,
  tipo,
  idioma,
  idiomas,
  onCambiarIdioma,
}) {
  const { navbar } = useTextos();
  return (
    <header className="cabecera-home">
      <div className="ancho-home fila-cabecera">
        <Marca nombre={nombre} tipo={tipo} />
        <Link className="ingreso-movil cuerpo-p-fuerte" to="/ingresar">
          {navbar.botones.invitado.ingresar}
        </Link>
        <MenuMovil
          nombre={nombre}
          tipo={tipo}
          idioma={idioma}
          idiomas={idiomas}
          onCambiarIdioma={onCambiarIdioma}
        />
        <nav className="menu-home" aria-label={navbar.aria.navegacion}>
          <NavLink className="cuerpo-p-fuerte" to="/" end>
            {navbar.enlaces.inicio}
          </NavLink>
          <NavLink className="cuerpo-p-fuerte" to="/catalogo">
            {navbar.enlaces.catalogo}
          </NavLink>
          <div className="acciones-home">
            <SelectorIdioma
              idioma={idioma}
              idiomas={idiomas}
              onCambiar={onCambiarIdioma}
              etiqueta={navbar.aria.idioma}
            />
            <Link className="ingresar-home cuerpo-p-fuerte" to="/ingresar">
              {navbar.botones.invitado.ingresar}
            </Link>
            <Button to="/registro">
              {navbar.botones.invitado.crearCuenta}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
