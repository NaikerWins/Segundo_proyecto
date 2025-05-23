import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, TextField, Typography } from "@mui/material";
import { getDepartments } from "../../services/zoneService";

export default function ZonesModal({ open, onClose, moto }) {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [date, setDate] = useState(""); // Inicia vacío para permitir selección manual
    const [driverName, setDriverName] = useState("");
    const [driverId, setDriverId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDepartments();
            setDepartments(data);
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        if (!selectedDepartment || !date || !driverName || !driverId) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            // Enviar datos al motserver
            const response = await fetch(`https://motserver.com/api/v1/motorcycles/${moto.id}/zone`, {
                method: "PUT",
                body: JSON.stringify({
                    zone: selectedDepartment,
                    date,
                    driver: { name: driverName, id: driverId }
                }),
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("Error al actualizar la zona en motserver");

            alert(`Moto ${moto.license_plate} asignada a ${selectedDepartment} el ${date}. Conductor: ${driverName}`);
            onClose();
        } catch (error) {
            console.error("Error al enviar la zona al motserver:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Asignar Zona</DialogTitle>
            <DialogContent>
                <Typography>Moto: {moto?.license_plate}</Typography>

                {/* Seleccionar Departamento */}
                <Select
                    fullWidth
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    sx={{ mt: 2 }}
                >
                    {departments.map((dept) => (
                        <MenuItem key={dept.id} value={dept.name}>
                            {dept.name}
                        </MenuItem>
                    ))}
                </Select>

                {/* Campo para seleccionar la fecha */}
                <TextField
                    label="Fecha de asignación"
                    type="date"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    sx={{ mt: 2 }}
                    InputLabelProps={{ shrink: true }} // Esto asegura que el label no se superponga
                />

                {/* Información del conductor */}
                <TextField
                    label="Nombre del Conductor"
                    variant="outlined"
                    fullWidth
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    sx={{ mt: 2 }}
                />

                <TextField
                    label="Identificación del Conductor"
                    variant="outlined"
                    fullWidth
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    sx={{ mt: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}