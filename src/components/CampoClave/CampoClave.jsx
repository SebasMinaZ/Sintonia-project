import { useState } from "react";
import Input from "../ui/Input.jsx";
import IconoOjo from "../IconoOjo/IconoOjo.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./CampoClave.css";

// Input de contraseña con un botón que la muestra u oculta. Recibe las props
// del Input (id, value, onChange, ref, aria-*). Complejidad: O(1).
export default function CampoClave(props) {
  const [visible, setVisible] = useState(false);
  const { mostrarClave, ocultarClave } =
    useTextos().paginas.ingresar.formulario.botones;
  return (
    <div className="campo-clave">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className="campo-clave-input"
      />
      <button
        type="button"
        className="campo-clave-ojo"
        aria-label={visible ? ocultarClave : mostrarClave}
        aria-pressed={visible}
        onClick={() => setVisible((actual) => !actual)}
      >
        <IconoOjo tachado={visible} />
      </button>
    </div>
  );
}
