import { Link } from 'react-router-dom';
export default function Home() {
    const home = {
        backgroundColor: 'aquamarine',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Bungee',
    };
    const signBut = {
        backgroundColor: 'black',
        color: 'white',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        fontSize: '20px',
        textDecoration: 'none',
    };
    return (
        <div className="home" style={home}>
            <div className="welcome" style={{ fontSize: '40px' }}> Welcome to FrosTrack</div>
            <div className="subWelcome" style={{ fontSize: '20px' }}>New here? Choose your business</div>
            <div style={{ display: 'inline-flex', }}>
                <Link to="/CSignup" className='signBut' style={signBut}>Customer</Link>
                <Link to="/OSignup" className='signBut' style={signBut}>Owner</Link>
            </div>
            <div className='logBut'>
                <Link to="/CLogin">already have an account?</Link>
            </div>
        </div>
    )
}