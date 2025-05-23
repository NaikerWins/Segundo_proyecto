// import { Restaurant } from "../models/restaurant";

const API_URL = `http://127.0.0.1:5000/drivers`;


// Obtener todos los restaurantes
export const getDrivers = async () => {
    console.log("aqui " + API_URL);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener a los conductores");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un restaurante por ID
export const getDriverById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Conductor no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo restaurante
export const createDriver = async (driver) => {
    try {
        const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: driver.name,
        license_number: driver.license_number,
        phone: driver.phone,
        email: driver.email,
        status: driver.status
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
export const updateDriver = async (id, driver) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(driver),
        });
        if (!response.ok) throw new Error("Error al actualizar restaurante");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar restaurante
export const deleteDriver = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar restaurante");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const driverService = {
    createDriver,
    deleteDriver,
    getDriverById,
    getDrivers,
    updateDriver,
};