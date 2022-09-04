import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { MdPersonSearch } from "react-icons/md";

function SubHeader({ setSortState, setInputText, setPlayersByPosition }) {
  return (
    <Container fluid className="header-subheader">
      <Row className="sub-header-row">
        <Col lg={5} md={5} sm={5} className="d-flex align-items-center">
          <MdPersonSearch
            color="white"
            size={"26px"}
            style={{ marginRight: "3px" }}
          />
          <Form.Control
            type="text"
            placeholder="NOME OU APELIDO DO JOGADOR"
            onChange={(e) => setInputText(e.target.value.toLowerCase())}
          />
        </Col>
        <Col lg={1} md={2} sm={3}>
          <Dropdown>
            <Dropdown.Toggle variant="dark">Ordenar por:</Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={() => setPlayersByPosition(true)}>
                Posição
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPlayersByPosition(false);
                  setSortState("ability");
                }}
              >
                Habilidade
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPlayersByPosition(false);
                  setSortState("number");
                }}
              >
                Número
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPlayersByPosition(false);
                  setSortState("age");
                }}
              >
                Idade
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPlayersByPosition(false);
                  setSortState("height");
                }}
              >
                Altura
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}
export { SubHeader };
