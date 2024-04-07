import React, { useState } from "react";
import './login.css';
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    function submit(e) {
        // This will prevent page refresh
        e.preventDefault();

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.code === 200) {
                    setSubmitted(true);
                } else {
                    setError(res.password);
                }
            })
            .catch((error) => setError(error));
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div className="back">
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="username"
                    className="txt"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    className="txt"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                />
                <button type="submit" className="subBut">Submit</button>
            </form>
        </div>
    );
}