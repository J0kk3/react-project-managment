import Link from "react-router-dom";
//Styles & Images
import './Navbar.css'
import Temple from "../assets/temple.svg";

export default function Navbar ()
{
    return (
        <nav className="navbar">
            <ul>
                <li className="logo">
                    <img src={ Temple } alt="logo" />
                    <span>Project Management</span>
                </li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><button className="btn">Logout</button></li>
            </ul>
        </nav>
    );
}