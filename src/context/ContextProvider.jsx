import { createContext,useState } from "react";
const Context = createContext();

function ContextProvider({ children }) {
  const [showSubHeader,setShowSubHeader] = useState(false)
  return (
    <Context.Provider
      value={{showSubHeader, setShowSubHeader}}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
