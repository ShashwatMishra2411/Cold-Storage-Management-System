import "./Tables.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
export default function OChambers() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { isOAuthenticated } = useAuth();
  useEffect(() => {
    if (!isOAuthenticated) {
      console.log(isOAuthenticated);
      navigate("/login");
    }
  }, []);

  // Simulating useEffect to receive table contents
  useEffect(() => {
    const tableData = [
      ["1", "John Doe", "1000", "50", "10", "Apple, Banana, Cherry", "R-134a"],
      [
        "2",
        "Jane Doe",
        "2000",
        "60",
        "20",
        "Mango, Orange, Pineapple",
        "R-404a",
      ],
    ];
    setRows(tableData);
  }, []);
  return (
    <>
      {isOAuthenticated ? null : navigate(-1)}
      <div className="back">
        <div style={{ fontSize: "50px" }}>Chambers</div>
        <table>
          <tr>
            <th>CID</th>
            <th>Customer</th>
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
