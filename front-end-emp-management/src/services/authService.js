import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/'; 

export const register = (userData) => {
    return axios.post(`${API_BASE_URL}registration/`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const login = (credentials) => {
    return axios.post(`${API_BASE_URL}login/`, credentials, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};


const getCsrfToken = () => {
    let csrfToken = '';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=').map(c => c.trim());
        if (key === 'csrftoken') {
            csrfToken = value;
            break;
        }
    }
    return csrfToken;
};
