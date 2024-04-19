import "./Tables.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
export default function OFixedCapital() {
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
      ["1", "John Doe", "1000", "50"],
      ["2", "Jane Doe", "2000", "60"],
    ];
    setRows(tableData);
  }, []);
  return (
    <>
      {isOAuthenticated ? null : navigate(-1)}
      <div className="back">
        <div style={{ fontSize: "50px" }}>Fixed Capital</div>
        <table>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Capital Investment</th>
            <th>Fixed Capital</th>
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
