import "./Label.css";

export default function Label({ className = "", ...props }) {
  return (
    <label
      className={`etiqueta cuerpo-p-fuerte ${className}`.trim()}
      {...props}
    />
  );
}
