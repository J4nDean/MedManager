import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PatientDetails() {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [newPrescription, setNewPrescription] = useState({
        description: '',
        expiryDate: ''
    });
    const [error, setError] = useState('');

    const API_BASE_URL = 'http://localhost:8080';

    useEffect(() => {
        fetchPatientDetails();
    }, [patientId]);

    const fetchPatientDetails = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/doctors/1/patients/${patientId}`);
            if (!response.ok) throw new Error('Failed to fetch patient details');
            const data = await response.json();
            setPatient(data);
        } catch (err) {
            setError('Error loading patient details');
            console.error('Error:', err);
        }
    };

    const handleAddPrescription = async () => {
        try {
            if (!newPrescription.description || !newPrescription.expiryDate) {
                setError('Proszę wypełnić wszystkie pola');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/doctors/1/patients/${patientId}/prescriptions`, {
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

    if (!patient) return <div>Ładowanie...</div>;

    const getStatusClass = (status) => {
        switch (status) {
            case 'ACTIVE': return 'status-active';
            case 'EXPIRED': return 'status-expired';
            case 'COMPLETED': return 'status-completed';
            default: return '';
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
        <div className="patient-page">
            <div className="patient-header">
                <div className="patient-info">
                    <div>
                        <h2 className="patient-name">{patient.firstName} {patient.lastName}</h2>
                        <p className="patient-pesel">PESEL: {patient.pesel}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Data przypisania:</p>
                        <p className="text-sm font-medium">
                            {new Date(patient.assignmentDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="content-grid">
                {/* Formularz dodawania recepty */}
                <div className="card">
                    <div className="card-header">
                        Nowa Recepta
                    </div>
                    <div className="card-content">
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <label className="form-label">Opis</label>
                            <textarea
                                className="form-textarea"
                                placeholder="Wprowadź opis recepty"
                                value={newPrescription.description}
                                onChange={e => setNewPrescription({...newPrescription, description: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Data ważności</label>
                            <input
                                type="datetime-local"
                                className="form-input"
                                value={newPrescription.expiryDate}
                                onChange={e => setNewPrescription({...newPrescription, expiryDate: e.target.value})}
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

                {/* Lista recept */}
                <div className="card">
                    <div className="card-header">
                        Historia Recept
                    </div>
                    <div className="card-content">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Opis</th>
                                <th>Data wystawienia</th>
                                <th>Data ważności</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {patient.prescriptions?.map(prescription => (
                                <tr key={prescription.id}>
                                    <td>{prescription.description}</td>
                                    <td>{new Date(prescription.issueDate).toLocaleString()}</td>
                                    <td>{new Date(prescription.expiryDate).toLocaleString()}</td>
                                    <td>
                                            <span className={`status-badge ${getStatusClass(prescription.status)}`}>
                                                {getStatusText(prescription.status)}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientDetails;