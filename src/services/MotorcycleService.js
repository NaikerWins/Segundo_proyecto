import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Cambia si el backend está en otro puerto

export const getMotorcycles = () => axios.get(`${API_URL}/motorcycles`);
export const getMotorcycleById = (id) => axios.get(`${API_URL}/motorcycles/${id}`);
export const createMotorcycle = (data) => axios.post(`${API_URL}/motorcycles`, data);
export const updateMotorcycle = (id, data) => axios.put(`${API_URL}/motorcycles/${id}`, data);
export const deleteMotorcycle = (id) => axios.delete(`${API_URL}/motorcycles/${id}`);
