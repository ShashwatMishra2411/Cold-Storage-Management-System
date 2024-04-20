import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import JwtContextProvider from "./Contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <JwtContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </JwtContextProvider>
  // </React.StrictMode>,
);
