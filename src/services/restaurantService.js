// import { Restaurant } from "../models/restaurant";

const API_URL = `http://127.0.0.1:5000/restaurants`;


// Obtener todos los restaurantes
export const getRestaurants = async () => {
    console.log("aqui " + API_URL);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener restaurantes");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un restaurante por ID
export const getRestaurantById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("restaurante no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo restaurante
export const createRestaurant = async (restaurant) => {
    try {
        const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone,
        email: restaurant.email
      })
        });
        if (!response.ok) throw new Error("Error al crear restaurante");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar restaurante
export const updateRestaurant = async (id, restaurant) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(restaurant),
        });
        if (!response.ok) throw new Error("Error al actualizar restaurante");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar restaurante
export const deleteRestaurant = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar restaurante");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const restaurantService = {
    createRestaurant,
    deleteRestaurant,
    getRestaurantById,
    getRestaurants,
    updateRestaurant,
};