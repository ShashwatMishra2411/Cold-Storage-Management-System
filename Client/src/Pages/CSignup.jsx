import { useState } from "react";
import { URL_ORIGIN } from "../constants";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
export default function CSignup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    // This will prevent page refresh
    e.preventDefault();
    const confPassword = document.getElementById("confPassword");
    if (password != confPassword.value) {
      alert("Passwords do not match");
      return;
    }
    try {
      await fetch(`${URL_ORIGIN}/customers/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      localStorage.setItem("user", "customer");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="back">
      <form
        onSubmit={handleSubmit}
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
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <button type="submit" className="subBut">
          Submit
        </button>
      </form>
    </div>
  );
}
