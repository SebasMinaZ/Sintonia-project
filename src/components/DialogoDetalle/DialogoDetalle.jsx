import Button from "../ui/Button";
import { useEffect, useRef, useId } from "react";
import { useTextos } from "../../hooks/useTextos.js";
import "./DialogoDetalle.css";
export default function DialogoDetalle({ detalle, onCerrar }) {
  const dialogo = useRef(null);
  const id = useId();
  const { general } = useTextos();
  useEffect(() => {
    if (detalle && !dialogo.current.open) dialogo.current.showModal();
    if (!detalle && dialogo.current.open) dialogo.current.close();
  }, [detalle]);
  return (
    <dialog
      className="detalle-home"
      ref={dialogo}
      onClose={onCerrar}
      aria-labelledby={id}
    >
      <button
        className="cerrar-detalle"
        aria-label={general.aria.cerrarDialogo}
        onClick={() => dialogo.current.close()}
      >
        ×
      </button>
      <h2 id={id}>{detalle?.titulo}</h2>
      <p>{detalle?.descripcion}</p>
      {detalle?.contenido}
      <Button onClick={() => dialogo.current.close()}>
        {general.acciones.cerrar}
      </Button>
    </dialog>
  );
}
