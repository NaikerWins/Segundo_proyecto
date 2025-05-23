import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    CardActions,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function PhotoCard({ photo, onDelete, onEdit }) {
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                bgcolor: '#222',
                color: '#fff',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)', boxShadow: 5 }
            }}
        >
            <CardMedia
                component="img"
                image={`http://localhost:5000/${photo.image_url}`}
                alt={photo.caption}
                sx={{
                    height: 120,
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                }}
            />
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {photo.caption}
                </Typography>
                <Typography variant="caption" color="gray">
                    {photo.taken_at ? new Date(photo.taken_at).toLocaleString() : 'Sin fecha'}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', px: 2, pb: 1 }} mx="center">
                <IconButton onClick={() => onEdit(photo)} color="primary">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(photo.id)} color="error">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
