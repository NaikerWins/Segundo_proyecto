import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Divider,
    Stack,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
    getPhotos,
    deletePhoto,
    uploadPhoto,
    updatePhoto,
} from '../../services/photoService';
import PhotoList from '../../components/Photos/PhotoList';
import PhotoForm from '../../components/Photos/PhotoForm';

export default function PhotoPage() {
    const [photos, setPhotos] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState(null);

    const fetchPhotos = () => {
        getPhotos().then((res) => setPhotos(res.data));
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleDelete = async (id) => {
        await deletePhoto(id);
        fetchPhotos();
    };

    const handleAdd = () => {
        setEditingPhoto(null);
        setFormOpen(true);
    };

    const handleEdit = (photo) => {
        setEditingPhoto(photo);
        setFormOpen(true);
    };

    const handleSubmit = async (data, id) => {
        if (id) {
            const updateData = Object.fromEntries(data.entries());
            await updatePhoto(id, updateData);
        } else {
            await uploadPhoto(data);
        }
        fetchPhotos();
    };

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 4, md: 6 },
                pt:{xs:30, sm:4, md:15},
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '100vh',
                backgroundColor: '#121212',
            }}
            mx={"center"}
        >
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    bgcolor: '#1e1e1e',
                    color: '#fff',
                    borderRadius: 4,
                    boxShadow: 4,
                }}
                mx={"center"}
            >
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mx={"center"}>
                        <Typography variant="h5" fontWeight="bold">
                            Galería de Fotos
                        </Typography>
                        <Button
                            onClick={handleAdd}
                            variant="contained"
                            color="primary"
                            startIcon={<AddPhotoAlternateIcon />}
                        >
                            Agregar Foto
                        </Button>
                    </Stack>

                    <Divider sx={{ my: 2, borderColor: '#333' }} />

                    <PhotoList
                        photos={photos}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onAdd={handleAdd}
                    />
                </CardContent>
            </Card>

            <PhotoForm
                open={formOpen}
                handleClose={() => setFormOpen(false)}
                onSubmit={handleSubmit}
                editingPhoto={editingPhoto}
            />
        </Box>
    );
}
