import React from 'react';

const Navbar = () => {
    return (
        <div className="sidebar">
            <h3>Główna nawigacja</h3>
            <ul>
                <li><a href="#home">Strona główna</a></li>
                <li>O nas</li>
                <li>Usługi</li>
                <li>Kontakt</li>
                <li>FAQ</li>
            </ul>
        </div>
    );
};

export default Navbar;