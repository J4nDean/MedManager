import React from 'react';

const DoctorList = ({ doctors }) => {
    if (!doctors.length) {
        return (
            <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p>Nie znaleziono żadnych lekarzy</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
                <div key={doctor.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-lg">{doctor.imie} {doctor.nazwisko}</h3>
                    <p className="text-gray-600">Specjalizacja: {doctor.specjalizacja}</p>
                    <p className="text-gray-600">Email: {doctor.email}</p>
                    <p className="text-gray-600">Telefon: {doctor.telefon}</p>
                </div>
            ))}
        </div>
    );
};

export default DoctorList;