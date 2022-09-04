import Card from "react-bootstrap/Card"
function PlayerCard({ img,state,number,name,age }) {
  return (
    <>
      <Card className="card-box">
        <Card.Img src={img} />
        <div className="patch">
          <img src={state} />
        </div>
        <Card.Body className="card-box-player-name">
          <div id="player-number">{number}</div>
          <Card.Title className="player-title">
            <div>{name}</div>
            <div >
             teste
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}
export { PlayerCard };
