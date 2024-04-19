import { createContext, useEffect, useState, useContext } from "react";
import { URL_ORIGIN } from "../constants";
import axios from "axios";
const jwtContext = createContext();
function JwtContextProvider({ children }) {
  const [isCAuthenticated, setIsCAuthenticated] = useState(false);
  const [isOAuthenticated, setIsOAuthenticated] = useState(false);
  console.log("isAuth = ", isCAuthenticated);

  const jwtCVerify = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${URL_ORIGIN}/customers/verifyJWT`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          setIsCAuthenticated(true);
        } else {
          setIsCAuthenticated(false);
        }
      } else {
        setIsCAuthenticated(false);
      }
    } catch (err) {
      console.log("Error verifying customer JWT:", err);
      setIsCAuthenticated(false);
    }
  };

  const jwtOVerify = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`${URL_ORIGIN}/owners/verifyJWT`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            Accept: "application/json",
          },
        });
        if (response.status === 200) {
          setIsOAuthenticated(true);
        } else {
          setIsOAuthenticated(false);
        }
      } else {
        setIsOAuthenticated(false);
      }
    } catch (err) {
      console.log("Error verifying owner JWT:", err);
      setIsOAuthenticated(false);
    }
  };

  useEffect(() => {
    jwtCVerify();
    jwtOVerify();
  }, []);
  // useEffect(() => {
  //   jwtCVerify();
  //   jwtOVerify();
  // }, []);
  const value = { isCAuthenticated, isOAuthenticated, jwtCVerify, jwtOVerify };
  return <jwtContext.Provider value={value}>{children}</jwtContext.Provider>;
}
export default JwtContextProvider;
export function useAuth() {
  return useContext(jwtContext);
}
