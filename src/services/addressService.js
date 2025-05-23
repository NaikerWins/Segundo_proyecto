import axios from 'axios';

const API_URL = 'http://localhost:5000/addresses';

export const getAddresses = () => axios.get(API_URL);
export const getAddressById = (id) => axios.get(`${API_URL}/${id}`);
export const createAddress = (data) => axios.post(API_URL, data);
export const updateAddress = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteAddress = (id) => axios.delete(`${API_URL}/${id}`);
