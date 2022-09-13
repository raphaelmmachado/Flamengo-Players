import { Link } from "react-router-dom";
import { useContext } from "react";
//
import { Context } from "../../context/ContextProvider";
import Card from "react-bootstrap/Card";
function PlayerCard({
  name,
  number,
  position,
  pos,
  age,
  ability,
  city,
  state,
  country,
  img,
  poster,
  fullName,
  leg,
  height,
  birth,
  formerTeams,
  arrival,
  contract,
  fanBase,
  valueEuros,
}) {
  const { setShowSubHeader } = useContext(Context);
  return (
    <Link
      onClick={() => setShowSubHeader(false)}
      to={`player/${number}`}
      state={{
        name: name,
        number: number,
        position: position,
        pos: pos,
        age: age,
        ability: ability,
        city: city,
        state: state,
        country: country,
        img: img,
        poster: poster,
        fullName: fullName,
        leg: leg,
        height: height,
        birth: birth,
        formerTeams: formerTeams,
        arrival: arrival,
        contract: contract,
        fanBase: fanBase,
        valueEuros: valueEuros,
      }}
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
