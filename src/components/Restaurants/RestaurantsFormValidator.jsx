import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
  import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const RestaurantsFormValidator = ({ mode, handleCreate, handleUpdate, restaurant }) => {
  const initialFormValues = {
    name: "",
    address: "",
    phone: "",
    email: "",
    ...restaurant
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (mode === 1 && handleCreate) {
        await handleCreate(values);
        resetForm();
      } else if (mode === 2 && handleUpdate) {
        await handleUpdate(values);
        resetForm();
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {mode === 1 ? "Agregar Restaurante" : "Editar Restaurante"}
        </Typography>
        <Formik
          initialValues={initialFormValues}
          enableReinitialize={true}
          validationSchema={Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            address: Yup.string().required("La dirección es obligatoria"),
            phone: Yup.string()
              .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
              .required("El teléfono es obligatorio"),
            email: Yup.string()
              .email("Email inválido")
              .required("El email es obligatorio"),
          })}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, touched, errors, handleChange, values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Nombre"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={<ErrorMessage name="name" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="address"
                    label="Dirección"
                    fullWidth
                    value={values.address}
                    onChange={handleChange}
                    error={touched.address && Boolean(errors.address)}
                    helperText={<ErrorMessage name="address" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="phone"
                    label="Teléfono"
                    fullWidth
                    value={values.phone}
                    onChange={handleChange}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={<ErrorMessage name="phone" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color={mode === 1 ? "primary" : "success"}
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Procesando..."
                      : mode === 1
                      ? "Agregar"
                      : "Actualizar"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default RestaurantsFormValidator;