import Button from "../ui/Button.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./InvitacionRegistro.css";
export default function InvitacionRegistro() {
  const { cta } = useTextos().paginas.inicioPublico;
  return (
    <section className="ancho-home registro-sintonia">
      <div>
        <h2>{cta.titulo}</h2>
        <p>{cta.texto}</p>
      </div>
      <Button variante="oscuro" to="/registro">
        {cta.botones.crearCuentaGratis}
      </Button>
    </section>
  );
}