import Card from "react-bootstrap/Card"
function PlayerCard({ img,state,number,name,age,pos }) {
  return (
    <>
      <Card className="card-box " >
        <Card.Img src={img} />
        <div className="patch">
          <img src={state} />
        </div>
        <Card.Body className="card-box-player-name">
          <div id="player-number">{number}</div>
          <Card.Title className="player-title">
            <h2 id="player-name">{name}</h2>
            <h5>{pos}</h5>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}
export { PlayerCard };
