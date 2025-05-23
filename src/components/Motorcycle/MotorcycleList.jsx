import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Chip, Box, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, TextField } from '@mui/material';
import Swal from 'sweetalert2';

export default function MotorcycleList({ onEdit, motorcycles, reload }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedMoto, setSelectedMoto] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [date, setDate] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverId, setDriverId] = useState("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch("https://api-colombia.com/api/v1/Department");
                if (!response.ok) throw new Error("Error al obtener departamentos");

                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                console.error("Error al obtener los departamentos:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los departamentos.',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        };
        fetchDepartments();
    }, []);

    const handleOpenModal = (moto) => {
        setSelectedMoto(moto);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedDepartment("");
        setDate("");
        setDriverName("");
        setDriverId("");
    };

    const handleSaveZona = async () => {
        if (!selectedDepartment || !date || !driverName || !driverId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios.',
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }

        try {
            // Enviar la información al motserver
            const response = await fetch(`https://2f109bc7-dafe-4541-b33a-53f5aff72f4d.mock.pstmn.io${selectedMoto.id}/zone`, {
                method: 'PUT',
                body: JSON.stringify({
                    zone: selectedDepartment,
                    date,
                    driver: { name: driverName, id: driverId }
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error("Error al actualizar la zona");

            Swal.fire({
                icon: 'success',
                title: 'Zona guardada',
                text: `Se ha asignado la moto a ${selectedDepartment} el ${date}. Conductor: ${driverName}.`,
                timer: 1500,
                showConfirmButton: false
            });

            handleCloseModal();
            reload();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la zona en motserver.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    return (
        <Box sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h5" mb={2} sx={{ color: '#eee' }}>
                Lista de Motos
            </Typography>
            <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
                {motorcycles.map((moto) => (
                    <Grid item xs={12} sm={6} md={3} key={moto.id}>
                        <Card sx={{ color: '#eee' }}>
                            <CardContent>
                                <Typography variant="h6">{moto.license_plate}</Typography>
                                <Typography variant="subtitle1" sx={{ color: '#bbb' }}>
                                    {moto.brand} - {moto.year}
                                </Typography>
                                <Chip
                                    label={moto.status === "available" ? "Disponible" : "Ocupada"}
                                    color={moto.status === "available" ? "success" : "error"}
                                    sx={{ mt: 1, mb: 2 }}
                                />
                                <Button variant="outlined" size="small" onClick={() => onEdit(moto)} sx={{ mr: 1, borderColor: '#64b5f6', color: '#64b5f6' }}>
                                    Editar
                                </Button>
                                <Button variant="outlined" size="small" color="primary" onClick={() => handleOpenModal(moto)} sx={{ ml: 1 }}>
                                    Zonas
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal para seleccionar zona */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Seleccionar Zona</DialogTitle>
                <DialogContent>
                    <Typography>Moto: {selectedMoto?.license_plate}</Typography>

                    {/* Seleccionar Departamento */}
                    <Select fullWidth value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} sx={{ mt: 2 }}>
                        {departments.map((dept) => (
                            <MenuItem key={dept.id} value={dept.name}>
                                {dept.name}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* Campo para seleccionar la fecha */}
                    <TextField label="Fecha de asignación" type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} sx={{ mt: 2 }} InputLabelProps={{ shrink: true }} />

                    {/* Información del conductor */}
                    <TextField label="Nombre del Conductor" variant="outlined" fullWidth value={driverName} onChange={(e) => setDriverName(e.target.value)} sx={{ mt: 2 }} />
                    <TextField label="Identificación del Conductor" variant="outlined" fullWidth value={driverId} onChange={(e) => setDriverId(e.target.value)} sx={{ mt: 2 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="error">Cancelar</Button>
                    <Button onClick={handleSaveZona} color="primary">Guardar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
