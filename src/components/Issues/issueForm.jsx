import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box, TextField, Select, MenuItem, Button, Stack, InputLabel, FormControl, FormHelperText
} from '@mui/material';
import Swal from 'sweetalert2';
import { createIssue, updateIssue, uploadPhoto } from '../../services/issueService';

export default function IssueForm({ onIssueSaved, editingIssue }) {
    const formik = useFormik({
        initialValues: {
            motorcycle_id: '',
            description: '',
            issue_type: '',
            date_reported: '',
            status: 'open',
            image: null,
        },
        validationSchema: Yup.object({
            motorcycle_id: Yup.string().required('El ID de la moto es obligatorio'),
            description: Yup.string().required('La descripción es obligatoria'),
            issue_type: Yup.string().required('El tipo es obligatorio'),
            date_reported: Yup.string().required('La fecha es obligatoria'),
            status: Yup.string().required('El estado es obligatorio'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const issueData = {
                motorcycle_id: values.motorcycle_id,
                description: values.description,
                issue_type: values.issue_type,
                date_reported: values.date_reported,
                status: values.status,
            };

            try {
                const res = editingIssue
                    ? await updateIssue(editingIssue.id, issueData)
                    : await createIssue(issueData);

                if (values.image) {
                    const photoData = new FormData();
                    photoData.append('file', values.image);
                    photoData.append('issue_id', res.data.id || res.data[0].id);
                    photoData.append('caption', 'Foto del inconveniente');
                    photoData.append('taken_at', new Date().toISOString());
                    await uploadPhoto(photoData);
                }

                Swal.fire(
                    editingIssue ? '¡Edición completada!' : '¡Creación completada!',
                    editingIssue
                        ? 'El inconveniente fue actualizado correctamente.'
                        : 'El inconveniente fue creado correctamente.',
                    'success'
                );

                resetForm();
                onIssueSaved();
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Ocurrió un error al guardar el inconveniente.', 'error');
            }
        },
    });

    useEffect(() => {
        if (editingIssue) {
            formik.setValues({
                ...editingIssue,
                date_reported: editingIssue.date_reported?.slice(0, 16),
                image: null,
            });
        }
    }, [editingIssue]);

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="ID de la moto"
                    name="motorcycle_id"
                    value={formik.values.motorcycle_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.motorcycle_id && Boolean(formik.errors.motorcycle_id)}
                    helperText={formik.touched.motorcycle_id && formik.errors.motorcycle_id}
                    required
                />
                <TextField
                    label="Descripción"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    required
                />
                <TextField
                    label="Tipo"
                    name="issue_type"
                    value={formik.values.issue_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.issue_type && Boolean(formik.errors.issue_type)}
                    helperText={formik.touched.issue_type && formik.errors.issue_type}
                    required
                />
                <TextField
                    label="Fecha del reporte"
                    type="datetime-local"
                    name="date_reported"
                    value={formik.values.date_reported}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    error={formik.touched.date_reported && Boolean(formik.errors.date_reported)}
                    helperText={formik.touched.date_reported && formik.errors.date_reported}
                    required
                />
                <FormControl
                    error={formik.touched.status && Boolean(formik.errors.status)}
                >
                    <InputLabel>Estado</InputLabel>
                    <Select
                        name="status"
                        value={formik.values.status}
                        label="Estado"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    >
                        <MenuItem value="open">Abierto</MenuItem>
                        <MenuItem value="closed">Cerrado</MenuItem>
                    </Select>
                    {formik.touched.status && formik.errors.status && (
                        <FormHelperText>{formik.errors.status}</FormHelperText>
                    )}
                </FormControl>
                <Button variant="outlined" component="label">
                    Subir Imagen
                    <input
                        type="file"
                        hidden
                        onChange={(e) => {
                            formik.setFieldValue('image', e.currentTarget.files[0]);
                        }}
                    />
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    {editingIssue ? 'Actualizar' : 'Crear'}
                </Button>
            </Stack>
        </Box>
    );
}
