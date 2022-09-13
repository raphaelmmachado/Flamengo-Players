import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PlayerCard } from "./PlayerCard";
import { squad } from "../../data/players";
import { useMemo } from "react";
function Separator() {
  const attackersArray = useMemo(
    () =>
      squad.filter(
        (player) =>
          player.position === "Atacante" ||
          player.position === "Ponta Direita" ||
          player.position === "Ponta Esquerda"
      ),
    [squad]
  );
  const midFieldersArray = useMemo(
    () =>
      squad.filter(
        (player) =>
          player.position === "Meio-Campo" ||
          player.position === "Meio-Defensivo" ||
          player.position === "Meio-Ofensivo"
      ),
    [squad]
  );
  const sideBacksArray = useMemo(
    () =>
      squad.filter(
        (player) =>
          player.position === "Lateral Direito" ||
          player.position === "Lateral Esquerdo"
      ),
    [squad]
  );
  const defendersArray = useMemo(
    () => squad.filter((player) => player.position === "Zagueiro"),
    [squad]
  );
  const goalKeepersArray = useMemo(
    () => squad.filter((player) => player.position === "Goleiro"),
    [squad]
  );
  const coachArray = squad.filter((player) => player.position === "Treinador");

  return (
    <>
      <div className="separator d-flex justify-content-center align-center">
        <div>
          <h3 style={{ textAlign: "center" }}>A T A C A N T E S</h3>
        </div>
      </div>
      <Row>
        {attackersArray.map((player, i) => {
          return (
            <Col
              key={i}
              lg={true}
              md={6}
              className="mb-4 mt-2 d-flex justify-content-center align-center"
            >
              <PlayerCard
                img={player.img}
                state={player.state}
                number={player.number}
                name={player.name}
                age={player.age}
                pos={player.pos}
                position={player.position}
              />
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>M E I O S - C A M P O S</h3>
      </div>
      <Row>
        {midFieldersArray.map((player, i) => {
          return (
            <Col
              key={i}
              lg={true}
              md={6}
              className="mb-4 mt-2 d-flex justify-content-center align-center"
            >
              <PlayerCard
                img={player.img}
                state={player.state}
                number={player.number}
                name={player.name}
                age={player.age}
                pos={player.pos}
                position={player.position}
              />
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex  justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>L A T E R A I S</h3>
      </div>
      <Row>
        {sideBacksArray.map((player, i) => {
          return (
            <Col
              key={i}
              lg={true}
              md={6}
              className="mb-3 mt-3 d-flex justify-content-center align-center"
            >
              <PlayerCard
                img={player.img}
                state={player.state}
                number={player.number}
                name={player.name}
                age={player.age}
                position={player.position}
              />
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex  justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>D E F E N S O R E S</h3>
      </div>
      <Row>
        {defendersArray.map((player, i) => {
          return (
            <Col
              key={i}
              lg={true}
              md={6}
              className="mb-3 mt-3 d-flex justify-content-center align-center"
            >
              <PlayerCard
                img={player.img}
                state={player.state}
                number={player.number}
                name={player.name}
                age={player.age}
                position={player.position}
              />
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex  justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>G O L E I R O S</h3>
      </div>
      <Row>
        {goalKeepersArray.map((player, i) => {
          return (
            <Col
              key={i}
              lg={true}
              md={6}
              className="mb-3 mt-3 d-flex justify-content-center align-center"
            >
              <PlayerCard
                img={player.img}
                state={player.state}
                number={player.number}
                name={player.name}
                age={player.age}
                position={player.position}
              />
            </Col>
          );
        })}
      </Row>
      <div className="separator d-flex  justify-content-center align-center">
        <h3 style={{ textAlign: "center" }}>T R E I N A D O R </h3>
      </div>
      <Row>
        {coachArray.map((player, i) => {
          return (
            <Col
              key={i}
              lg={true}
              md={6}
              className="mb-3 mt-3 d-flex justify-content-center align-center"
            >
              <PlayerCard
                name={player.name}
                nick={player.alsoKnownAs}
                number={player.number}
                img={player.img}
                position={player.position}
                state={player.state}
                age={player.age}
                pos={player.pos}
                ability={player.ability}
                country={player.country}
                poster={player.poster}
                fullName={player.fullName}
                leg={player.leg}
                height={player.height}
                city={player.city}
                birth={player.birth}
                formerTeams={player.formerTeams}
                arrival={player.arrival}
                contract={player.contract}
                fanBase={player.fanBase}
                valueEuros={player.valueEuros}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
export { Separator };
