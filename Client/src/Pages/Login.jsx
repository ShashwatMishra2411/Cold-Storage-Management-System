import React, { useState } from "react";
import { URL_ORIGIN } from "../constants";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useAuth } from "../Contexts/AuthContext";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { jwtCVerify } = useAuth();
  const side = document.getElementById("sideSelect");

  async function submit(e) {
    // This will prevent page refresh
    e.preventDefault();
    try {
      const token = await fetch(
        `${URL_ORIGIN}/${localStorage.getItem("user")}s/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );
      if (token.status === 200) {
        const data = await token.json();
        localStorage.setItem("token", data.token);
        console.log("called");
        await jwtCVerify();
        navigate(`/${side.value}dashboard`);
      } else {
        const data = await token.json();
        alert(data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="back">
      <form
        onSubmit={submit}
        style={{ display: "flex", flexDirection: "column" }}
      >
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
        <label htmlFor="sideSelect">Select Your Business</label>
        <select id="sideSelect" className="txt">
          <option value="customers">Customer</option>
          <option value="owners">Owner</option>
        </select>
        <button type="submit" className="subBut">
          Submit
        </button>
      </form>
    </div>
  );
}
