import React, { useState } from "react";
import { URL_ORIGIN } from "../constants";
import {useNavigate} from 'react-router-dom';
import './login.css';
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

     async function submit(e) {
        // This will prevent page refresh
        e.preventDefault();
        try{
            await fetch(`${URL_ORIGIN}/${localStorage.getItem("user")}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({ username: username, password: password })
            })
            navigate(`/${localStorage.getItem("user")[0].toUpperCase()}dashboard`);
        }catch(err){
            console.log(err)
        }
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