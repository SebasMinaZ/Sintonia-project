import "./Input.css";

export default function Input({ className = "", ...props }) {
  return <input className={`campo cuerpo-m ${className}`.trim()} {...props} />;
}
