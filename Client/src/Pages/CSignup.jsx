import { useState } from "react";
import './signUp.css';
export default function CSignup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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
            body: JSON.stringify({ username: username, email: email, password: password })
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
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className="txt"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    className="txt"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                />
                <label htmlFor="confPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confPassword"
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
