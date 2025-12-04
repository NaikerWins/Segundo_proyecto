import { Box, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import ShiftForm from '../../components/shifts/shiftForm';
import ShiftList from '../../components/shifts/shiftList';
import { getShifts } from '../../services/shiftService';

// Componente principal de la página de turnos
export default function Shifts() {
    // Estado para la lista de turnos
    const [shifts, setShifts] = useState([]);
    // Estado para el turno seleccionado (para editar)
    const [selectedShift, setSelectedShift] = useState(null);

    // Función para cargar los turnos desde el servicio
    const loadShifts = async () => {
        try {
            const res = await getShifts();
            setShifts(res.data || res); // Guarda los turnos en el estado
        } catch (error) {
            console.error("Error cargando turnos:", error);
        }
    };

    // Carga los turnos al montar el componente
    useEffect(() => {
        loadShifts();
    }, []);

    return (
        // Box externo para el layout general (puedes eliminar este si no lo necesitas)
        <Box display="flex" height="100vh" pt="30px" >
            {/* Box principal que ocupa toda la pantalla y da fondo */}
            <Box
                minHeight="100vh"
                width="100vw"
                bgcolor="var(--background)" // Color de fondo desde variables CSS o theme
                display="flex"
                justifyContent="center" // Centra el contenido horizontalmente
                alignItems="flex-start" // Alinea el contenido arriba
                pt="40px"  // Padding top para separar del navbar en móvil
                pb={4}     // Padding bottom
            >
                {/* Paper: cuadro central con sombra y borde redondeado */}
                <Paper
                    elevation={4}
                    sx={{
                        width: { xs: '98%', sm: 600, md: 1000 }, // Ancho responsivo
                        p: { xs: 2, sm: 3 },                    // Padding responsivo
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' }, // Columna en móvil, fila en desktop
                        gap: 2,                                  // Espacio entre form y lista
                        bgcolor: 'var(--card)',                  // Fondo del card
                        borderRadius: 3,                         // Bordes redondeados
                        height: 'auto',                          // Crece según el contenido
                        maxHeight: 'none',
                    }}
                >
                    {/* Formulario de turnos, ocupa la mitad (o todo en móvil) */}
                    <Box
                        flex={1}
                        minWidth={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <ShiftForm
                            selected={selectedShift}         // Turno seleccionado para editar
                            clear={() => setSelectedShift(null)} // Limpia la selección
                            reload={loadShifts}              // Recarga la lista al guardar
                        />
                    </Box>
                    {/* Lista de turnos, ocupa la otra mitad (o todo en móvil) */}
                    <Box
                        flex={1}
                        minWidth={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="flex-start"
                        className="customers-scrollbar" // Clase para personalizar el scroll
                    >
                        <ShiftList
                            shifts={shifts}               // Lista de turnos
                            onEdit={setSelectedShift}     // Selecciona un turno para editar
                            reload={loadShifts}           // Recarga la lista al eliminar
                        />
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}