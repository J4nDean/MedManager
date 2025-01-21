import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PatientDetails() {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [newPrescription, setNewPrescription] = useState({
        description: '',
        expiryDate: ''
    });

    useEffect(() => {
        fetch(`/api/doctors/1/patients/${patientId}`)
            .then(res => res.json())
            .then(data => setPatient(data))
            .catch(err => console.error('Error:', err));
    }, [patientId]);

    const handleAddPrescription = () => {
        fetch(`/api/doctors/1/patients/${patientId}/prescriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPrescription)
        })
            .then(res => res.json())
            .then(() => {
                // Odśwież dane pacjenta
                fetch(`/api/doctors/1/patients/${patientId}`)
                    .then(res => res.json())
                    .then(data => setPatient(data));
                setNewPrescription({ description: '', expiryDate: '' });
            })
            .catch(err => console.error('Error:', err));
    };

    if (!patient) return <div>Ładowanie...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{patient.firstName} {patient.lastName}</h2>

            <div className="mb-8 p-4 bg-white rounded shadow">
                <h3 className="text-xl mb-4">Nowa Recepta</h3>
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Opis recepty"
                        value={newPrescription.description}
                        onChange={e => setNewPrescription({...newPrescription, description: e.target.value})}
                        className="flex-1 p-2 border rounded"
                    />
                    <input
                        type="datetime-local"
                        value={newPrescription.expiryDate}
                        onChange={e => setNewPrescription({...newPrescription, expiryDate: e.target.value})}
                        className="p-2 border rounded"
                    />
                    <button
                        onClick={handleAddPrescription}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Dodaj
                    </button>
                </div>
            </div>

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
                        <td>{new Date(prescription.issueDate).toLocaleDateString()}</td>
                        <td>{new Date(prescription.expiryDate).toLocaleDateString()}</td>
                        <td>{prescription.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientDetails;