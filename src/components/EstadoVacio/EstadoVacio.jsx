import "./EstadoVacio.css";

// "texto" es opcional: el estado vacío genérico solo trae título. Complejidad: O(1).
export default function EstadoVacio({ titulo, texto }) {
  return (
    <div className="estado-vacio">
      <p className="estado-vacio-titulo cuerpo-m-fuerte">{titulo}</p>
      {texto && <p className="estado-vacio-texto cuerpo-p">{texto}</p>}
    </div>
  );
}
