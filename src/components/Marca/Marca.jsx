import { Link } from "react-router";
import { useTextos } from "../../hooks/useTextos.js";
import "./Marca.css";
export default function Marca({ nombre, tipo }) {
  const textos = useTextos();
  return (
    <Link
      className="marca-home titular-h3"
      to="/"
      aria-label={textos.navbar.logo.aria}
    >
      <span className={`emblema emblema-${tipo}`} aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <path
            d="M8 13v7m5-12v17m6-14v11m5-8v5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {nombre}
    </Link>
  );
}
