import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { squad } from "../data/players.ts";
import { PlayerCard } from "./wrapper/PlayerCard";

import { Separator } from "./wrapper/Separator";
function Wrapper({ playersByPosition}) {
  const sortedByAbility = squad.sort((a, b) => b.ability - a.ability);  
  const data = sortedByAbility

/*O PROBLEMA É QUE A ARRAY ESTÁ SENDO FILTRADA EM LOOP -- FIXED*/

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
              />
            </Col>
          ))}
        </Row> 
      )}
    </Container>
  );
}
export { Wrapper };
