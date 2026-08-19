import TRIPNEST from './../assets/TRIPNEST.png'
import { Link } from 'react-router-dom'
import './../App.css'
function Navbar({ isLogin, setIslogin }) {
    return (
            <nav className="navbar">

                <div className="heading">
                    <img src={TRIPNEST} alt="TripNest Logo" className="logo" />
                    <div className="brandtext">
                        <h1 className="heading1">TRIPNEST</h1>
                        <p>Plan your Journey Peacefully</p>
                    </div>
                </div>

                <ul className="navLinks">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/tours">Tours</Link></li>
                    {!isLogin && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">SignUp</Link></li>
                        </>)}
                    {isLogin && (
                        <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/" onClick={() => setIslogin(false)} >Logout</Link></li>
                    </>)}
                </ul>
            </nav >
    )
}
export default Navbar