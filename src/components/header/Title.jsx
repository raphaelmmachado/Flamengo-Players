import { Link } from "react-router-dom";
import flamengoBadge from "../../assets/escudos/flamedium.png";

function Title() {
  return (
    <div className="header-title">
      <Link to="/" children={<img src={flamengoBadge} />} />
      <div className="title-text">
        <div id="header-text-1" className="title">
          <h1>CLUBE DE REGATAS</h1>
        </div>
        <div id="header-text-2" className="title">
          <h1>DO FLAMENGO</h1>
        </div>
      </div>
    </div>
  );
}
export { Title };
