import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1 className="sidebar-logo">MedManager</h1>
            </div>
            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <li>
                        <Link
                            to="/doctor/dashboard"
                            className={`nav-item ${isActive('/doctor/dashboard')}`}
                        >
                            Panel Lekarza
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/prescriptions"
                            className={`nav-item ${isActive('/prescriptions')}`}
                        >
                            Recepty
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/schedule"
                            className={`nav-item ${isActive('/schedule')}`}
                        >
                            Harmonogram
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            className={`nav-item ${isActive('/profile')}`}
                        >
                            Mój Profil
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;