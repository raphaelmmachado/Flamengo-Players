import { useState, useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { squad } from "../data/players.ts";
import { PlayerCard } from "./wrapper/PlayerCard";
import { Context } from "../context/ContextProvider";
import { Separator } from "./wrapper/Separator";
function Wrapper({ playersByPosition, setPlayersByPosition }) {
  const sortedByAbility = squad.sort((a, b) => b.ability - a.ability);
  const [data, setData] = useState(sortedByAbility);

  const { inputContext } = useContext(Context);

  useEffect(() => {
    if (!inputContext) setData(sortedByAbility);
    else {
      formatInput(inputContext, data);
    }
  }, [inputContext]);

  const formatInput = (text, data) => {
    const filteredByName = data.filter((player) => {
      const name = player.name.toLowerCase();
      const known = player.alsoKnownAs ?? name;
      return (
        name.includes(text) ||
        name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(text) ||
        known.toLowerCase().includes(text) ||
        known
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(text)
      );
    });
    setPlayersByPosition(false);
    setData(filteredByName);
  };
  return (
    <Container fluid className="wrapper ">
      {playersByPosition ? (
        <Separator />
      ) : (
        <Row>
          {data &&
            data.map((player) => (
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
