import { useState } from "react";
import { usePreferencias } from "../../context/PreferenciasContext.jsx";
import { interfaz } from "../../data/interfaz.js";
import BannerCookies from "../BannerCookies/BannerCookies.jsx";
import "./GestorCookies.css";
export default function GestorCookies() {
  const { idioma, consentimiento, guardarConsentimiento, error } =
    usePreferencias();
  const [mensaje, setMensaje] = useState(false);
  const t = interfaz[idioma];
  function guardar(permitir) {
    if (guardarConsentimiento(permitir)) setMensaje(true);
  }
  return (
    <>
      {!consentimiento && (
        <BannerCookies
          textos={t}
          onAceptar={() => guardar(true)}
          onRechazar={() => guardar(false)}
        />
      )}
      {error && (
        <p className="error-cookies" role="alert">
          {t.error}
        </p>
      )}
      <span className="solo-lectores" role="status">
        {mensaje ? t.guardado : ""}
      </span>
    </>
  );
}