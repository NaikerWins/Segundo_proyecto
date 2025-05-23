import { Grid } from '@mui/material';
import PhotoCard from './PhotoCard';

export default function PhotoList({ photos, onDelete, onEdit }) {
    return (
        <Grid container spacing={3}>
            {photos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                    <PhotoCard
                        photo={photo}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
