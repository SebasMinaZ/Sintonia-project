import { useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Label from "../ui/Label.jsx";
import CampoClave from "../CampoClave/CampoClave.jsx";
import { useSesion } from "../../hooks/useSesion.js";
import { useTextos } from "../../hooks/useTextos.js";
import { consultar } from "../../services/api.js";
import "./FormularioIngreso.css";

// Íconos oficiales public/iconos/alert.svg y check.svg, dentro del JSX para
// heredar currentColor.
// Formulario de ingreso: valida en el cliente, envía POST /sesion y, si entra,
// guarda el usuario y vuelve al inicio. Complejidad: O(1).
export default function FormularioIngreso() {
  const id = useId();
  const navegar = useNavigate();
  const { guardarUsuario } = useSesion();
  const { formulario, errores } = useTextos().paginas.ingresar;
  const { etiquetas, placeholders, enlaces, mensajes, botones } = formulario;
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [faltan, setFaltan] = useState({ correo: false, clave: false });
  const refCorreo = useRef(null);
  const refClave = useRef(null);
  const idErrorCorreo = `${id}-correo-error`;
  const idErrorClave = `${id}-clave-error`;

  // Si falta un dato, lo marca y manda el foco al primer campo con error.
  // Si no falta ninguno, envía los datos. Complejidad: O(1).
  async function enviar(evento) {
    evento.preventDefault();
    const sinDatos = { correo: !correo.trim(), clave: !clave };
    setFaltan(sinDatos);
    if (sinDatos.correo) return refCorreo.current.focus();
    if (sinDatos.clave) return refClave.current.focus();
    try {
      const respuesta = await consultar("/sesion", {
        metodo: "POST",
        cuerpo: { correo: correo.trim(), clave },
      });
      guardarUsuario(respuesta.usuario);
      navegar("/");
    } catch (error) {
      // Provisional: la ficha 05 lo reemplaza con los errores de la API.
      console.error(error);
    }
  }

  return (
    <div className="formulario-ingreso">
      <form className="formulario-ingreso-form" noValidate onSubmit={enviar}>
        {(faltan.correo || faltan.clave) && (
          <div className="formulario-ingreso-aviso" role="alert">
            <svg
              className="formulario-ingreso-aviso-icono"
              viewBox="0 0 18 18"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" />
              <path d="M9 6V9" />
              <path d="M9 12H9.0075" />
            </svg>
            <div className="formulario-ingreso-aviso-contenido">
              <p className="formulario-ingreso-aviso-titulo cuerpo-p-fuerte">
                {errores.camposObligatorios.titulo}
              </p>
              <p className="formulario-ingreso-aviso-texto cuerpo-p">
                {errores.camposObligatorios.texto}
              </p>
            </div>
          </div>
        )}
        <div className="formulario-ingreso-campo">
          <Label htmlFor={`${id}-correo`}>{etiquetas.correo}</Label>
          <Input
            ref={refCorreo}
            id={`${id}-correo`}
            type="email"
            autoComplete="email"
            placeholder={placeholders.correo}
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
            aria-invalid={faltan.correo || undefined}
            aria-describedby={faltan.correo ? idErrorCorreo : undefined}
          />
          {faltan.correo && (
            <p
              id={idErrorCorreo}
              className="formulario-ingreso-error detalle-nota"
            >
              {errores.correoObligatorio}
            </p>
          )}
        </div>
        <div className="formulario-ingreso-campo">
          <Label htmlFor={`${id}-clave`}>{etiquetas.clave}</Label>
          <CampoClave
            ref={refClave}
            id={`${id}-clave`}
            autoComplete="current-password"
            value={clave}
            onChange={(evento) => setClave(evento.target.value)}
            aria-invalid={faltan.clave || undefined}
            aria-describedby={faltan.clave ? idErrorClave : undefined}
          />
          {faltan.clave && (
            <p
              id={idErrorClave}
              className="formulario-ingreso-error detalle-nota"
            >
              {errores.claveObligatoria}
            </p>
          )}
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
