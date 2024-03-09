import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import CSignup from './Pages/CSignup.jsx';
import CLogin from './Pages/CLogin.jsx';
import OSignup from './Pages/OSignup.jsx';
import OLogin from './Pages/OLogin.jsx';
import CDashboard from './Pages/CDashboard.jsx';
import ODashboard from './Pages/ODashboard.jsx';
export default function App() {
    return (
        <div className='appWrap' style={{ height: "100%", width: "100%" }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CSignup" element={<CSignup />} />
                <Route path="/CLogin" element={<CLogin />} />
                <Route path="/OSignup" element={<OSignup />} />
                <Route path="/OLogin" element={<OLogin />} />
                <Route path="/CDashboard" element={<CDashboard />} />
                <Route path="/ODashboard" element={<ODashboard />} />
            </Routes>
        </div>
    )
}