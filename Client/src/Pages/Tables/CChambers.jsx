import './Tables.css';
import { useState, useEffect } from 'react';
export default function CChambers() {
    const [rows, setRows] = useState([]);

    // Simulating useEffect to receive table contents
    useEffect(() => {
        const tableData = [
            ['1', '1000', '50', '10', 'Potatoes', 'R22'],
            ['2', '2000', '60', '15', 'Tomatoes', 'R134a']
        ];
        setRows(tableData);
    }, []);
    return (
        <div className='back'>
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
    )
}