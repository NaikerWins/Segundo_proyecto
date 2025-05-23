import axios from 'axios';

const API_URL = 'http://localhost:5000/shifts';

export const getShifts = () => axios.get(API_URL);
export const getShiftById = (id) => axios.get(`${API_URL}/${id}`);
export const createShift = (shift) => axios.post(API_URL, shift);
export const updateShift = (id, shift) => axios.put(`${API_URL}/${id}`, shift);
export const deleteShift = (id) => axios.delete(`${API_URL}/${id}`);
