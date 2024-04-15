import './Tables.css';
import { useState, useEffect } from 'react';
export default function OProfile() {
    const [rows, setRows] = useState([]);

    // Simulating useEffect to receive table contents
    useEffect(() => {
        const tableData = [
            ['1', 'John Doe', '1234567890', 'g@gmail.com', '123, ABC Street, XYZ City'],
            ['2', 'Jane Doe', '1234567890', 'z@gmail.com', '456, DEF Street, XYZ City']
        ];
        setRows(tableData);
    }, []);
    return (
        <div className='back'>
            <div style={{ fontSize: "50px" }}>Profile</div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Address</th>

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