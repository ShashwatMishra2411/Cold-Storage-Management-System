import "./Tables.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

export default function CChambers() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { isCAuthenticated } = useAuth();
  useEffect(() => {
    if (!isCAuthenticated) {
      console.log(isCAuthenticated);
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const tableData = [
      ["1", "1000", "50", "10", "Potatoes", "R22"],
      ["2", "2000", "60", "15", "Tomatoes", "R134a"],
    ];
    setRows(tableData);
  }, []);

  return (
    <>
      {isCAuthenticated ? null : navigate(-1)}
      <div className="back">
        <div style={{ fontSize: "50px" }}>Chambers</div>
        <table>
          <tr>
            <th>CID</th>
            <th>Capacity</th>
            <th>Humidity</th>
            <th>Temperature</th>
            <th>Commodities</th>
            <th>Coolant</th>
          </tr>
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
      </div>
    </>
  );
}
