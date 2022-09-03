import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState } from "react";
import { squad } from "../../data/players";

function Separator() {
  const attackersArray = squad.filter(
    (player) =>
      player.position === "Atacante" ||
      player.position === "Ponta Direita" ||
      player.position === "Ponta Esquerda"
  );
  const midFieldersArray = squad.filter(
    (player) =>
      player.position === "Meio-Campo" ||
      player.position === "Meio-Defensivo" ||
      player.position === "Meio-Ofensivo"
  );
  const sideBacksArray = squad.filter(
    (player) =>
      player.position === "Lateral Direito" ||
      player.position === "Lateral Esquerdo"
  );
  const defendersArray = squad.filter(
    (player) => player.position === "Zagueiro"
  );
  const goalKeepersArray = squad.filter(
    (player) => player.position === "Goleiro"
  );
  const coachArray = squad.filter((player) => player.position === "Treinador");

  const [attackers, setAttackers] = useState(attackersArray);
  const [midFielders, setMidFielders] = useState(midFieldersArray);
  const [sideBacks, setSideBacks] = useState(sideBacksArray);
  const [defenders, setDefenders] = useState(defendersArray);
  const [goalKeepers, setGoalKeepers] = useState(goalKeepersArray);
  const [coach, setCoach] = useState(coachArray);
  return (
    <>
      <div className="separator d-flex justify-content-center align-center">
        <div><h3 style={{ textAlign: "center" }}>A T A C A N T E S</h3></div>
      </div>
      <Row>
        {attackers.map((player) => {
          return (
            <Col
              lg={true}
              md={6}
              className="mb-2 mt-2 d-flex justify-content-center align-center"
            >
              <Card className="card-box" key={player.name}>
                <Card.Img src={player.img} />
                <div className="patch">
                  <img src={player.state} />
                </div>
                <Card.Body className="card-box-player-name">
                  <div id="player-number">{player.number}</div>
                  <Card.Title className="player-title">
                    <div>{player.name}</div>
                    <div className="overall">
                      <div id="ovr">{"Idade"}</div>
                      <div>{player.age}</div>
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>M E I O - C A M P O S</h3>
      </div>
      <Row>
        {midFielders.map((player) => {
          return (
            <Col
              lg={true}
              md={6}
              className="mb-2 mt-2 d-flex justify-content-center align-center"
            >
              <Card className="card-box" key={player.name}>
                <Card.Img src={player.img} />
                <div className="patch">
                  <img src={player.state} />
                </div>
                <Card.Body className="card-box-player-name">
                  <div id="player-number">{player.number}</div>
                  <Card.Title className="player-title">
                    <div>{player.name}</div>
                    <div className="overall">
                      <div id="ovr">{"Idade"}</div>
                      <div>{player.age}</div>
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex  justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>L A T E R A I S</h3>
      </div>
      <Row>
        {sideBacks.map((player) => {
          return (
            <Col
              lg={true}
              md={6}
              className="mb-2 mt-2 d-flex justify-content-center align-center"
            >
              <Card className="card-box" key={player.name}>
                <Card.Img src={player.img} />
                <div className="patch">
                  <img src={player.state} />
                </div>
                <Card.Body className="card-box-player-name">
                  <div id="player-number">{player.number}</div>
                  <Card.Title className="player-title">
                    <div>{player.name}</div>
                    <div className="overall">
                      <div id="ovr">{"Idade"}</div>
                      <div>{player.age}</div>
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex  justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>D E F E N S O R E S</h3>
      </div>
      <Row>
        {defenders.map((player) => {
          return (
            <Col
              lg={true}
              md={6}
              className="mb-2 mt-2 d-flex justify-content-center align-center"
            >
              <Card className="card-box" key={player.name}>
                <Card.Img src={player.img} />
                <div className="patch">
                  <img src={player.state} />
                </div>
                <Card.Body className="card-box-player-name">
                  <div id="player-number">{player.number}</div>
                  <Card.Title className="player-title">
                    <div>{player.name}</div>
                    <div className="overall">
                      <div id="ovr">{"Idade"}</div>
                      <div>{player.age}</div>
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex  justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>G O L E I R O S</h3>
      </div>
      <Row>
        {goalKeepers.map((player) => {
          return (
            <Col
              lg={true}
              md={6}
              className="mb-2 mt-2 d-flex justify-content-center align-center"
            >
              <Card className="card-box" key={player.name}>
                <Card.Img src={player.img} />
                <div className="patch">
                  <img src={player.state} />
                </div>
                <Card.Body className="card-box-player-name">
                  <div id="player-number">{player.number}</div>
                  <Card.Title className="player-title">
                    <div>{player.name}</div>
                    <div className="overall">
                      <div id="ovr">{"Idade"}</div>
                      <div>{player.age}</div>
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex  justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>T R E I N A D O R </h3>
      </div>
      <Row>
        {coach.map((player) => {
          return (
            <Col
              lg={true}
              md={6}
              className="mb-2 mt-2 d-flex justify-content-center align-center"
            >
              <Card className="card-box" key={player.name}>
                <Card.Img src={player.img} />
                <div className="patch">
                  <img src={player.state} />
                </div>
                <Card.Body className="card-box-player-name">
                  <div id="player-number">{player.number}</div>
                  <Card.Title className="player-title">
                    <div>{player.name}</div>
                    <div className="overall">
                      <div id="ovr">{"Idade"}</div>
                      <div>{player.age}</div>
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
export { Separator };
