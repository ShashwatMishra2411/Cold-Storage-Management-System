import { createContext, useEffect, useState, useContext } from "react";
import { URL_ORIGIN } from "../constants";
const jwtContext = createContext();
function JwtContextProvider({ children }) {
  const [isCAuthenticated, setIsCAuthenticated] = useState(false);
  const [isOAuthenticated, setIsOAuthenticated] = useState(false);

  async function jwtCVerify() {
    let token = localStorage.getItem("token");
    console.log(token);
    try {
      if (token) {
        const response = await fetch(`${URL_ORIGIN}/customers/verifyJWT`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
            "Accept": "application/json",
          },
        });
        console.log(token);
        if (response.status === 200) {
          setIsCAuthenticated(true);
          console.log(response.json());
        } else {
          setIsCAuthenticated(false);
        }
      } else {
        setIsCAuthenticated(false);
        console.log(token);
      }
      console.log("is = ", isCAuthenticated);
    } catch (err) {
      console.log("huehue");
      console.log(err.message);
      setIsCAuthenticated(false);
    }
  }
  async function jwtOVerify() {
    let token = localStorage.getItem("token");
    try {
      if (token === undefined || token === null) {
        setIsOAuthenticated(false);
      } else {
        const response = await fetch(`${URL_ORIGIN}/owners/verifyJWT`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            Accept: "application/json",
          },
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
  const value = { isCAuthenticated, isOAuthenticated, jwtCVerify, jwtOVerify };
  return <jwtContext.Provider value={value}>{children}</jwtContext.Provider>;
}
export default JwtContextProvider;
export function useAuth() {
  return useContext(jwtContext);
}
