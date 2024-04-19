import { createContext, useEffect, useState, useContext } from "react";

const jwtContext = createContext();
function JwtContextProvider({ children }) {
  const [isCAuthenticated, setIsCAuthenticated] = useState(true);
  const [isOAuthenticated, setIsOAuthenticated] = useState(true);
  let token = localStorage.getItem("token");
  async function jwtCVerify() {
    try {
      if (token === undefined || token === null) {
        setIsCAuthenticated(false);
      } else {
        const response = await fetch(`${URL_ORIGIN}/customers/verifyJWT`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            Accept: "application/json",
          },
          body: JSON.stringify({ token: token }),
        });
        if (response.status === 200) {
          setIsCAuthenticated(true);
        } else {
          setIsCAuthenticated(false);
        }
      }
    } catch (err) {
      setIsCAuthenticated(false);
    }
  }
  async function jwtOVerify() {
    try {
      if (token === undefined || token === null) {
        setIsOAuthenticated(false);
      } else {
        const response = await fetch(`${URL_ORIGIN}/owners/verifyJWT`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            Accept: "application/json",
          },
          body: JSON.stringify({ token: token }),
        });
        if (response.status === 200) {
          setIsOAuthenticated(true);
        } else {
          setIsOAuthenticated(false);
        }
      }
    } catch (err) {
      setIsCAuthenticated(false);
    }
  }
  useEffect(() => {
    jwtCVerify();
    jwtOVerify();
  }, []);
  const value = { isCAuthenticated, isOAuthenticated };
  return <jwtContext.Provider value={value}>{children}</jwtContext.Provider>;
}
export default JwtContextProvider;
export function useAuth() {
  return useContext(jwtContext);
}
