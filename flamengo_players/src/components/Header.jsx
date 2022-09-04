import { Title } from "./header/Title";
import { SubHeader } from "./header/SubHeader";
function Header({ setInputText, setSortState,setPlayersByPosition }) {
  return (
    <header>
      <Title />
      <SubHeader setInputText={setInputText} setSortState={setSortState} setPlayersByPosition={setPlayersByPosition}/>
    </header>
  );
}
export { Header };
