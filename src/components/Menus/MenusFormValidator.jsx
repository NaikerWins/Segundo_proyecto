import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  Typography,
  FormHelperText,
} from "@mui/material";

const MenusFormValidator = ({
  mode,
  handleCreate,
  handleUpdate,
  menu,
  restaurants = [],
  products = [],
  onCancel,
}) => {
  const initialFormValues = {
    restaurant_id: "",
    product_id: "",
    price: 0,
    availability: false,
    ...menu,
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      if (mode === 1 && handleCreate) {
        await handleCreate(values);
      } else if (mode === 2 && handleUpdate) {
        await handleUpdate(values);
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialFormValues}
      validationSchema={Yup.object({
        restaurant_id: Yup.string().required("El restaurante es obligatorio"),
        product_id: Yup.string().required("El producto es obligatorio"),
        price: Yup.number().required("El precio es obligatorio"),
        availability: Yup.boolean(),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleChange, touched, errors, isSubmitting }) => (
        <Form>
          <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              {/* Restaurante */}
              <FormControl fullWidth error={touched.restaurant_id && Boolean(errors.restaurant_id)}>
                <InputLabel id="restaurant-label">Restaurante</InputLabel>
                <Select
                  labelId="restaurant-label"
                  id="restaurant_id"
                  name="restaurant_id"
                  value={values.restaurant_id}
                  label="Restaurante"
                  onChange={handleChange}
                >
                  <MenuItem value="">Seleccione un restaurante</MenuItem>
                  {restaurants.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.restaurant_id && errors.restaurant_id}</FormHelperText>
              </FormControl>

              {/* Producto */}
              <FormControl fullWidth error={touched.product_id && Boolean(errors.product_id)}>
                <InputLabel id="product-label">Producto</InputLabel>
                <Select
                  labelId="product-label"
                  id="product_id"
                  name="product_id"
                  value={values.product_id}
                  label="Producto"
                  onChange={handleChange}
                >
                  <MenuItem value="">Seleccione un producto</MenuItem>
                  {products.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.product_id && errors.product_id}</FormHelperText>
              </FormControl>

              {/* Precio */}
              <TextField
                label="Precio"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                fullWidth
              />

              {/* Disponibilidad */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="availability"
                    checked={values.availability}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="¿Disponible?"
              />

              {/* Botón */}
              <Button
                type="submit"
                variant="contained"
                color={mode === 1 ? "primary" : "success"}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Procesando..."
                  : mode === 1
                    ? "Agregar"
                    : "Actualizar"}
              </Button>
              {mode === 2 && (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => onCancel()}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              )}

            </CardContent>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default MenusFormValidator;
