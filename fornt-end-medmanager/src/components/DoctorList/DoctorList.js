import React from 'react';

const DoctorList = ({ doctors, loading, error }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (doctors.length === 0) {
        return <div>No doctors found.</div>;
    }

    return (
        <table>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Specialization</th>
            </tr>
            </thead>
            <tbody>
            {doctors.map(doctor => (
                <tr key={doctor.id}>
                    <td>{doctor.imie}</td>
                    <td>{doctor.nazwisko}</td>
                    <td>{doctor.specjalizacja}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DoctorList;