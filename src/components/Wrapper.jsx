import { useState, useEffect, useMemo, useContext} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { Context } from "../context/ContextProvider";
import { squad } from "../data/players.ts";
import { PlayerCard } from "./wrapper/PlayerCard";
import { Separator } from "./wrapper/Separator";

function Wrapper({ playersByPosition, sortState }) {
  const { setShowSubHeader } = useContext(Context);

  const [data, setData] = useState(squad);
  const toNumber = useMemo(
    () => [...data].sort((a, b) => a.number - b.number),
    [data]
  );
  const toHeight = useMemo(
    () => [...data].sort((a, b) => b.height - a.height),
    [data]
  );
  const toAge = useMemo(() => [...data].sort((a, b) => b.age - a.age), [squad]);
  const toAbility = useMemo(
    () => [...data].sort((a, b) => b.ability - a.ability),
    [squad]
  );
  const toValue = useMemo(
    () => [...data].sort((a, b) => b.valueEuros - a.valueEuros),
    [squad]
  );

  useEffect(() => {
    setShowSubHeader(true)

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
        case "value":
        setData(toValue);
        break;
      case "ability":
        setData(toAbility);
        break;
      default:
        break;
    }
  }, [sortState]);

  return (
    <Container className="wrapper ">
      {playersByPosition ? (
        <Separator />
      ) : (
        <Row>
          {data.map((player) => (
            <Col
              lg={3}
              md={4}
              sm={6}
              className="mb-3 mt-3 d-flex justify-content-center align-center"
              key={player.name}
            >
              <PlayerCard
                fullName={player.fullName}
                name={player.name}
                number={player.number}
                position={player.position}
                img={player.img}
                state={player.state}
                age={player.age}
                pos={player.pos}
                nick={player.alsoKnownAs}
                ability={player.ability}
                country={player.country}
                poster={player.poster}
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
          ))}
        </Row>
      )}
    </Container>
  );
}
export { Wrapper };
