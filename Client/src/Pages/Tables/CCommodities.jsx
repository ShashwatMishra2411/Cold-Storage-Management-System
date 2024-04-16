import './Tables.css';
import { useState, useEffect } from 'react';
export default function CCommodities() {
    const [rows, setRows] = useState([]);

    // Simulating useEffect to receive table contents
    useEffect(() => {
        const tableData = [
            ['Potatoes', '1', '50', 'R500', '2022-12-31'],
            ['Tomatoes', '2', '60', 'R600', '2022-12-31']
        ];
        setRows(tableData);
    }, []);
    return (
        <div className='back'>
            <div style={{ fontSize: "50px" }}>Commodities</div>
            <table>
                <tr>
                    <th>Commodity</th>
                    <th>CID</th>
                    <th>Stock</th>
                    <th>Market Value</th>
                    <th>Expiration Date</th>
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