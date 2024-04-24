import "./Tables.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { URL_ORIGIN } from "../../constants";

export default function OProfile() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { isOAuthenticated, jwtOVerify } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        console.log("Called by Profile");
        await jwtOVerify();
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying JWT:", error);
        setIsLoading(false);
      }
    }
    checkAuthentication();
  }, [jwtOVerify]);

  // Simulating useEffect to receive table contents
  useEffect(() => {
    async function getChambers() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `${URL_ORIGIN}/owners/profile`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          if (response.status === 200) {
            const data = response.data;
            console.log("Data")
            console.log(data);
            setRows(data);
          } else {
            console.log("Error fetching profile");
          }
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
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
        <div style={{ fontSize: "50px" }}>Profile</div>
        <table >
          <tbody>
          <tr>
            <th>ID</th>
            {rows && rows[0] && <th>{rows[0].id}</th>}
          </tr>
          <tr>
            <th>Username</th>
            {rows && rows[0] && <th>{rows[0].username}</th>}
          </tr>
          <tr>
            <th>Password</th>
            {rows && rows[0] && <th>{rows[0].password}</th>}
          </tr>
          {/* <tr>
            <th>Owner ID</th>
            {rows && rows[0] && <th>{rows[0].owner_id}</th>}
          </tr>
          <tr>
            <th>Bill Amount</th>
            {rows && rows[0] && <th>{rows[0].bill_amt}</th>}
          </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
