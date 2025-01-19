import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ name, specialization });
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Imię i nazwisko:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Wpisz imię i nazwisko"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="specialization">Specjalizacja:</label>
                <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    placeholder="Wpisz specjalizację"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                />
            </div>
            <button type="submit" className="submit-button">
                Wyślij
            </button>
        </form>
    );
};

export default SearchForm;