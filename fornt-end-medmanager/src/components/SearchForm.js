import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [formData, setFormData] = useState({
        name: '',
        specialization: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-gray-700">Imię i nazwisko:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Wpisz imię i nazwisko"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-gray-700">Specjalizacja:</label>
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Wpisz specjalizację"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Wyszukaj
            </button>
        </form>
    );
};

export default SearchForm;