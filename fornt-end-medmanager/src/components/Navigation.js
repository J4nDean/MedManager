import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="sidebar">
            <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px' }}>
                MedManager
            </Link>
            <Link to="/">Strona główna</Link>
            <Link to="/o-nas">O nas</Link>
            <Link to="/uslugi">Usługi</Link>
            <Link to="/kontakt">Kontakt</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/panel-lekarza">Lista pacjentów</Link>
            <Link to="/panel-lekarza">Wystaw skierowanie</Link>
            <Link to="/panel-lekarza">Wystaw receptę</Link>
        </nav>
    );
};

export default Navigation;