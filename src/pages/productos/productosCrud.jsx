import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductosCrud() {
  const [products, setProducts] = useState([]);
  const [busquedaGlobal, setBusquedaGlobal] = useState("");
  const [formulario, setFormulario] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    id: null,
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const productosFiltrados = products.filter(
    (p) =>
      busquedaGlobal === "" ||
      p.name.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
      (p.category &&
        p.category.toLowerCase().includes(busquedaGlobal.toLowerCase()))
  );

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formulario.id) {
        await updateProduct(formulario.id, formulario);
        Swal.fire({
          icon: "success",
          title: "Producto actualizado",
          text: "El producto se actualizó correctamente.",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        await createProduct(formulario);
        Swal.fire({
          icon: "success",
          title: "Producto creado",
          text: "El producto se creó correctamente.",
          timer: 1000,
          showConfirmButton: false,
        });
      }
      setFormulario({
        name: "",
        category: "",
        price: "",
        description: "",
        id: null,
      });
      cargarProductos();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al guardar el producto.",
      });
    }
  };

  const handleEditar = (producto) => {
    setFormulario(producto);
  };

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar este producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        cargarProductos();
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El producto ha sido eliminado.",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el producto.",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        px: { xs: 1, sm: 3, md: 6 },
        pt: { xs: 65, sm: 10, md: 25 },
        pb: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          p: { xs: 2, sm: 4, md: 5 },
          borderRadius: 3,
          boxShadow: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 4 },
        }}
      >
        {/* Formulario */}
        <Box sx={{ flex: 1, minWidth: 260, maxWidth: 350 }}>
          <CardContent component="form" onSubmit={handleSubmit} sx={{ p: 0 }}>
            <Typography variant="h6" gutterBottom>
              {formulario.id ? "Editar producto" : "Crear producto"}
            </Typography>

            <TextField
              label="Nombre"
              name="name"
              value={formulario.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Categoría"
              name="category"
              value={formulario.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Precio"
              name="price"
              value={formulario.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Descripción"
              name="description"
              value={formulario.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {formulario.id ? "Actualizar" : "Crear"}
            </Button>
          </CardContent>
        </Box>

        {/* Divider vertical en desktop */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: "none", md: "block" },
            mx: 2,
            my: 0,
          }}
        />

        {/* Lista de productos */}
        <Box sx={{ flex: 2, minWidth: 260 }}>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h6" gutterBottom>
              Lista de productos
            </Typography>

            <TextField
              label="Buscar"
              value={busquedaGlobal}
              onChange={(e) => setBusquedaGlobal(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                maxHeight: "60vh",
                overflowY: "auto",
                display: "grid",
                gap: 2,
              }}
              className="customers-scrollbar"
            >
              {productosFiltrados.map((p) => (
                <Card
                  key={p.id}
                  variant="outlined"
                  sx={{
                    padding: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: "200px" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {p.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {p.category}
                    </Typography>
                    <Typography variant="body2">${p.price}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1 }}
                      color="text.secondary"
                    >
                      {p.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      color="info"
                      size= "small"
                      onClick={() => handleEditar(p)}
                      sx={{
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#e3f2fd",
                          borderColor: "#1565c0",
                        },
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      size = "small"
                      onClick={() => handleEliminar(p.id)}
                      sx={{
                        borderColor: "#d32f2f",
                        color: "#d32f2f",
                        "&:hover": {
                          backgroundColor: "#ffebee",
                          borderColor: "#b71c1c",
                        },
                      }}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
