import { createContext } from "react";

const jwtContext = createContext();
function JwtContextProvider({ children, value }) {
  return <JwtContext.Provider value={value}>{children}</JwtContext.Provider>;
}
export default JwtContextProvider;
