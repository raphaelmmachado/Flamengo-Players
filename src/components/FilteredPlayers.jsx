import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { PlayerCard } from "./wrapper/PlayerCard";
import { squad } from "../data/players";

function FilteredPlayers({ inputText }) {
  const [data, setData] = useState(squad);
  console.log(inputText);
  return (
    <Container className="wrapper ">
      <Row>
        {data
          .filter((player) => {
            const name = player.name.toLowerCase();
            const known = player.alsoKnownAs ?? name;
            return (
              name.includes(inputText) ||
              name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(inputText) ||
              known.toLowerCase().includes(inputText) ||
              known
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(inputText)
            );
          })
          .map((player) => {
            return (
              <Col
                lg={3}
                md={6}
                className="mb-3 mt-3 d-flex justify-content-center align-center"
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
            );
          })}
      </Row>
    </Container>
  );
}

export { FilteredPlayers };
