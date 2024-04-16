import './Tables.css';
import { useState, useEffect } from 'react';
export default function CPurchases() {
    const [rows, setRows] = useState([]);

    // Simulating useEffect to receive table contents
    useEffect(() => {
        const tableData = [
            ['1', '2022-01-01', '2022-01-02', 'Potatoes', 'USD500'],
            ['2', '2022-01-01', '2022-01-02', 'Tomatoes', 'USD600']
        ];
        setRows(tableData);
    }, []);
    return (
        <div className='back'>
            <div style={{ fontSize: "50px" }}>Purchases</div>
            <table>
                <tr>
                    <th>CID</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Commodities</th>
                    <th>Total cost</th>
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