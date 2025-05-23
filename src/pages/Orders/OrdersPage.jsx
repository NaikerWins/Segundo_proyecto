import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
    getOrders, createOrder, updateOrder, deleteOrder
} from '../../services/orderService';
import { getCustomers } from '../../services/customerService';
import { getMenus } from '../../services/menuService';
import { getMotorcycles } from '../../services/motorcycleService';
import { getAddresses } from '../../services/addressService';
import OrderForm from '../../components/Orders/OrderForm';
import OrderList from '../../components/Orders/OrderList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNotification } from '../../context/NotificationContext';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const attachMotorcycle = (orders, motos) =>
    orders.map(o => ({
        ...o,
        motorcycle: motos.find(m => m.id === o.motorcycle_id) || null
    }));

const attachAddress = (orders, addresses) =>
    orders.map(o => {
        const foundAddress = addresses.find(a => a.order_id === o.id);
        return { ...o, address: foundAddress || null };
    });


export default function OrdersPage() {
    const { addNotification } = useNotification();
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [menus, setMenus] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [motorcycles, setMotorcycles] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setLoading(true);
            setError(null);

            const [ordersRes, menusRes, customersRes, motorcyclesRes, addressesRes] = await Promise.all([
                getOrders(),
                getMenus(),
                getCustomers(),
                getMotorcycles(),
                getAddresses()
            ]);

            const ordersData = ordersRes.data || [];
            const menusData = menusRes.data || [];
            const customersData = customersRes || [];
            const motorcyclesData = motorcyclesRes.data || [];
            const addressesData = addressesRes.data || [];

            // Adjuntar motos y direcciones a los pedidos
            const ordersWithMotorcycles = attachMotorcycle(ordersData, motorcyclesData);
            const ordersWithAddresses = attachAddress(ordersWithMotorcycles, addressesData);

            setOrders(ordersWithAddresses);
            setMenus(menusData);
            setCustomers(customersData);
            setMotorcycles(motorcyclesData);
            setAddresses(addressesData);
        } catch (err) {
            console.error('Error al cargar datos:', err);
            setError('Error al cargar los datos. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editingOrder) {
                await updateOrder(editingOrder.id, values);
                toast.success('Pedido actualizado');
                const cliente = customers.find(c => c.id === values.customer_id);
                addNotification({
                    tipo: "actualizado",
                    cliente: cliente?.name || 'Desconocido',
                    estado: values.status || 'N/A',
                    fecha: values.created_at,
                });
            } else {
                const res = await createOrder(values);
                console.log('Respuesta createOrder:', res);
                const cliente = customers.find(c => c.id === values.customer_id);
                const fecha = res?.data?.created_at || res?.created_at || new Date().toISOString();

                addNotification({
                    tipo: "nuevo",
                    cliente: cliente?.name || 'Desconocido',
                    estado: values.status || 'N/A',
                    fecha,
                });
            }
            setEditingOrder(null);
            loadAll();
        } catch (err) {
            toast.error('Error al guardar el pedido');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
            loadAll();
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "El pedido ha sido eliminado.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error('Error al eliminar el pedido:', err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar el pedido.",
            });
        }
    };

    if (error) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="h6" color="error">{error}</Typography>
                <Button variant="contained" onClick={loadAll} sx={{ mt: 2 }}>
                    Reintentar
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: { xs: 5, sm: 2, md: 10 }, pt: { xs: 90, sm: 15, md: 35 }, pb:{xs: 5, sm: 3, md: 5}, maxWidth: 1200, mx: "auto", minHeight: "100vh", overflowY: "auto",       }}>
            <Card elevation={4} sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
                <Grid container spacing={4} alignItems="stretch">
                    {/* Formulario */}
                    <Grid item xs={12} md={4} mx={"auto"}>
                        <Card elevation={0} sx={{ boxShadow: "none", height: "100%" }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Formulario de Pedido</Typography>
                                <OrderForm
                                    onSubmit={handleSubmit}
                                    initialValues={editingOrder}
                                    menus={menus}
                                    customers={customers}
                                    motorcycles={motorcycles}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Lista */}
                    <Grid item xs={12} sm={6} md={6} mx={"auto"}>
                        <Card elevation={0} sx={{ boxShadow: "none", height: "100%" }}>
                            <CardContent sx={{ maxHeight: '82vh', overflowY: 'auto' }} className='customers-scrollbar'>
                                <Typography variant="h6" gutterBottom>Lista de Pedidos</Typography>
                                <OrderList
                                    orders={orders}
                                    onEdit={setEditingOrder}
                                    onDelete={handleDelete}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
            <ToastContainer position="top-right" autoClose={3000} />
        </Box>
    );
}
