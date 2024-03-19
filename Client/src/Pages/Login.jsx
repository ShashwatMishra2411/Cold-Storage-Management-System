import React, { useState } from "react";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    function submit(e) {
        // This will prevent page refresh
        e.preventDefault();

        // replace this with your own unique endpoint URL
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

    if (submitted) {
        return <p>We've received your password, thank you for contacting us!</p>;
    }

    const back = {
        backgroundColor: 'aquamarine',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Bungee',
    };
    const txt = {
        border: '3px solid black',
        borderRadius: '7px',
        lineHeight: '20px',
        fontFamily: 'Bungee',
    }
    const subBut = {
        backgroundColor: 'black',
        color: 'white',
        padding: '5px',
        margin: '10px',
        borderRadius: '10px',
        fontSize: '20px',
        textDecoration: 'none',
        fontFamily: 'Bungee',
    }
    return (
        <div className="back" style={back}>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="username"
                    style={txt}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    style={txt}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <button type="submit" style={subBut}>Submit</button>
            </form>
        </div>
    );
}