import { useEffect } from 'react';
import {
    Button,
    MenuItem,
    TextField,
    Typography,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import { Formik, Form, Field, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { createMotorcycle, updateMotorcycle } from '../../services/motorcycleService';
import Swal from 'sweetalert2';

function generateRandomPlate() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const randomLetters = Array(3)
        .fill(null)
        .map(() => letters.charAt(Math.floor(Math.random() * letters.length)))
        .join('');

    const randomNumbers = Array(3)
        .fill(null)
        .map(() => numbers.charAt(Math.floor(Math.random() * numbers.length)))
        .join('');

    return `${randomLetters}${randomNumbers}`;
}

function FormObserver({ selected }) {
    const { setValues } = useFormikContext();

    useEffect(() => {
        if (selected) {
            setValues({
                license_plate: selected.license_plate || '',
                brand: selected.brand || '',
                year: selected.year || '',
                status: selected.status || 'available',
                id: selected.id || null,
            });
        } else {
            setValues({
                license_plate: '',
                brand: '',
                year: '',
                status: 'available',
                id: null,
            });
        }
    }, [selected, setValues]);

    return null;
}

const validationSchema = Yup.object({
    license_plate: Yup.string()
        .matches(/^[A-Z0-9-]{5,10}$/, 'Placa inválida')
        .required('La placa es obligatoria'),
    brand: Yup.string().required('La marca es obligatoria'),
    year: Yup.number()
        .min(1900, 'Año no válido')
        .max(new Date().getFullYear(), 'Año no válido')
        .required('El año es obligatorio'),
    status: Yup.string().oneOf(['available', 'busy']).required('El estado es obligatorio'),
});

export default function MotorcycleForm({ selected, clear, reload }) {
    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (values.id) {
                await updateMotorcycle(values.id, values);
                Swal.fire({
                    icon: 'success',
                    title: '¡Moto actualizada!',
                    text: 'La moto se actualizó correctamente.',
                    timer: 1800,
                    showConfirmButton: false,
                });
            } else {
                await createMotorcycle(values);
                Swal.fire({
                    icon: 'success',
                    title: '¡Moto creada!',
                    text: 'La moto se registró correctamente.',
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
            reload();
            clear();
            resetForm();
        } catch (error) {
            console.error('Error guardando moto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al guardar la moto',
            });
        }
    };

    return (
        <Card
            sx={{
                mb: 4,
                boxShadow: 3,
                maxWidth: 500,
                mx: 'auto',
                color: '#eee',
                borderRadius: 2,
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    mb={2}
                    textAlign="center"
                    sx={{ color: '#eee' }}
                >
                    {selected ? 'Editar Moto' : 'Registrar Nueva Moto'}
                </Typography>
                <Formik
                    initialValues={{
                        license_plate: '',
                        brand: '',
                        year: '',
                        status: 'available',
                        id: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                            <FormObserver selected={selected} />

                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <Field
                                        as={TextField}
                                        name="license_plate"
                                        label="Placa"
                                        fullWidth
                                        error={touched.license_plate && Boolean(errors.license_plate)}
                                        helperText={touched.license_plate && errors.license_plate}
                                        inputProps={{ style: { textTransform: 'uppercase', color: '#eee' } }}
                                        value={values.license_plate.toUpperCase()}
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                color: '#eee',
                                            },
                                            '& .MuiFormLabel-root': {
                                                color: '#bbb',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#555',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#64b5f6',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#64b5f6',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{ height: '100%', color: '#64b5f6', borderColor: '#64b5f6' }}
                                        onClick={() => {
                                            const newPlate = generateRandomPlate();
                                            setFieldValue('license_plate', newPlate);
                                        }}
                                    >
                                        Generar Placa
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        name="brand"
                                        label="Marca"
                                        fullWidth
                                        error={touched.brand && Boolean(errors.brand)}
                                        helperText={touched.brand && errors.brand}
                                        sx={{
                                            '& .MuiInputBase-root': { color: '#eee' },
                                            '& .MuiFormLabel-root': { color: '#bbb' },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: '#555' },
                                                '&:hover fieldset': { borderColor: '#64b5f6' },
                                                '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        name="year"
                                        label="Año"
                                        type="number"
                                        fullWidth
                                        error={touched.year && Boolean(errors.year)}
                                        helperText={touched.year && errors.year}
                                        sx={{
                                            '& .MuiInputBase-root': { color: '#eee' },
                                            '& .MuiFormLabel-root': { color: '#bbb' },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: '#555' },
                                                '&:hover fieldset': { borderColor: '#64b5f6' },
                                                '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        select
                                        name="status"
                                        label="Estado"
                                        fullWidth
                                        error={touched.status && Boolean(errors.status)}
                                        helperText={touched.status && errors.status}
                                        sx={{
                                            '& .MuiInputBase-root': { color: '#eee' },
                                            '& .MuiFormLabel-root': { color: '#bbb' },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: '#555' },
                                                '&:hover fieldset': { borderColor: '#64b5f6' },
                                                '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
                                            },
                                        }}
                                    >
                                        <MenuItem value="available">Disponible</MenuItem>
                                        <MenuItem value="busy">Ocupada</MenuItem>
                                    </Field>
                                </Grid>

                                <Grid item xs={6} container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            sx={{ height: 40, backgroundColor: '#64b5f6' }}
                                        >
                                            {selected ? 'Actualizar' : 'Crear'}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => clear()}
                                            sx={{ height: 40, color: '#eee', borderColor: '#eee' }}
                                        >
                                            Cancelar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}
