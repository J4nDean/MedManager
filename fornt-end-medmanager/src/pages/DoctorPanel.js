import React, { useState, useEffect } from 'react';
import '../styles.css';

const DoctorPanel = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [referralForm, setReferralForm] = useState({
        patient: '',
        description: ''
    });
    const [prescriptionForm, setPrescriptionForm] = useState({
        patient: '',
        medication: '',
        validUntil: ''
    });

    // Przykładowe dane
    useEffect(() => {
        setPatients([
            {
                id: 1,
                name: 'Jan Kowalski',
                referrals: [
                    { description: 'Skierowanie na badanie krwi', status: 'active' },
                    { description: 'Skierowanie do kardiologa', status: 'active' }
                ],
                prescriptions: [
                    { medication: 'Paracetamol', validUntil: '20.12.2023', status: 'active' },
                    { medication: 'Aspiryna', validUntil: '15.01.2024', status: 'active' }
                ]
            }
        ]);
    }, []);

    const handleReferralSubmit = (e) => {
        e.preventDefault();
        // Tutaj logika wysyłania skierowania
        console.log('Nowe skierowanie:', referralForm);
        setReferralForm({ patient: '', description: '' });
    };

    const handlePrescriptionSubmit = (e) => {
        e.preventDefault();
        // Tutaj logika wysyłania recepty
        console.log('Nowa recepta:', prescriptionForm);
        setPrescriptionForm({ patient: '', medication: '', validUntil: '' });
    };

    return (
        <div className="doctor-panel">
            <div className="content-section">
                <h2 className="section-header">Lista Pacjentów</h2>
                {patients.map(patient => (
                    <div key={patient.id} className="patient-card" onClick={() => setSelectedPatient(patient)}>
                        <h3>{patient.name}</h3>
                        <div className="subsection">
                            <h4>Skierowania:</h4>
                            <ul>
                                {patient.referrals.map((referral, index) => (
                                    <li key={index}>{referral.description}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="subsection">
                            <h4>Recepty:</h4>
                            <ul>
                                {patient.prescriptions.map((prescription, index) => (
                                    <li key={index}>
                                        Lek: {prescription.medication}, Ważna do: {prescription.validUntil}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="content-section">
                <h2 className="section-header">Wystaw Skierowanie</h2>
                <form onSubmit={handleReferralSubmit} className="form">
                    <div className="form-group">
                        <label>Pacjent:</label>
                        <input
                            type="text"
                            value={referralForm.patient}
                            onChange={(e) => setReferralForm({...referralForm, patient: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Opis skierowania:</label>
                        <textarea
                            value={referralForm.description}
                            onChange={(e) => setReferralForm({...referralForm, description: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="submit-button">Wystaw skierowanie</button>
                </form>
            </div>

            <div className="content-section">
                <h2 className="section-header">Wystaw Receptę</h2>
                <form onSubmit={handlePrescriptionSubmit} className="form">
                    <div className="form-group">
                        <label>Pacjent:</label>
                        <input
                            type="text"
                            value={prescriptionForm.patient}
                            onChange={(e) => setPrescriptionForm({...prescriptionForm, patient: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nazwa leku:</label>
                        <input
                            type="text"
                            value={prescriptionForm.medication}
                            onChange={(e) => setPrescriptionForm({...prescriptionForm, medication: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ważna do (data):</label>
                        <input
                            type="date"
                            value={prescriptionForm.validUntil}
                            onChange={(e) => setPrescriptionForm({...prescriptionForm, validUntil: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="submit-button">Wystaw receptę</button>
                </form>
            </div>

            <div className="content-section">
                <h2 className="section-header">Wylogowanie</h2>
                <button onClick={() => console.log('Wylogowanie')} className="logout-button">
                    Kliknij tutaj, aby się wylogować
                </button>
            </div>
        </div>
    );
};

export default DoctorPanel;