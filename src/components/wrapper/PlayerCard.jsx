import Card from "react-bootstrap/Card";
function PlayerCard({ img, state, number, name, age, pos, position }) {
  return (
    <>
      <Card className="card-box ">
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
          <Card.Title className="player-title">
            {name}
          </Card.Title>
          <Card.Subtitle className="player-subtitle">{position}</Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
}
export { PlayerCard };
