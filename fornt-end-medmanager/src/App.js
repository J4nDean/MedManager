import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDetails from './components/PatientDetails';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                        <Route path="/doctor/patients/:patientId" element={<PatientDetails />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
