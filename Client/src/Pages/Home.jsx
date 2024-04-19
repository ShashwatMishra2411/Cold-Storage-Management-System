import { Link } from "react-router-dom";
import "./Home.css";
export default function Home() {
  return (
    <div className="home">
      <div className="welcome" style={{ fontSize: "60px", lineHeight: "50px" }}>
        {" "}
        Welcome to FrosTrack
      </div>
      <br></br>
      <div className="subWelcome" style={{ fontSize: "20px" }}>
        New here? Choose your business
      </div>
      <div style={{ display: "inline-flex", marginInline: "20px" }}>
        <Link to="/CSignup" className="signBut">
          Customer
        </Link>
        <Link to="/OSignup" className="signBut">
          Owner
        </Link>
      </div>
      <div className="logBut" style={{ fontSize: "15px" }}>
        <Link to="/login">already have an account?</Link>
      </div>
    </div>
  );
}
