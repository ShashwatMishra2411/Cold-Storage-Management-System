import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import CSignup from './Pages/CSignup.jsx';
import Login from './Pages/Login.jsx';
import OSignup from './Pages/OSignup.jsx';
import ODashboard from './Pages/ODashboard.jsx';
import CDashboard from './Pages/CDashboard.jsx';
import OProfile from './Pages/Tables/OProfile.jsx';
export default function App() {
    return (
        <div className='appWrap' style={{ height: "100%", width: "100%" }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CSignup" element={<CSignup />} />
                <Route path="/CLogin" element={<Login />} />
                <Route path="/OSignup" element={<OSignup />} />
                <Route path="/CDashboard" element={<CDashboard />} />
                <Route path="/ODashboard" element={<ODashboard />} />
                <Route path="/OProfile" element={<OProfile />} />
            </Routes>
        </div>
    )
}