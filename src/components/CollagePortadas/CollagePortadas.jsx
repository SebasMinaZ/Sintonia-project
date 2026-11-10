import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import "./CollagePortadas.css";
const POSICIONES = ["album-principal", "album-superior", "album-inferior"];
// Ilustración del Hero: las portadas de los tres primeros géneros de la API
export default function CollagePortadas({ portadas }) {
  return (
    <div className="collage-sintonia" aria-hidden="true">
      {portadas.slice(0, 3).map((portada, i) => (
        <PortadaAlbum
          key={POSICIONES[i]}
          portada={portada}
          className={POSICIONES[i]}
        />
      ))}
      <div className="nota-sintonia">
        <b className="titular-h4">
          Sube la niebla
          <br />
          por la montaña
        </b>
        <span className="cuerpo-p">y el camino canta</span>
      </div>
    </div>
  );
}
