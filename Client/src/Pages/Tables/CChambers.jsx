import "./Tables.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { URL_ORIGIN } from "../../constants";
import GetChambers from "./GetChambers";

export default function CChambers() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { isCAuthenticated, jwtCVerify } = useAuth();
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        console.log("Called by Dashboard");
        await jwtCVerify();
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying JWT:", error);
        setIsLoading(false);
      }
    }
    checkAuthentication();
  }, [jwtCVerify]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isCAuthenticated ? null : navigate("/login")}
      <div className="back">
        <div style={{ fontSize: "50px" }}>Chambers</div>
        <table>
          <thead>
          <tr>
            <th>CID</th>
            <th>Capacity</th>
            <th>Humidity</th>
            <th>Temperature</th>
            <th>Commodities</th>
            <th>Coolant</th>
          </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button className="chamberForm" onClick={togglePop}>
          Add Chambers
        </button>
        {seen ? <GetChambers toggle={togglePop} /> : null}
      </div>
    </>
  );
}
