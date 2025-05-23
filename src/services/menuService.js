// menuService.js ajustado para tener estructura similar a motorcycle
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

// Convertimos el servicio para que devuelva la misma estructura que motorcycleService
export const getMenus = async () => {
    console.log("Obteniendo menús desde:", `${API_URL}/menus`);
    try {
        // Usamos axios en lugar de fetch para mantener consistencia
        const response = await axios.get(`${API_URL}/menus`);
        console.log("Respuesta de menús:", response);
        return response; // Devolvemos el objeto completo como motorcycleService
    } catch (error) {
        console.error("Error al obtener menús:", error);
        // Devolvemos un objeto similar a lo que devolvería axios en caso de éxito pero con array vacío
        return { data: [] };
    }
};

export const getMenuById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/menus/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return { data: null };
    }
};

export const createMenu = async (menu) => {
    try {
        const response = await axios.post(`${API_URL}/menus`, {
            restaurant_id: menu.restaurant_id,
            product_id: menu.product_id,
            price: menu.price,
            availability: menu.availability
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateMenu = async (id, menu) => {
    try {
        const response = await axios.put(`${API_URL}/menus/${id}`, menu);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteMenu = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/menus/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const menuService = {
    createMenu,
    deleteMenu,
    getMenuById,
    getMenus,
    updateMenu,
};
