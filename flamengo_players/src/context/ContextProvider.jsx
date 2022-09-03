import { createContext, useState } from "react";
const Context = createContext();
function ContextProvider({ children }) {
  const [inputContext, setInputContext] = useState("");
  const handleText = (inputText) => setInputContext(inputText);
  return (
    <Context.Provider value={{ handleText, inputContext }}>
      {children}
    </Context.Provider>
  );
}
export { Context, ContextProvider };
