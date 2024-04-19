import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import CSignup from "./Pages/CSignup.jsx";
import Login from "./Pages/Login.jsx";
import OSignup from "./Pages/OSignup.jsx";
import ODashboard from "./Pages/ODashboard.jsx";
import CDashboard from "./Pages/CDashboard.jsx";
import CProfile from "./Pages/Tables/CProfile.jsx";
import CPurchases from "./Pages/Tables/CPurchases.jsx";
import CCommodities from "./Pages/Tables/CCommodities.jsx";
import CChambers from "./Pages/Tables/CChambers.jsx";
import OProfile from "./Pages/Tables/OProfile.jsx";
import OChambers from "./Pages/Tables/OChambers.jsx";
import OCustomers from "./Pages/Tables/OCustomers.jsx";
import OFinances from "./Pages/Tables/OFinances.jsx";
import OFixedCapital from "./Pages/Tables/OFixedCapital.jsx";
import OWorkingCapital from "./Pages/Tables/OWorkingCapital.jsx";
import JwtContextProvider from "./Contexts/AuthContext.jsx";
export default function App() {
  let tokenValue = localStorage.getItem("token");
  return (
    <div className="appWrap" style={{ height: "100%", width: "100%" }}>
      <JwtContextProvider value={tokenValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CSignup" element={<CSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/OSignup" element={<OSignup />} />
          <Route path="/CDashboard" element={<CDashboard />} />
          <Route path="/Cprofile" element={<CProfile />} />
          <Route path="/CPurchases" element={<CPurchases />} />
          <Route path="/CChambers" element={<CChambers />} />
          <Route path="/CCommodities" element={<CCommodities />} />
          <Route path="/ODashboard" element={<ODashboard />} />
          <Route path="/OProfile" element={<OProfile />} />
          <Route path="/OChambers" element={<OChambers />} />
          <Route path="/OCustomers" element={<OCustomers />} />
          <Route path="/OFinances" element={<OFinances />} />
          <Route path="/OFixedCapital" element={<OFixedCapital />} />
          <Route path="/OWorkingCapital" element={<OWorkingCapital />} />
        </Routes>
      </JwtContextProvider>
    </div>
  );
}
