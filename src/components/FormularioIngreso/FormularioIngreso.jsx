import { useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import AvisoFormulario from "../AvisoFormulario/AvisoFormulario.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Label from "../ui/Label.jsx";
import CampoClave from "../CampoClave/CampoClave.jsx";
import { useSesion } from "../../hooks/useSesion.js";
import { useTextos } from "../../hooks/useTextos.js";
import { consultar } from "../../services/api.js";
import "./FormularioIngreso.css";

// Ícono oficial public/iconos/check.svg, dentro del JSX para heredar
// currentColor.
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
  const [enviando, setEnviando] = useState(false);
  const [faltan, setFaltan] = useState({ correo: false, clave: false });
  const refCorreo = useRef(null);
  const refClave = useRef(null);
  const idErrorCorreo = `${id}-correo-error`;
  const idErrorClave = `${id}-clave-error`;

  // Si falta un dato, lo marca y manda el foco al primer campo con error.
  // Si no falta ninguno, envía los datos. Complejidad: O(1).
  async function enviar(evento) {
    evento.preventDefault();
    if (enviando) return;
    const sinDatos = { correo: !correo.trim(), clave: !clave };
    setFaltan(sinDatos);
    if (sinDatos.correo) return refCorreo.current.focus();
    if (sinDatos.clave) return refClave.current.focus();
    setEnviando(true);
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
      setEnviando(false);
    }
  }

  return (
    <div className="formulario-ingreso">
      <form className="formulario-ingreso-form" noValidate onSubmit={enviar}>
        {(faltan.correo || faltan.clave) && (
          <AvisoFormulario
            titulo={errores.camposObligatorios.titulo}
            texto={errores.camposObligatorios.texto}
          />
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
          disabled={enviando}
          aria-busy={enviando}
        >
          {enviando ? mensajes.ingresando : botones.ingresar}
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
