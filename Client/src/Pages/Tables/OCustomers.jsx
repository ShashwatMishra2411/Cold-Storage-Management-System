import './Tables.css';
import { useState, useEffect } from 'react';
export default function OCustomers() {
    const [rows, setRows] = useState([]);

    // Simulating useEffect to receive table contents
    useEffect(() => {
        const tableData = [
            ['1', 'John Doe', '1000', '50'],
            ['2', 'Jane Doe', '2000', '60']
        ];
        setRows(tableData);
    }, []);
    return (
        <div className='back'>
            <div style={{ fontSize: "50px" }}>Customers</div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Capital Investment</th>
                    <th>Working Capital</th>
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