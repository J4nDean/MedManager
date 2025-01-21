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
                            to="/"
                            className={`nav-item ${isActive('/')}`}
                        >
                            Strona Główna
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;