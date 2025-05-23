import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getPhotos = () => axios.get(`${API_URL}/photos`);

export const getPhotoById = (id) => axios.get(`${API_URL}/photos/${id}`);

export const uploadPhoto = (formData) =>
    axios.post(`${API_URL}/photos/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updatePhoto = (id, data) =>
    axios.put(`${API_URL}/photos/${id}`, data);

export const deletePhoto = (id) =>
    axios.delete(`${API_URL}/photos/${id}`);
    