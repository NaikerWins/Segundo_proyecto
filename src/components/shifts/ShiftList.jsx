import {
    Box,
    Button,
    Card, CardContent,
    Grid,
    Typography
} from '@mui/material';
import Swal from 'sweetalert2';
import { deleteShift } from '../../services/shiftService';

export default function ShiftList({ shifts, onEdit, reload }) {
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar este turno?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });

        if (result.isConfirmed) {
            await deleteShift(id);
            reload();
            Swal.fire('Eliminado', 'El turno ha sido eliminado.', 'success');
        }
    };

    const handleEdit = (shift) => {
        Swal.fire({
            title: 'Modo edición',
            text: 'Ahora puedes editar el turno.',
            icon: 'info',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#3085d6',
        }).then(() => {
            onEdit(shift);
        });
    };

    return (
        <Box sx={{
            width: '100%',
            maxHeight: { xs: 200, sm: 500 },
            overflowY: 'auto',
            px: { xs: 0, sm: 2 },
        }}>
            <Typography variant="h5" mb={2} sx={{ color: '#eee', textAlign: 'center' }}>
                Lista de Turnos
            </Typography>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                width="100%"
            >
                {shifts.map((shift) => (
                    <Grid item xs={12} sm={12} md={10} key={shift.id} display="flex" justifyContent="center">
                        <Card sx={{
                            color: '#eee',
                            width: '100%',
                            maxWidth: 420,
                            mx: "auto",
                        }}>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    Turno ID: {shift.id}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Conductor ID: {shift.driver_id}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Moto ID: {shift.motorcycle_id}
                                </Typography>
                                <Typography variant="body2">
                                    Inicio: {shift.start_time}
                                </Typography>
                                <Typography variant="body2">
                                    Fin: {shift.end_time || '—'}
                                </Typography>
                                <Typography variant="body2">
                                    Estado: {shift.status}
                                </Typography>
                                <Box mt={2}>
                                    <Button
                                        onClick={() => handleEdit(shift)}
                                        sx={{ mr: 1 }}
                                        variant="outlined"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        onClick={() => handleDelete(shift.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}