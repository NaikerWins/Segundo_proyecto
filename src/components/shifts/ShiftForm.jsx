import {
    Button,
    Card, CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem, Select,
    TextField, Typography,
} from '@mui/material';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { getDrivers } from '../../services/driverService';
import { getMotorcycles } from '../../services/motorcycleService';
import { createShift, updateShift } from '../../services/shiftService';

function FormObserver({ selected }) {
    const { setValues } = useFormikContext();

    useEffect(() => {
        if (selected) {
            setValues(selected);
        } else {
            setValues({
                driver_id: '',
                motorcycle_id: '',
                start_time: '',
                end_time: '',
                status: 'active',
                id: null,
            });
        }
    }, [selected, setValues]);

    return null;
}

const validationSchema = Yup.object({
    driver_id: Yup.string().required('Conductor obligatorio'),
    motorcycle_id: Yup.string().required('Moto obligatoria'),
    start_time: Yup.string().required('Inicio obligatorio'),
    end_time: Yup.string().required('Fin obligatorio'),
    status: Yup.string().required('Estado obligatorio'),
});

export default function ShiftForm({ selected, clear, reload }) {
    const [drivers, setDrivers] = useState([]);
    const [motorcycles, setMotorcycles] = useState([]);
    const [initialValues, setInitialValues] = useState({
        driver_id: '',
        motorcycle_id: '',
        start_time: '',
        end_time: '',
        status: 'active',
        id: null,
    });

    useEffect(() => {
        getDrivers().then(res => setDrivers(res));
        getMotorcycles().then(res => setMotorcycles(res.data || []));
    }, []);

    useEffect(() => {
        setInitialValues((prev) => ({
            ...prev,
            driver_id: drivers.length > 0 ? drivers[0].id : '',
            motorcycle_id: motorcycles.length > 0 ? motorcycles[0].id : '',
        }));
    }, [drivers, motorcycles]);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (values.id) {
                await updateShift(values.id, values);
                Swal.fire('¡Turno actualizado!', 'El turno fue actualizado correctamente.', 'success');
            } else {
                await createShift(values);
                Swal.fire('¡Turno creado!', 'El turno fue creado correctamente.', 'success');
            }
            reload();
            clear();
            resetForm();
        } catch (error) {
            Swal.fire('Error', 'Error al guardar el turno', 'error');
        }
    };

    return (
        <Card
            sx={{
                mb: 4,
                boxShadow: 3,
                color: '#eee',
                maxWidth: '600px',
                mx: 'auto',
                mt: 4,
            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" mb={3} textAlign="center">
                    {selected ? 'Editar Turno' : 'Registrar Nuevo Turno'}
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormObserver selected={selected} />
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth size="medium" sx={{ width: 300, mx: "auto" }}>
                                        <InputLabel id="driver-label">Conductor</InputLabel>
                                        <Field
                                            as={Select}
                                            labelId="driver-label"
                                            name="driver_id"
                                            label="Cliente"
                                            error={touched.driver_id && Boolean(errors.driver_id)}
                                        >
                                            {drivers.map((c) => (
                                                <MenuItem key={c.id} value={c.id}>
                                                    {c.name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {touched.driver_id && errors.driver_id && (
                                            <Typography color="error" variant="caption">{errors.driver_id}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth size="medium" sx={{ width: 300, mx: "auto" }}>
                                        <InputLabel id="motorcycle-label">Moto</InputLabel>
                                        <Field
                                            as={Select}
                                            labelId="motorcycle-label"
                                            name="motorcycle_id"
                                            label="Moto"
                                            error={touched.motorcycle_id && Boolean(errors.motorcycle_id)}
                                        >
                                            {motorcycles.map((m) => (
                                                <MenuItem key={m.id} value={m.id}>
                                                    {`${m.license_plate} - ${m.brand}`}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {touched.motorcycle_id && errors.motorcycle_id && (
                                            <Typography color="error" variant="caption">{errors.motorcycle_id}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="start_time"
                                        label="Hora Inicio"
                                        type="datetime-local"
                                        fullWidth
                                        size="medium"
                                        error={touched.start_time && Boolean(errors.start_time)}
                                        helperText={touched.start_time && errors.start_time}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="end_time"
                                        label="Hora Fin"
                                        type="datetime-local"
                                        fullWidth
                                        size="medium"
                                        error={touched.end_time && Boolean(errors.end_time)}
                                        helperText={touched.end_time && errors.end_time}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="status"
                                        label="Estado"
                                        select
                                        fullWidth
                                        size="medium"
                                        error={touched.status && Boolean(errors.status)}
                                        helperText={touched.status && errors.status}
                                    >
                                        <MenuItem value="active">Activo</MenuItem>
                                        <MenuItem value="inactive">Inactivo</MenuItem>
                                    </Field>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button type="submit" fullWidth variant="contained" size="large">
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>

    );
}
