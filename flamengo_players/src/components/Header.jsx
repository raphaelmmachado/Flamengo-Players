import { Title } from "./header/Title";
import { SubHeader } from "./header/SubHeader";
function Header({setPlayersByPosition, setInputText}) {
  return (
    <header>
      <Title />
      <SubHeader setPlayersByPosition={setPlayersByPosition} setInputText={setInputText}/>
    </header>
  );
}
export { Header };
