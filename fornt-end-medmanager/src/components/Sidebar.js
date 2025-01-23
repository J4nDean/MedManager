import { Link, useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    const isAuthenticated = localStorage.getItem('token');

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const getDashboardLink = () => {
        if (userRole === 'DOCTOR') {
            return `/doctors/${userId}/dashboard`;
        } else if (userRole === 'PATIENT') {
            return `/patients/${userId}/dashboard`;
        }
        return '/';
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

                    {userRole === 'DOCTOR' && (
                        <li>
                            <Link
                                to={getDashboardLink()}
                                className={`nav-item ${isActive(getDashboardLink())}`}
                            >
                                System Recept
                            </Link>
                        </li>
                    )}

                    {userRole === 'PATIENT' && (
                        <li>
                            <Link
                                to={getDashboardLink()}
                                className={`nav-item ${isActive(getDashboardLink())}`}
                            >
                                Mój Profil
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>

            <div className="sidebar-footer">
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="btn btn-danger w-full"
                    >
                        Wyloguj się
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="btn btn-primary w-full"
                    >
                        Zaloguj się
                    </button>
                )}
            </div>
        </div>
    );
}

export default Sidebar;