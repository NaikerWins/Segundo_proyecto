import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import Swal from 'sweetalert2';

export default function OrderForm({
    onSubmit,
    initialValues,
    menus = [],
    customers = [],
    motorcycles = [],
    onSuccess
}) {

    const formik = useFormik({
        initialValues: initialValues || {
            customer_id: '',
            menu_id: '',
            motorcycle_id: '',
            quantity: 1,
            status: ''
        },
        validationSchema: Yup.object({
            customer_id: Yup.number().required('Cliente requerido'),
            menu_id: Yup.number().required('Menú requerido'),
            motorcycle_id: Yup.number().required('Debe escoger una moto'),
            quantity: Yup.number().min(1, 'La cantidad debe ser al menos 1').required('Cantidad requerida'),
            status: Yup.string().required('Seleccione un estado')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await onSubmit({
                    ...values,
                    motorcycle_id: values.motorcycle_id || null,
                    customer_id: values.customer_id || null,
                    menu_id: values.menu_id || null
                });
                if (onSuccess) {
                    onSuccess(initialValues && initialValues.id ? "edit" : "create");
                }
                helpers.resetForm();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo guardar el pedido.",
                });
            }
        },
        enableReinitialize: true
    });

    const textFieldSX = {
        '& label': { color: '#bb86fc' },
        '& label.Mui-focused': { color: '#4caf50' },
        '& .MuiInputBase-root': {
            color: '#eee',
            backgroundColor: '#2a2a3d',
            borderRadius: 1,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#bb86fc',
            },
            '&:hover fieldset': {
                borderColor: '#4caf50',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#4caf50',
            },
        },
        mb: 2
    };

    return (
        <Box
            sx={{
                maxWidth: 360,
                mx: "auto",
                p: 4,
                bgcolor: "#1e1e2f",
                borderRadius: 3,
                boxShadow: "0 8px 20px rgba(123, 44, 191, 0.3)",
                color: "#eee",
            }}
        >
            <form onSubmit={formik.handleSubmit}>

                {/* Cliente */}
                <TextField
                    select
                    fullWidth
                    label="Cliente"
                    name="customer_id"
                    value={formik.values.customer_id}
                    onChange={(e) =>
                        formik.setFieldValue("customer_id", e.target.value === '' ? null : Number(e.target.value))
                    }
                    error={formik.touched.customer_id && Boolean(formik.errors.customer_id)}
                    helperText={formik.touched.customer_id && formik.errors.customer_id}
                    sx={textFieldSX}
                    size="small"
                >
                    <MenuItem value="">Seleccione un cliente</MenuItem>
                    {Array.isArray(customers) && customers.length > 0 ? (
                        customers.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.name || c.nombre || `Cliente ${c.id}`}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No hay clientes disponibles</MenuItem>
                    )}
                </TextField>

                {/* Menú */}
                <TextField
                    select
                    fullWidth
                    label="Menú"
                    name="menu_id"
                    value={formik.values.menu_id}
                    onChange={(e) =>
                        formik.setFieldValue("menu_id", e.target.value === '' ? null : Number(e.target.value))
                    }
                    error={formik.touched.menu_id && Boolean(formik.errors.menu_id)}
                    helperText={formik.touched.menu_id && formik.errors.menu_id}
                    sx={textFieldSX}
                    size="small"
                >
                    <MenuItem value="">Seleccione un menú</MenuItem>
                    {Array.isArray(menus) && menus.length > 0 ? (
                        menus.map((m) => (
                            <MenuItem key={m.id} value={m.id}>
                                {m.name || `Menú ${m.id}`}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No hay menús disponibles</MenuItem>
                    )}
                </TextField>

                {/* Moto */}
                <TextField
                    select
                    fullWidth
                    label="Moto"
                    name="motorcycle_id"
                    value={formik.values.motorcycle_id || ''}
                    onChange={(e) =>
                        formik.setFieldValue("motorcycle_id", e.target.value === '' ? null : Number(e.target.value))
                    }
                    error={formik.touched.motorcycle_id && Boolean(formik.errors.motorcycle_id)}
                    helperText={formik.touched.motorcycle_id && formik.errors.motorcycle_id}
                    sx={textFieldSX}
                    size="small"
                >
                    <MenuItem value="">Seleccione una moto</MenuItem>
                    {Array.isArray(motorcycles) && motorcycles.length > 0 ? (
                        motorcycles.map((m) => (
                            <MenuItem key={m.id} value={m.id}>
                                {m.license_plate || `Moto ${m.id}`}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No hay motos disponibles</MenuItem>
                    )}
                </TextField>

                {/* Cantidad */}
                <TextField
                    fullWidth
                    label="Cantidad"
                    name="quantity"
                    type="number"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                    sx={textFieldSX}
                    size="small"
                    inputProps={{ min: 1 }}
                />

                {/* Estado */}
                <TextField
                    select
                    fullWidth
                    label="Estado"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                    sx={textFieldSX}
                    size="small"
                >
                    <MenuItem value="">Seleccione un estado</MenuItem>
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="En progreso">En progreso</MenuItem>
                    <MenuItem value="Entregado">Entregado</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                </TextField>

                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                        mt: 3,
                        bgcolor: "#bb86fc",
                        color: "#1e1e2f",
                        fontWeight: "bold",
                        '&:hover': {
                            bgcolor: "#4caf50",
                            color: "#fff"
                        }
                    }}
                >
                    {initialValues ? 'Actualizar' : 'Crear Pedido'}
                </Button>
            </form>
        </Box>
    );
}
