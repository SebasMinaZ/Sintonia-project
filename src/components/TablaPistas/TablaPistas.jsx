import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import { usePreferencias } from "../../hooks/usePreferencias.js";
import { useTextos } from "../../hooks/useTextos.js";
import { formatearDuracion } from "../../utils/formatear.js";
import "./TablaPistas.css";

// Pistas en orden de disco (la API ya las entrega ordenadas).
// El ícono del reloj es public/iconos/clock.svg, dentro del JSX para heredar currentColor.
// Complejidad: O(n) con n = pistas; el formateador de números se crea una sola vez.
export default function TablaPistas({ pistas }) {
  const { etiquetas } = useTextos().paginas.album.tabla;
  const { idioma } = usePreferencias();
  const formatoNumero = new Intl.NumberFormat(idioma);

  return (
    <table className="tabla-pistas">
      <thead className="solo-lectores">
        <tr>
          <th scope="col" className="tabla-pistas-numero detalle-etiqueta">
            {etiquetas.numero}
          </th>
          <th scope="col" className="tabla-pistas-titulo detalle-etiqueta">
            {etiquetas.titulo}
          </th>
          <th
            scope="col"
            className="tabla-pistas-reproducciones detalle-etiqueta"
          >
            {etiquetas.reproducciones}
          </th>
          <th scope="col" className="tabla-pistas-duracion">
            <svg
              viewBox="0 0 14 14"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7.00033 12.8333C10.222 12.8333 12.8337 10.2217 12.8337 6.99999C12.8337 3.77833 10.222 1.16666 7.00033 1.16666C3.77866 1.16666 1.16699 3.77833 1.16699 6.99999C1.16699 10.2217 3.77866 12.8333 7.00033 12.8333Z" />
              <path d="M7 3.5V7L9.33333 8.16667" />
            </svg>
            <span className="solo-lectores">{etiquetas.duracion}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {pistas.map((pista) => (
          <tr key={pista.id}>
            <td className="tabla-pistas-numero cuerpo-p">{pista.numero}</td>
            <td className="tabla-pistas-titulo">
              <div className="tabla-pistas-celda-titulo">
                <PortadaAlbum
                  portada={pista.portada}
                  className="tabla-pistas-portada"
                />
                <span className="tabla-pistas-datos">
                  <span className="cuerpo-m-fuerte">{pista.titulo}</span>
                  <span className="cuerpo-p">{pista.artista.nombre}</span>
                </span>
              </div>
            </td>
            <td className="tabla-pistas-reproducciones cuerpo-p">
              {formatoNumero.format(pista.reproducciones)}
            </td>
            <td className="tabla-pistas-duracion cuerpo-p">
              {formatearDuracion(pista.duracionSeg)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
