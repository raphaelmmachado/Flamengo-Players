import { ContextProvider } from "./context/ContextProvider";
import { useState } from "react";
import { Header } from "./components/Header";
import { Wrapper } from "./components/Wrapper";
import { FilteredPlayers } from "./components/FilteredPlayers";
function App() {
  const [playersByPosition, setPlayersByPosition] = useState(true);
  const [inputText, setInputText] = useState("");

  return (
    <>
      <ContextProvider>
        <Header
          setPlayersByPosition={setPlayersByPosition}
          setInputText={setInputText}
          inputText={inputText}
        />
        {!inputText ? (
          <Wrapper
            playersByPosition={playersByPosition}           
          />
        ) : (
          <FilteredPlayers inputText={inputText}/>
        )}
      </ContextProvider>
    </>
  );
}

export default App;
