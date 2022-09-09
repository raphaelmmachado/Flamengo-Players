
import { useState } from "react";
import { Header } from "./components/Header";
import { Wrapper } from "./components/Wrapper";
import { FilteredPlayers } from "./components/FilteredPlayers";
function App() {
  const [sortState, setSortState] = useState("");
  const [playersByPosition, setPlayersByPosition] = useState(true);
  const [inputText, setInputText] = useState("");
  return (
    <>
        <Header
          setSortState={setSortState}
          setInputText={setInputText}
          setPlayersByPosition={setPlayersByPosition}
        />
        {!inputText ? (
          <Wrapper playersByPosition={playersByPosition} sortState={sortState}/>
        ) : (
          <FilteredPlayers inputText={inputText} />
        )}
    
    </>
  );
}

export default App;
