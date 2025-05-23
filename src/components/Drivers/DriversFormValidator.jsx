import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Box, TextField, Typography, MenuItem } from "@mui/material";

const DriversFormValidator = ({ mode, handleCreate, handleUpdate, driver, onCancel }) => {
  const initialFormValues = {
    name: "",
    license_number: "",
    phone: "",
    email: "",
    status: "",
    ...driver
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (mode === 1 && handleCreate) {
        await handleCreate(values);
        resetForm();
      } else if (mode === 2 && handleUpdate) {
        await handleUpdate(values);
        resetForm();
        if (onCancel) onCancel(); // cerrar modo edición
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    license_number: Yup.string().required("El número de licencia es obligatorio"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
      .required("El teléfono es obligatorio"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    status: Yup.string().required("El estado es obligatorio"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleChange, isSubmitting }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nombre"
              name="name"
              value={values.name}
              onChange={handleChange}
              fullWidth
            />
            <ErrorMessage name="name" component={Typography} color="error" variant="caption" />

            <TextField
              label="Número de Licencia"
              name="license_number"
              value={values.license_number}
              onChange={handleChange}
              fullWidth
            />
            <ErrorMessage name="license_number" component={Typography} color="error" variant="caption" />

            <TextField
              label="Teléfono"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              fullWidth
            />
            <ErrorMessage name="phone" component={Typography} color="error" variant="caption" />

            <TextField
              label="Correo Electrónico"
              name="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
            />
            <ErrorMessage name="email" component={Typography} color="error" variant="caption" />

            <TextField
              select
              label="Estado"
              name="status"
              value={values.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="disponible">Disponible</MenuItem>
              <MenuItem value="ocupado">Ocupado</MenuItem>
            </TextField>
            <ErrorMessage name="status" component={Typography} color="error" variant="caption" />

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {mode === 1 ? "Agregar" : "Actualizar"}
              </Button>
              {mode === 2 && onCancel && (
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                  Cancelar
                </Button>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DriversFormValidator;
