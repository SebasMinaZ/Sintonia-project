import Button from "../ui/Button.jsx";
import { useTextos } from "../../hooks/useTextos.js";
import "./InvitacionRegistro.css";
export default function InvitacionRegistro() {
  const { cta } = useTextos().paginas.inicioPublico;
  return (
    <section className="ancho-home registro-sintonia">
      <div>
        <h2 className="titular-h1">{cta.titulo}</h2>
        <p className="cuerpo-m">{cta.texto}</p>
      </div>
      <Button variante="oscuro" to="/registro" texto="cuerpo-m-fuerte">
        {cta.botones.crearCuentaGratis}
      </Button>
    </section>
  );
}
