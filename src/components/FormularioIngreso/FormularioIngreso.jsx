import { useId, useState } from "react";
import { Link } from "react-router";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Label from "../ui/Label.jsx";
import CampoClave from "../CampoClave/CampoClave.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./FormularioIngreso.css";

// Ícono oficial public/iconos/check.svg, dentro del JSX para heredar currentColor.
// Formulario de ingreso: correo, contraseña, casilla solo visual y enlaces.
// Complejidad: O(1).
export default function FormularioIngreso() {
  const id = useId();
  const { formulario } = useTextos().paginas.ingresar;
  const { etiquetas, placeholders, enlaces, mensajes, botones } = formulario;
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  function enviar(evento) {
    evento.preventDefault();
  }

  return (
    <div className="formulario-ingreso">
      <form className="formulario-ingreso-form" noValidate onSubmit={enviar}>
        <div className="formulario-ingreso-campo">
          <Label htmlFor={`${id}-correo`}>{etiquetas.correo}</Label>
          <Input
            id={`${id}-correo`}
            type="email"
            autoComplete="email"
            placeholder={placeholders.correo}
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
          />
        </div>
        <div className="formulario-ingreso-campo">
          <Label htmlFor={`${id}-clave`}>{etiquetas.clave}</Label>
          <CampoClave
            id={`${id}-clave`}
            autoComplete="current-password"
            value={clave}
            onChange={(evento) => setClave(evento.target.value)}
          />
        </div>
        <div className="formulario-ingreso-opciones">
          <label className="formulario-ingreso-casilla cuerpo-p">
            <input type="checkbox" className="solo-lectores" defaultChecked />
            <span className="formulario-ingreso-marca" aria-hidden="true">
              <svg
                viewBox="0 0 18 18"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 4.5L6.75 12.75L3 9" />
              </svg>
            </span>
            {etiquetas.mantenerSesion}
          </label>
          <Link
            className="formulario-ingreso-enlace cuerpo-p-fuerte"
            to="/recuperar-clave"
          >
            {enlaces.olvidasteClave}
          </Link>
        </div>
        <Button
          type="submit"
          texto="cuerpo-m-fuerte"
          className="formulario-ingreso-boton"
        >
          {botones.ingresar}
        </Button>
      </form>
      <p className="formulario-ingreso-registro cuerpo-p">
        {mensajes.sinCuenta}{" "}
        <Link
          className="formulario-ingreso-enlace cuerpo-p-fuerte"
          to="/registro"
        >
          {enlaces.crearCuenta}
        </Link>
      </p>
    </div>
  );
}
