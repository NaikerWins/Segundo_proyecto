import {
    Card, CardContent, Button, Typography, Stack,
    Box, Grid, Divider, Chip, Avatar, Tooltip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const getStatusColor = (status) => {
    switch (status) {
        case "entregado": return "success";
        case "en progreso": return "info";
        case "pendiente": return "warning";
        case "cancelado": return "error";
        default: return "default";
    }
};

export default function OrderList({ orders, onEdit, onDelete }) {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar este pedido?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6a1b9a',  // morado oscuro
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await onDelete(id);
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'El pedido ha sido eliminado.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    // Custom colors for status chips to use purple shades
    const statusColors = {
        "entregado": "#7b1fa2", // morado oscuro
        "en progreso": "#9575cd", // morado claro
        "pendiente": "#ce93d8", // morado pastel
        "cancelado": "#f48fb1", // rosa claro
        "default": "#b39ddb" // gris morado
    };

    return (
        <Box p={1}>
            {Array.isArray(orders) && orders.length > 0 ? (
                orders.map(order => (
                    <Card
                        key={order.id}
                        sx={{
                            mb: 3,
                            boxShadow: 4,
                            borderRadius: 3,
                            backgroundColor: '#ede7f6',  // lila muy claro
                            transition: "transform 0.15s, box-shadow 0.15s",
                            '&:hover': {
                                transform: "scale(1.015)",
                                boxShadow: '0 4px 20px 0 rgba(106, 27, 154, 0.7)', // sombra morada
                            }
                        }}
                    >
                        <CardContent>
                            <Grid container spacing={2}>
                                {/* ID, Estado y Botones juntos */}
                                <Grid item xs={12} md={3}>
                                    <Stack spacing={2}>
                                        {/* ID y Estado */}
                                        <Stack spacing={1} alignItems="flex-start">
                                            <Chip
                                                label={`#${order.id}`}
                                                color="primary"
                                                size="medium"
                                                avatar={<Avatar sx={{ bgcolor: '#6a1b9a' }}><RestaurantMenuIcon sx={{ color: 'white' }} /></Avatar>}
                                                sx={{
                                                    fontWeight: 700,
                                                    backgroundColor: '#9c27b0',
                                                    color: 'white',
                                                }}
                                            />
                                            <Chip
                                                label={order.status ? order.status.replace('_', ' ') : 'N/A'}
                                                size="medium"
                                                sx={{
                                                    textTransform: "capitalize",
                                                    fontWeight: 700,
                                                    backgroundColor: statusColors[order.status?.toLowerCase()] || statusColors.default,
                                                    color: 'white',
                                                }}
                                            />
                                        </Stack>

                                        {/* Botones */}
                                        <Stack direction="column" spacing={1}>
                                            <Tooltip title="Editar">
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => onEdit(order)}
                                                    sx={{
                                                        borderColor: '#6a1b9a',
                                                        color: '#6a1b9a',
                                                        '&:hover': {
                                                            backgroundColor: '#6a1b9a',
                                                            color: 'white'
                                                        }
                                                    }}
                                                >
                                                    Editar
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Eliminar">
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                onClick={() => handleDelete(order.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Ver Mapa">
                                                <span>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        startIcon={<LocationOnIcon />}
                                                        onClick={() => navigate(`/mapa-moto/${order.motorcycle?.license_plate}`)}
                                                        disabled={!order.motorcycle?.license_plate}
                                                        sx={{
                                                            backgroundColor: '#6a1b9a',
                                                            '&:hover': {
                                                                backgroundColor: '#4a148c',
                                                            }
                                                        }}
                                                    >
                                                        Mapa
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                {/* Información principal */}
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <AccountCircleIcon fontSize="small" sx={{ color: '#6a1b9a' }} />
                                            <Typography variant="body1" fontWeight={500} sx={{ color: '#4a148c' }}>
                                                {order.customer?.name || order.customer?.nombre || `Cliente ${order.customer_id}` || 'N/A'}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <RestaurantMenuIcon fontSize="small" sx={{ color: '#6a1b9a' }} />
                                            <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                                                {order.menu?.name || `Menú ${order.menu_id}` || 'N/A'}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <DirectionsBikeIcon fontSize="small" sx={{ color: '#6a1b9a' }} />
                                            <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                                                {order.motorcycle?.license_plate ||
                                                    (order.motorcycle ? `Moto ${order.motorcycle.id}` : 'Sin moto')}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <AttachMoneyIcon fontSize="small" sx={{ color: '#6a1b9a' }} />
                                            <Typography variant="body2" color="primary" fontWeight="bold" sx={{ color: '#7b1fa2' }}>
                                                ${order.total_price || 'N/A'}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CalendarTodayIcon fontSize="small" sx={{ color: '#6a1b9a' }} />
                                            <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                                                {order.created_at ? new Date(order.created_at).toLocaleString() : 'Sin fecha'}
                                            </Typography>
                                        </Stack>

                                        {/* Dirección agregada */}
                                        {order.address && (
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <LocationOnIcon sx={{ color: '#6a1b9a' }} />
                                                <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                                                    {order.address.street}, {order.address.city}, {order.address.state}
                                                </Typography>
                                            </Stack>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                    </Card>
                ))
            ) : (
                <Typography variant="body1" align="center" color="text.secondary">
                    No hay pedidos para mostrar.
                </Typography>
            )}
        </Box>
    );
}
