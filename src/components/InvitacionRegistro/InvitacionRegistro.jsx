import Button from "../ui/Button.jsx";
import "./InvitacionRegistro.css";
export default function InvitacionRegistro({ en }) {
  return (
    <section className="ancho-home registro-sintonia">
      <div>
        <h2>
          {en
            ? "Your next favourite song is one click away"
            : "Tu próxima canción favorita está a un clic"}
        </h2>
        <p>
          {en
            ? "Sign up free with your email. Works in your browser."
            : "Crea tu cuenta gratis con tu correo. Funciona en el navegador."}
        </p>
      </div>
      <Button variante="oscuro" to="/registro">
        {en ? "Sign up free" : "Crear cuenta gratis"}
      </Button>
    </section>
  );
}
