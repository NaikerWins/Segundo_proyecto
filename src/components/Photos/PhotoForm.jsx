import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { deletePhoto } from '../../services/photoService';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function PhotoForm({ open, handleClose, onSubmit, editingPhoto }) {
    const formik = useFormik({
        initialValues: {
            issue_id: '',
            caption: '',
            taken_at: '',
            file: null,
        },
        validationSchema: Yup.object({
            issue_id: Yup.number().required('Este campo es obligatorio'),
            caption: Yup.string().required('Este campo es obligatorio'),
            taken_at: Yup.string().required('Este campo es obligatorio'),
            file: Yup.mixed().test(
                'file-required',
                'Debes seleccionar una imagen',
                function (value) {
                    // Si estamos editando y no se sube nuevo archivo, lo permitimos
                    return editingPhoto ? true : value instanceof File;
                }
            )
        }),
        enableReinitialize: true, // Para que tome datos nuevos al editar
        onSubmit: async (values) => {
            try {
                const data = new FormData();
                data.append('issue_id', values.issue_id);
                data.append('caption', values.caption);
                data.append('taken_at', values.taken_at);
                if (values.file) data.append('file', values.file);

                if (editingPhoto && values.file) {
                    await deletePhoto(editingPhoto.id);
                    await onSubmit(data, null); // crear nueva
                } else {
                    await onSubmit(data, editingPhoto?.id); // editar
                }

                handleClose();
            } catch (err) {
                console.error("Error al guardar:", err);
            }
        }
    });

    useEffect(() => {
        if (editingPhoto) {
            formik.setValues({
                issue_id: editingPhoto.issue_id || '',
                caption: editingPhoto.caption || '',
                taken_at: editingPhoto.taken_at?.slice(0, 16) || '',
                file: null,
            });
        }
    }, [editingPhoto]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{editingPhoto ? 'Editar Foto' : 'Subir Foto'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="issue_id"
                        label="Issue ID"
                        type="number"
                        fullWidth
                        value={formik.values.issue_id}
                        onChange={formik.handleChange}
                        error={formik.touched.issue_id && Boolean(formik.errors.issue_id)}
                        helperText={formik.touched.issue_id && formik.errors.issue_id}
                    />
                    <TextField
                        margin="dense"
                        name="caption"
                        label="Caption"
                        fullWidth
                        value={formik.values.caption}
                        onChange={formik.handleChange}
                        error={formik.touched.caption && Boolean(formik.errors.caption)}
                        helperText={formik.touched.caption && formik.errors.caption}
                    />
                    <TextField
                        margin="dense"
                        name="taken_at"
                        label="Fecha (YYYY-MM-DDTHH:mm)"
                        type="datetime-local"
                        fullWidth
                        value={formik.values.taken_at}
                        onChange={formik.handleChange}
                        error={formik.touched.taken_at && Boolean(formik.errors.taken_at)}
                        helperText={formik.touched.taken_at && formik.errors.taken_at}
                    />
                    <input
                        type="file"
                        name="file"
                        onChange={(event) => {
                            formik.setFieldValue('file', event.currentTarget.files[0]);
                        }}
                    />
                    {formik.errors.file && formik.touched.file && (
                        <div style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.file}</div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" variant="contained">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
