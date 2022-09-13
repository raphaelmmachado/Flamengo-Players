import { useState,useEffect,useContext } from "react";
import { Context } from "../context/ContextProvider";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { PlayerCard } from "./wrapper/PlayerCard";
import { squad } from "../data/players";

function FilteredPlayers({ inputText }) {
  const {setShowSubHeader} = useContext(Context)
  const [data, setData] = useState(squad);
  useEffect(()=>{
    setShowSubHeader(true)
  },[])
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
            );
          })}
      </Row>
    </Container>
  );
}

export { FilteredPlayers };
