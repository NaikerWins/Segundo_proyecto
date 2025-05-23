import React from 'react';
import { getPhotoUrl } from '../../services/issueService';
import {
    Card, CardContent, Typography, Button, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const IssueItem = ({ issue, onEdit, onDelete }) => {
    const imageUrl = issue.photos?.length > 0
        ? getPhotoUrl(issue.photos[0].image_url.replace(/\\/g, '/'))
        : null;

    // Handler para editar con alerta
    const handleEdit = () => {
        Swal.fire({
            title: 'Modo edición',
            text: 'Ahora puedes editar el inconveniente.',
            icon: 'info',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#3085d6',
        }).then(() => {
            onEdit(issue);
        });
    };

    // Handler para eliminar con confirmación
    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar este inconveniente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(issue.id);
            }
        });
    };

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6">{issue.issue_type}</Typography>
                <Typography>{issue.description}</Typography>
                <Typography color="text.secondary">Estado: {issue.status}</Typography>
                <Typography color="text.secondary">
                    Fecha: {new Date(issue.date_reported).toLocaleDateString()}
                </Typography>

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Foto del inconveniente"
                        style={{ width: '120px', marginTop: '8px', borderRadius: '8px' }}
                    />
                )}

                <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                    >
                        Eliminar
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default IssueItem;
