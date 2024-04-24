import "./Tables.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { URL_ORIGIN } from "../../constants";
// import GetChambers from "./GetChambers";

export default function OCustomers() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { isOAuthenticated, jwtOVerify } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        console.log("Called by Customers");
        await jwtOVerify();
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying JWT:", error);
        setIsLoading(false);
      }
    }
    checkAuthentication();
  }, [jwtOVerify]);

  useEffect(() => {
    async function getChambers() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${URL_ORIGIN}/owners/customers`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          if (response.status === 200) {
            const data = response.data;
            console.log(Object.keys(data[0]));
            console.log(data);
            setRows(data);
          } else {
            console.log("Error fetching customers");
          }
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error fetching customers:", error.message);
      }
    }
    getChambers();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isOAuthenticated ? null : navigate("/login")}
      <div className="back">
        <div style={{ fontSize: "50px" }}>Customers</div>
        <table>
          <thead>
            <tr>
              {rows[0] &&
                Object.keys(rows[0]).map((cell, index) => {
                  return <th key={index}>{cell}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, cellIndex) => {
                  if (Array.isArray(cell)) {
                    // console.log("here");
                    return (
                      <td key={cellIndex}>
                        {cell.map((item, i) => {
                          return (
                            <>
                              <span key={i}>{item}</span>
                              <br />
                            </>
                          );
                        })}
                      </td>
                    );
                  } else return <td key={cellIndex}>{cell}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </>
  );
}
