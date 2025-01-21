import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDetails from './components/PatientDetails';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                        <Route path="/patients/:patientId" element={<PatientDetails />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;