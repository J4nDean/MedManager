const API_URL = 'http://localhost:8080/api';

export const doctorService = {
    getAllDoctors: async (sort, specialization) => {
        let url = `${API_URL}/doctors`;
        const params = new URLSearchParams();

        if (sort) params.append('sort', sort);
        if (specialization) params.append('specialization', specialization);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Nie udało się pobrać danych lekarzy');
        }
        return response.json();
    },

    registerDoctor: async (doctorData) => {
        const response = await fetch(`${API_URL}/doctors/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctorData),
        });
        if (!response.ok) {
            throw new Error('Nie udało się zarejestrować lekarza');
        }
        return response.json();
    }
};

export const userService = {
    registerUser: async (userData) => {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Nie udało się zarejestrować użytkownika');
        }
        return response.json();
    },

    getAllUsers: async () => {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error('Nie udało się pobrać danych użytkowników');
        }
        return response.json();
    }
};