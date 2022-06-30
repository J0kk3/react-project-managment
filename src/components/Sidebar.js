import { NavLink } from 'react-router-dom';
//Styles & Images
import './Sidebar.css'
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

export default function Sidebar ()
{
    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    {/* Avatar & Username here later */ }
                    <p>Hey User</p>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                <img src={ DashboardIcon } alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink to="/create">
                                <img src={ AddIcon } alt="add project icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}