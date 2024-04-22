import "./Tables.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { URL_ORIGIN } from "../../constants";
export default function CPurchases() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { isCAuthenticated, jwtCVerify } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        console.log("Called by Purchases");
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
            `${URL_ORIGIN}/customers/purchases`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          if (response.status === 200) {
            const data = response.data;
            // console.log(data);
            setRows(data);
            data.forEach((row) => {
              row.forEach((commodity, index) => {
                // console.log(commodity.cost);
                setAmount((prevAmount) => {
                  return prevAmount + commodity.cost;
                });
              });
            });
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
        <div style={{ fontSize: "50px" }}>Purchases</div>
        <table>
          <thead>
            <tr>
              {rows[0] &&
                Object.keys(rows[0][0]).map((cell, index) => {
                  if (index !== 2 && index !== 3) {
                    return <th key={index}>{cell}</th>;
                  }
                })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              return row.map((commodity, index) => {
                return (
                  <tr key={index}>
                    {Object.values(commodity).map((cell, cellIndex) => {
                      if (cellIndex !== 2 && cellIndex !== 3)
                        return <td key={cellIndex}>{cell}</td>;
                    })}
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
        <div className="amount">Total = {amount}</div>
      </div>
    </>
  );
}
