import { useState } from "react";
import { usePreferencias } from "../../hooks/usePreferencias.js";
import { useTextos } from "../../hooks/useTextos.js";
import BannerCookies from "../BannerCookies/BannerCookies.jsx";
import "./GestorCookies.css";
export default function GestorCookies() {
  const { consentimiento, guardarConsentimiento, error } = usePreferencias();
  const { errores, general } = useTextos();
  const [mensaje, setMensaje] = useState(false);
  function guardar(permitir) {
    if (guardarConsentimiento(permitir)) setMensaje(true);
  }
  return (
    <>
      {!consentimiento && (
        <BannerCookies
          onAceptar={() => guardar(true)}
          onRechazar={() => guardar(false)}
        />
      )}
      {error && (
        <p className="error-cookies cuerpo-p" role="alert">
          {errores.generico}
        </p>
      )}
      <span className="solo-lectores" role="status">
        {mensaje ? general.etiquetas.guardado : ""}
      </span>
    </>
  );
}
