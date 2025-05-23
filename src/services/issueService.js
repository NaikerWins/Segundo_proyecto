import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Ajusta según tu backend

export const getIssues = () => axios.get(`${API_URL}/issues`);

export const createIssue = (data) => axios.post(`${API_URL}/issues`, data);

export const updateIssue = (id, data) => axios.put(`${API_URL}/issues/${id}`, data);

export const deleteIssue = (id) => axios.delete(`${API_URL}/issues/${id}`);

export const uploadPhoto = (formData) =>
    axios.post(`${API_URL}/photos/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const getPhotoUrl = (photoPath) => {
    return `http://localhost:5000/${photoPath}`;
};
