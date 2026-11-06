import { Link } from "react-router";
import "./Button.css";

export default function Button({
  variante = "primario",
  to,
  className = "",
  ...props
}) {
  const clases = `boton boton-${variante} cuerpo-p-fuerte ${className}`.trim();
  if (to) return <Link to={to} className={clases} {...props} />;
  return <button type="button" className={clases} {...props} />;
}
