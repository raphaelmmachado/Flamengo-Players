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
          <Card.Title className="player-title d-flex justify-content between align-center">
            <h4 id="player-name" className="text-center">{name}</h4>
          </Card.Title> 
        </Card.Body>
      </Card>
    </>
  );
}
export { PlayerCard };
