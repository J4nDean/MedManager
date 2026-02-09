import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';

function PatientDetails() {
    const { doctorId, patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [newPrescription, setNewPrescription] = useState({
        description: '',
        expiryDate: ''
    });
    const [error, setError] = useState('');

    const API_BASE_URL = 'http://localhost:8080';

    const fetchPatientDetails = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/doctors/${doctorId}/patients/${patientId}`);
            if (!response.ok) throw new Error('Failed to fetch patient details');
            const data = await response.json();
            setPatient(data);
        } catch (err) {
            setError('Error loading patient details');
            console.error('Error:', err);
        }
    }, [doctorId, patientId]);

    useEffect(() => {
        fetchPatientDetails();
    }, [fetchPatientDetails]);

    const handleAddPrescription = async () => {
        try {
            if (!newPrescription.description || !newPrescription.expiryDate) {
                setError('Proszę wypełnić wszystkie pola');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/doctors/${doctorId}/patients/${patientId}/prescriptions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    description: newPrescription.description,
                    expiryDate: newPrescription.expiryDate + ':00',
                    status: 'ACTIVE',
                    issueDate: new Date().toISOString()
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Błąd podczas tworzenia recepty: ${errorData}`);
            }

            await fetchPatientDetails();
            setNewPrescription({ description: '', expiryDate: '' });
            setError('');
        } catch (err) {
            setError('Błąd: ' + err.message);
            console.error('Error:', err);
        }
    };

    const handleDeletePrescription = async (prescriptionId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/doctors/${doctorId}/prescriptions/${prescriptionId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Nie udało się usunąć recepty');
            }

            await fetchPatientDetails();
        } catch (err) {
            setError('Błąd podczas usuwania recepty: ' + err.message);
            console.error('Error:', err);
        }
    };

    if (!patient) return <div className="loading-state">Ładowanie...</div>;

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'ACTIVE': return 'status-badge status-active';
            case 'EXPIRED': return 'status-badge status-expired';
            case 'COMPLETED': return 'status-badge status-completed';
            default: return 'status-badge';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'ACTIVE': return 'Aktywna';
            case 'EXPIRED': return 'Wygasła';
            case 'COMPLETED': return 'Zrealizowana';
            default: return status;
        }
    };

    return (
        <div className="container">
            <div className="card mt-4">
                <div className="card-header">
                    <div className="patient-header">
                        <div className="patient-info">
                            <h1>{patient.firstName} {patient.lastName}</h1>
                            <div className="patient-details">
                                <p>PESEL: {patient.pesel}</p>
                                <p>Data przypisania: {new Date(patient.assignmentDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <BackButton />
                    </div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                <div className="card-header">
                    <h2>Nowa Recepta</h2>
                </div>
                <div className="card-content">
                    <div className="form-group">
                        <label className="form-label">Opis</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Wprowadź opis recepty"
                            value={newPrescription.description}
                            onChange={e => setNewPrescription({
                                ...newPrescription,
                                description: e.target.value
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Data ważności</label>
                        <input
                            type="datetime-local"
                            className="form-input"
                            value={newPrescription.expiryDate}
                            onChange={e => setNewPrescription({
                                ...newPrescription,
                                expiryDate: e.target.value
                            })}
                        />
                    </div>
                    <button
                        onClick={handleAddPrescription}
                        className="btn btn-primary"
                    >
                        Dodaj receptę
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="text-xl font-semibold">Historia Recept</h2>
                </div>
                <div className="card-content">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Lekarz</th>
                            <th>Opis</th>
                            <th>Data wystawienia</th>
                            <th>Data ważności</th>
                            <th>Status</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {patient.prescriptions?.map(prescription => (
                            <tr key={prescription.id}>
                                <td>{prescription.doctorFirstName} {prescription.doctorLastName}</td>
                                <td>{prescription.description}</td>
                                <td>{new Date(prescription.issueDate).toLocaleString()}</td>
                                <td>{new Date(prescription.expiryDate).toLocaleString()}</td>
                                <td>
                                        <span className={getStatusBadgeClass(prescription.status)}>
                                            {getStatusText(prescription.status)}
                                        </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeletePrescription(prescription.id)}
                                        className="btn btn-danger"
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {!patient.prescriptions?.length && (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-4">
                                    Brak recept
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PatientDetails;