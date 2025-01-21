import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold">MedManager</h1>
            </div>
            <nav className="p-4">
                <ul className="space-y-2">
                    <li>
                        <Link to="/doctor/dashboard" className="block p-2 hover:bg-gray-100 rounded">
                            Panel Lekarza
                        </Link>
                    </li>
                    <li>
                        <Link to="/prescriptions" className="block p-2 hover:bg-gray-100 rounded">
                            Recepty
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
