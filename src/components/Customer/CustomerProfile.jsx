import { useEffect, useState } from "react";
import {
    Card, Typography, Avatar, Grid, TextField,
    IconButton, Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validaciones
const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").min(2, "Mínimo 2 caracteres"),
    phone: Yup.string()
        .required("El teléfono es obligatorio")
        .matches(/^\d+$/, "Solo números")
        .length(10, "Mínimo 10 dígitos"),
});

const CustomerProfile = ({ user, onUpdate }) => {
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        console.log("Datos del cliente en el perfil:", user);
    }, [user]);

    if (!user) return (
        <div style={{ color: "#ddd", textAlign: "center", padding: "2rem", backgroundColor: "#121212" }}>
            Cargando perfil...
        </div>
    );

    return (
        <Card sx={{
            p: 4,
            mb: 5,
            backgroundColor: "#1e1e2f",  // azul oscuro grisáceo
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(100, 50, 150, 0.6)",
            color: "#eee"
        }}>
            <Typography
                variant="h5"
                sx={{
                    color: "#bb86fc", // lila vibrante
                    fontWeight: 700,
                    textAlign: "center",
                    mb: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                Perfil de Usuario
                {!editMode && (
                    <IconButton onClick={() => setEditMode(true)} sx={{ color: "#bb86fc" }}>
                        <EditIcon />
                    </IconButton>
                )}
            </Typography>

            <Grid container spacing={3} alignItems="center" justifyContent="center" flexDirection="column">
                <Grid item>
                    <Avatar
                        alt={user.name}
                        src={user.photo || ""}
                        sx={{
                            width: 90,
                            height: 90,
                            border: "3px solid #bb86fc",
                            boxShadow: "0 0 10px #bb86fc"
                        }}
                    />
                </Grid>

                <Grid item xs={12} sx={{ width: "100%", maxWidth: 500 }}>
                    {editMode ? (
                        <Formik
                            initialValues={{
                                name: user.name || "",
                                email: user.email || "",
                                phone: user.phone || "",
                            }}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                onUpdate(values);
                                setEditMode(false);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        label="Nombre"
                                        fullWidth
                                        margin="normal"
                                        variant="filled"
                                        sx={{
                                            bgcolor: "#2a2a3d",
                                            input: { color: "#eee" },
                                            "& .MuiInputLabel-root": { color: "#bb86fc" },
                                            "& .MuiFormHelperText-root": { color: "#ff7961" },
                                        }}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                    <TextField
                                        label="Correo"
                                        value={user.email || ""}
                                        fullWidth
                                        margin="normal"
                                        variant="filled"
                                        disabled
                                        sx={{
                                            bgcolor: "#2a2a3d",
                                            input: { color: "#ccc" },
                                            "& .MuiInputLabel-root": { color: "#bb86fc" },
                                        }}
                                    />
                                    <Field
                                        as={TextField}
                                        name="phone"
                                        label="Teléfono"
                                        fullWidth
                                        margin="normal"
                                        variant="filled"
                                        sx={{
                                            bgcolor: "#2a2a3d",
                                            input: { color: "#eee" },
                                            "& .MuiInputLabel-root": { color: "#bb86fc" },
                                            "& .MuiFormHelperText-root": { color: "#ff7961" },
                                        }}
                                        error={touched.phone && Boolean(errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />

                                    <Box display="flex" justifyContent="center" gap={2} mt={3}>
                                        <IconButton type="submit" sx={{ color: "#03dac5" }}>
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton onClick={() => setEditMode(false)} sx={{ color: "#cf6679" }}>
                                            <CancelIcon />
                                        </IconButton>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <>
                            <TextField
                                label="Nombre"
                                value={user.name || ""}
                                fullWidth
                                margin="normal"
                                variant="filled"
                                disabled
                                sx={{
                                    bgcolor: "#2a2a3d",
                                    input: { color: "#eee" },
                                    "& .MuiInputLabel-root": { color: "#bb86fc" },
                                }}
                            />
                            <TextField
                                label="Correo"
                                value={user.email || ""}
                                fullWidth
                                margin="normal"
                                variant="filled"
                                disabled
                                sx={{
                                    bgcolor: "#2a2a3d",
                                    input: { color: "#ccc" },
                                    "& .MuiInputLabel-root": { color: "#bb86fc" },
                                }}
                            />
                            <TextField
                                label="Teléfono"
                                value={user.phone || ""}
                                fullWidth
                                margin="normal"
                                variant="filled"
                                disabled
                                sx={{
                                    bgcolor: "#2a2a3d",
                                    input: { color: "#eee" },
                                    "& .MuiInputLabel-root": { color: "#bb86fc" },
                                }}
                            />
                        </>
                    )}
                </Grid>
            </Grid>
        </Card>
    );
};

export default CustomerProfile;
