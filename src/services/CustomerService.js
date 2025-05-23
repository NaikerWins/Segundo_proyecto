import axios from "axios";

const API = "http://localhost:5000/customers";

// Obtener todos los clientes
export const getCustomers = (token) =>
    axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

// Obtener cliente por email//arreglar funciion dejarla por id
export const getCustomerByEmail = async (email, token) => {
    const customers = await getCustomers(token);
    return customers.find(c => c.email === email);
};


// Crear un cliente
export const createCustomer = (data, token) =>
    axios.post(API, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);

// Eliminar un cliente
export const deleteCustomer = (id, token) =>
    axios.delete(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

// Actualizar un cliente
export const updateCustomer = (id, data, token) =>
    axios.put(`${API}/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(res => res.data);
