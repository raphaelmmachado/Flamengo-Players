import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { squad } from "../data/players.ts";
import { PlayerCard } from "./wrapper/PlayerCard";
import { Separator } from "./wrapper/Separator";

function Wrapper({ playersByPosition, sortState }) {
  const [data, setData] = useState(squad);
  useEffect(() => {
    const toNumber = [...data].sort((a, b) => a.number - b.number);
    const toHeight = [...data].sort((a, b) => b.height - a.height);
    const toAge = [...data].sort((a, b) => b.age - a.age);
    const toAbility = [...data].sort((a, b) => b.ability - a.ability);

    switch (sortState) {
      case "age":
        setData(toAge);
        break;
      case "number":
        setData(toNumber);
        break;
      case "height":
        setData(toHeight);
        break;
      case "ability":
        setData(toAbility);
        break;
      default:
        break;
    }
  }, [sortState]);
 
  return (
    <Container fluid className="wrapper ">
      {playersByPosition ? (
        <Separator />
      ) : (
        <Row>
          {data.map((player) => (
            <Col
              lg={3}
              md={6}
              className="mb-2 mt-2 d-flex justify-content-center align-center"
              key={player.name}
            >
              <PlayerCard
                img={player.img}
                state={player.state}
                number={player.number}
                name={player.name}
                age={player.age}
                pos={player.pos}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
export { Wrapper };
