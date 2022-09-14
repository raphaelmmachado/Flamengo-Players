import { Link } from "react-router-dom";
import { useContext } from "react";
//
import { Context } from "../../context/ContextProvider";
import Card from "react-bootstrap/Card";
function PlayerCard({
  name,
  number,
  position,
  state,
  img,
}) {
  const { setShowSubHeader } = useContext(Context);
  return (
    <Link
      onClick={() => setShowSubHeader(false)}
      to={`player/${number}`}
    >
      <Card className="card-box">
        <Card.Img src={img} />
        <div className="patch">
          <img src={state} />
        </div>
        <Card.Body
          className="card-body
          d-flex flex-column justify-content-center
          align-items-center"
        >
          <div id="player-number">{number}</div>
          <Card.Title className="player-title">{name}</Card.Title>
          <Card.Subtitle className="player-subtitle">{position}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
  );
}
export { PlayerCard };
