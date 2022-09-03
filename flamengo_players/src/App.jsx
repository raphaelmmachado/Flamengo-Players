import { ContextProvider } from "./context/ContextProvider";
import { useState } from "react";
import { Header } from "./components/Header";
import { Wrapper } from "./components/Wrapper";

function App() {
  const [playersByPosition, setPlayersByPosition] = useState(true);
  
  return (
    <>
      <ContextProvider>
        <Header setPlayersByPosition={setPlayersByPosition} />
       <Wrapper playersByPosition={playersByPosition} setPlayersByPosition={setPlayersByPosition}/>
      </ContextProvider>
    </>
  );
}

export default App;
