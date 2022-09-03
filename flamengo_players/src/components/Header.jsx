import { Title } from "./header/Title";
import { SubHeader } from "./header/SubHeader";
function Header({setPlayersByPosition}) {
  return (
    <header>
      <Title />
      <SubHeader setPlayersByPosition={setPlayersByPosition}/>
    </header>
  );
}
export { Header };
