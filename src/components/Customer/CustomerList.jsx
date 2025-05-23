import {
    Card,
    Typography,
    Box,
    Grid,
    Avatar
} from "@mui/material";

const CustomerList = ({ customers, loggedUser, onEdit, onDelete }) => (
    <Box>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: '#4a0072', mb: 3 }}>
            Lista de Clientes
        </Typography>
        <Grid container spacing={2} justifyContent="center">
            {customers.map((c) => (
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    key={c.id}
                    display="flex"
                    justifyContent="center"
                >
                    <Card
                        sx={{
                            borderRadius: 2,
                            p: 2,
                            width: 280,
                            minHeight: 140,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            boxShadow: 3,
                            bgcolor: c.id === loggedUser.id ? '#d1c4e9' : '#ede7f6',
                            transition: "transform 0.15s",
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: 6,
                            }
                        }}
                    >
                        <Avatar
                            src={c.photoURL}
                            alt={c.name}
                            sx={{
                                width: 56,
                                height: 56,
                                mb: 1,
                                bgcolor: '#6a1b9a',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 24
                            }}
                        >
                            {!c.photoURL && c.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            align="center"
                            sx={{ color: '#4a0072' }}
                        >
                            {c.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                            sx={{ color: '#6a1b9a' }}
                        >
                            {c.email}
                        </Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default CustomerList;
