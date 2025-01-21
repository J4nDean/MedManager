import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/doctors/1/patients')
            .then(res => res.json())
            .then(data => setPatients(data))
            .catch(err => console.error('Error:', err));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Moi Pacjenci</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Imię i Nazwisko</th>
                    <th>PESEL</th>
                    <th>Data przypisania</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {patients.map(patient => (
                    <tr key={patient.id}>
                        <td>{patient.firstName} {patient.lastName}</td>
                        <td>{patient.pesel}</td>
                        <td>{new Date(patient.assignmentDate).toLocaleDateString()}</td>
                        <td>
                            <button
                                onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Szczegóły
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DoctorDashboard;
