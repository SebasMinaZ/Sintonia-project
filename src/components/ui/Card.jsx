import { Link } from "react-router";
import "./Card.css";

export default function Card({ to, className = "", ...props }) {
  const clases = `tarjeta ${to ? "tarjeta-enlace" : ""} ${className}`.trim();
  if (to) return <Link to={to} className={clases} {...props} />;
  return <div className={clases} {...props} />;
}
