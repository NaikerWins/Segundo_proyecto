import React, { useEffect, useState } from 'react';
import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    getAddressById
} from '../../services/addressService';
import AddressForm from '../../components/Address/AddressForm';
import {
    Typography,
    Container,
    Paper,
    IconButton,
    Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';

const AddressCRUD = () => {
    const [addresses, setAddresses] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);

    const fetchAddresses = async () => {
        const res = await getAddresses();
        setAddresses(res.data);
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        if (editingAddress) {
            await updateAddress(editingAddress.id, values);
            setEditingAddress(null);
            Swal.fire('¡Edición completada!', 'La dirección fue actualizada correctamente.', 'success');
        } else {
            await createAddress(values);
            Swal.fire('¡Creación completada!', 'La dirección fue creada correctamente.', 'success');
        }
        fetchAddresses();
        resetForm();
    };

    const handleEdit = async (id) => {
        const res = await getAddressById(id);
        setEditingAddress(res.data);
        Swal.fire('Modo edición', 'Ahora puedes editar la dirección.', 'info');
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar esta dirección?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });

        if (result.isConfirmed) {
            await deleteAddress(id);
            fetchAddresses();
            Swal.fire('Eliminado', 'La dirección ha sido eliminada.', 'success');
        }
    };

    return (
        <Container maxWidth="md" sx={{
            py: 4, px: { xs: 1, sm: 3, md: 6 },
            pt: { xs: 60, sm: 10, md: 20 },
            pb: 4,
        }}>
            <Paper elevation={4} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: 'bold', mb: 3 }}
                >
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 3,
                    }}
                >
                    {/* Formulario */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            {editingAddress ? 'Editar Dirección' : 'Crear Dirección'}
                        </Typography>
                        <AddressForm
                            initialValues={
                                editingAddress || {
                                    order_id: '',
                                    street: '',
                                    city: '',
                                    state: '',
                                    postal_code: '',
                                    additional_info: ''
                                }
                            }
                            onSubmit={handleSubmit}
                        />
                    </Box>

                    {/* Lista de Direcciones */}
                    <Box
                        sx={{
                            flex: 1.5,
                            maxHeight: 400,
                            overflowY: 'auto',
                            borderLeft: { md: '1px solid #ddd' },
                            pl: { md: 2 },
                        }}
                        className="customers-scrollbar"
                    >
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Lista de Direcciones
                        </Typography>

                        {addresses.length === 0 ? (
                            <Typography variant="body1">No hay direcciones registradas.</Typography>
                        ) : (
                            addresses.map((addr) => (
                                <Box
                                    key={addr.id}
                                    component={Paper}
                                    elevation={2}
                                    sx={{
                                        mb: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        
                                    }}
                                >
                                    <Box sx={{ mr: 1, flex: 1 }}>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                                            {addr.street}, {addr.city}, {addr.state}, {addr.postal_code}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            Info: {addr.additional_info || 'N/A'}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Orden: {addr.order_id}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <IconButton onClick={() => handleEdit(addr.id)} size="small" color="primary">
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(addr.id)} size="small" color="error">
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default AddressCRUD;
