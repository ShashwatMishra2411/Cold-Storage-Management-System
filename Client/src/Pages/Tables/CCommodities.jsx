import "./Tables.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { URL_ORIGIN } from "../../constants";
export default function CCommodities() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { isCAuthenticated, jwtCVerify } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        console.log("Called by Commodities");
        await jwtCVerify();
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying JWT:", error);
        setIsLoading(false);
      }
    }
    checkAuthentication();
  }, [jwtCVerify]);

  // Simulating useEffect to receive table contents
  useEffect(() => {
    async function getChambers() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `${URL_ORIGIN}/customers/commodities`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          if (response.status === 200) {
            const data = response.data;
            setRows(data);
          } else {
            console.log("Error fetching commodities");
          }
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error fetching commodities:", error.message);
      }
    }
    getChambers();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {isCAuthenticated ? null : navigate("/login")}
      <div className="back">
        <div style={{ fontSize: "50px" }}>Commodities</div>
        <table>
          <thead>
            <tr>
              {rows[0] &&
                Object.keys(rows[0][0]).map((cell, index) => {
                  return <th key={index}>{cell}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              return row.map((commodity, index) => {
                return (
                  <tr key={index}>
                    {Object.values(commodity).map((cell, cellIndex) => {
                      return <td key={cellIndex}>{cell}</td>;
                    })}
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
