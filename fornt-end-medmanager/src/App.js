import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import DoctorPanel from './pages/DoctorPanel';
import './styles.css';

const App = () => {
    return (
        <Router>
            <div className="app-wrapper">
                <Navigation />
                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<DoctorPanel />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;