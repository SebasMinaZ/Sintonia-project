import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-interior">
        
        {/* GRUPO IZQUIERDO: Logo y Enlaces */}
        <div className="navbar-grupo-izquierda">
          <a href="/" className="navbar-logo">
            <img src="/logos/logo.svg" alt="Sintonía" className="navbar-marca" />
          </a>

          <ul className="navbar-enlaces">
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/catalogo">Catálogo</a>
            </li>
          </ul>
        </div>

        {/* GRUPO DERECHO: Idioma, Ingresar y Crear Cuenta */}
        <div className="navbar-grupo-derecha">
          <div className="navbar-idioma">
            <button type="button">ES</button>
            <button type="button">EN</button>
          </div>

          <div className="navbar-autenticacion">
            <a className="navbar-ingresar" href="/login">
              Ingresar
            </a>
            <a className="navbar-registro" href="/registro">
              Crear cuenta
            </a>
          </div>
        </div>

      </nav>
    </header>
  );
}