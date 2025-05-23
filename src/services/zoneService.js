
export const getDepartments = async () => {
    try {
        const response = await fetch("https://api-colombia.com/api/v1/Department");
        if (!response.ok) throw new Error("Error al obtener departamentos");

        return await response.json();
    } catch (error) {
        console.error("Error al obtener los departamentos:", error);
        return [];
    }
};


export const updateMotorcycleZone = async (motorcycleId, zoneData) => {
    try {
        const response = await fetch(`https://api-colombia.com/api/v1/Department${motorcycleId}/zone`, {
            method: 'PUT',
            body: JSON.stringify({ zone: zoneData }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error("Error al actualizar la zona en motserver");

        return await response.json();
    } catch (error) {
        console.error("Error al actualizar la zona en motserver:", error);
        return null;
    }
};
