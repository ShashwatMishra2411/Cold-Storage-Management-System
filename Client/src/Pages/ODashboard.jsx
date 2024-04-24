import { Link } from 'react-router-dom';
import './ODashboard.css';
export default function ODashboard() {
    return (
        <div className="back">
            <div style={{ fontSize: "50px" }}>DASHBOARD</div>
            <div className="hub">
                <div className="row">
                    <Link to="/OProfile" className="tile" style={{ width: "35%" }}><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z"></path></g></svg>Profile</Link>
                    <Link to="/OCustomers" className='tile' style={{ width: "65%" }}><svg fill="#ffffff" viewBox="0 0 100 100" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M57.4,38.4A18.1,18.1,0,1,1,39.3,20.2,18.12,18.12,0,0,1,57.4,38.4ZM32.6,30.2c-1.3,0-2.3,1.3-2.3,3.1,0,1.6.9,3.1,2.3,3.1s2.3-1.3,2.3-3.1C34.7,31.6,33.8,30.2,32.6,30.2Zm13.5,0c-1.3,0-2.3,1.3-2.3,3.1,0,1.6.9,3.1,2.3,3.1s2.3-1.3,2.3-3.1S47.5,30.2,46.1,30.2ZM28,40.7c.5,5.7,4.7,10.6,11.2,10.6A11.28,11.28,0,0,0,50.7,40.7Z"></path><path d="M79.6,45.4A1.37,1.37,0,0,0,78.2,44l-14.6-.1a1.29,1.29,0,0,0-1.4,1.3v2.6a1.37,1.37,0,0,0,1.4,1.4l4.5.1a.89.89,0,0,1,.6,1.5l-20,20.1a1,1,0,0,1-.9-.2L37.1,59.8a1.37,1.37,0,0,0-1.8-.1h0l-.1.1h0l-1.9,1.9a.1.1,0,0,1-.1.1L20.6,74.4a1.39,1.39,0,0,0,0,1.9l1.9,1.9a1.39,1.39,0,0,0,1.9,0L34.8,67.9a1.87,1.87,0,0,1,2.6-.1L47.6,78.1a1.17,1.17,0,0,0,1.9,0L72.7,54.7a.88.88,0,0,1,1.5.6l.1,4.5a1.37,1.37,0,0,0,1.4,1.4h2.6a1.29,1.29,0,0,0,1.4-1.3Z"></path></g></svg>Customers</Link>
                </div>
                <div className="row">
                    <Link to="/OChambers" className="tile" style={{ width: "70%" }}><svg fill="#ffffff" width="163px" height="163px" viewBox="0 0 50 50" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" overflow="inherit" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 6h44v5h-44zm3 7v33h38v-33h-38zm26 9h-15v-3h15v3z"></path></g></svg>Chambers</Link>
                    <Link to="/OFinances" className="tile" style={{ width: "30%" }}><svg fill="#ffffff" width="245px" height="245px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M541.7 768v-45.3c46.3-2.4 81.5-15 108.7-37.8 27.2-22.8 40.8-53.1 40.8-88.2 0-37.8-11-65.7-35.3-83.4-24.6-20.1-59.8-35.4-111.6-45.3h-2.6V351.8c35.3 5.1 65.3 15 95.1 35.4l43.6-55.5c-43.6-27.9-89.9-42.9-138.8-45.3V256h-40.8v30.3c-40.8 2.4-76.3 15-103.5 37.8-27.2 22.8-40.8 53.1-40.8 88.2s11 63 35.3 80.7c21.7 17.7 59.8 32.7 108.7 42.9v118.5c-38.2-5.1-76.3-22.8-114.2-53.1l-48.9 53.1c48.9 40.5 103.5 63 163.3 68.1V768h41zm2.6-219.6c27.2 7.5 43.6 15 54.4 22.8 8.1 10.2 13.6 20.1 13.6 35.4s-5.5 25.2-19.1 35.4c-13.6 10.2-30.1 15-48.9 17.7V548.4zM449.2 440c-8.1-7.5-13.6-20.1-13.6-32.7 0-15 5.5-25.2 16.2-35.4 13.6-10.2 27.2-15 48.9-17.7v108.6c-27.2-7.8-43.4-15.3-51.5-22.8z"></path></g></svg>Finances</Link>
                </div>
                <div className="row">
                    <Link to="/OWorkingCapital" className="tile" style={{ width: "40%" }}>Working Capital</Link>
                    <Link to="/OFixedCapital" className="tile" style={{ width: "60%" }}>Fixed Capital</Link>
                </div>
            </div>
        </div>
    );
}