import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
//

import { ContextProvider } from "./context/ContextProvider";
import { Header } from "./components/Header";
import { Wrapper } from "./components/Wrapper";
import { FilteredPlayers } from "./components/FilteredPlayers";
import { PlayerPage } from "./components/player_page/PlayerPage";

function App() {
  const [sortState, setSortState] = useState("");
  const [playersByPosition, setPlayersByPosition] = useState(true);
  const [inputText, setInputText] = useState("");

  
  return (
    <>
      <ContextProvider>
        <Header
          setSortState={setSortState}
          setInputText={setInputText}
          setPlayersByPosition={setPlayersByPosition}
        />
        <Routes>
          <Route
            path="/"
            element={
              !inputText ? (
                <Wrapper
                  playersByPosition={playersByPosition}
                  sortState={sortState}
                />
              ) : (
                <FilteredPlayers inputText={inputText} />
              )
            }
          />
          <Route path="/player/:number" element={<PlayerPage />} />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
