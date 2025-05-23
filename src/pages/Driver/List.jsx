import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { driverService } from "../../services/driverService";
import DriversFormValidator from '../../components/Drivers/DriversFormValidator';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ListDrivers = () => {
  const [data, setData] = useState([]);
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const drivers = await driverService.getDrivers();
    setData(drivers);
  };

  const handleView = (id) => {
    console.log(`Ver registro con ID: ${id}`);
  };

  const handleCreate = async (newDriver) => {
    try {
      const created = await driverService.createDriver(newDriver);
      if (created) {
        Swal.fire("¡Creado!", "Conductor agregado correctamente", "success");
        fetchData();
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Error al crear conductor", "error");
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await driverService.updateDriver(editingDriver.id, updatedData);
      Swal.fire("¡Actualizado!", "Información del conductor actualizada correctamente", "success");
      setEditingDriver(null);
      fetchData();
    } catch (error) {
      Swal.fire("Error", error.message || "Error al actualizar", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro de querer eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await driverService.deleteDriver(id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "El registro se ha eliminado",
            icon: "success"
          });
          fetchData();
        }
      }
    });
  };

  const handleCancelEdit = () => {
    setEditingDriver(null);
  };

return (
  <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, mt:{ xs:50, md:30, sm:30}, maxWidth: 1200, mx: "auto" }}>
    <Card elevation={4} sx={{ p: { xs: 1, md: 3 }, borderRadius: 3 }}>
      <CardHeader
        title="Gestión de Conductores"
        sx={{ textAlign: "center", mb: { xs: 1, md: 3 } }}
      />
      <CardContent>
        <Grid
          container
          spacing={2}
          direction={{ xs: "column", md: "row" }}  // apilar en xs, fila en md+
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Formulario */}
          <Grid
            item
            xs={11}
            md={6}   // mitad en md+
            sx={{ mb: { xs: 2, md: 0 }, mx:"auto" }}
          >
            <Card variant="outlined" sx={{ height: "100%", p: { xs: 1, md: 2 } }}>
              <CardHeader
                title={editingDriver ? "Editar Conductor" : "Agregar Conductor"}
                sx={{ textAlign: "center", pb: 0, fontSize: { xs: "1rem", md: "1.25rem" } }}
              />
              <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                <DriversFormValidator
                  mode={editingDriver ? 2 : 1}
                  handleCreate={handleCreate}
                  handleUpdate={handleUpdate}
                  driver={editingDriver}
                  onCancel={handleCancelEdit}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Lista de Conductores */}
          <Grid
            item
            xs={12}
            md={6}  // mitad en md+
          >
            <Card variant="outlined" sx={{ p: { xs: 1, md: 2 } }}>
              <CardHeader
                title="Conductores Disponibles"
                sx={{ textAlign: "center", pb: 0, fontSize: { xs: "1rem", md: "1.25rem" } }}
              />
              <CardContent sx={{ p: 0 }}>
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: 450,
                    overflowX: "auto",
                  }}
                >
                  <Table stickyHeader size="small" aria-label="lista de conductores">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ py: 0.5, px: 1 }}>Nombre</TableCell>
                        <TableCell sx={{ py: 0.5, px: 1 }}>Número Licencia</TableCell>
                        <TableCell sx={{ py: 0.5, px: 1 }}>Teléfono</TableCell>
                        <TableCell sx={{ py: 0.5, px: 1 }}>Correo</TableCell>
                        <TableCell sx={{ py: 0.5, px: 1 }}>Estado</TableCell>
                        <TableCell align="center" sx={{ py: 0.5, px: 1, minWidth: 90 }}>
                          Acciones
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((item) => (
                        <TableRow key={item.id} hover>
                          <TableCell sx={{ py: 0.5, px: 1 }}>{item.name}</TableCell>
                          <TableCell sx={{ py: 0.5, px: 1 }}>{item.license_number}</TableCell>
                          <TableCell sx={{ py: 0.5, px: 1 }}>{item.phone}</TableCell>
                          <TableCell sx={{ py: 0.5, px: 1 }}>{item.email}</TableCell>
                          <TableCell sx={{ py: 0.5, px: 1 }}>{item.status}</TableCell>
                          <TableCell align="center" sx={{ py: 0.5, px: 1 }}>
                            {/* Botón Vista eliminado */}
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(item)}
                              aria-label="editar"
                              sx={{ mx: 0.2 }}
                            >
                              <Edit size={18} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(item.id)}
                              aria-label="eliminar"
                              sx={{ mx: 0.2 }}
                            >
                              <Trash2 size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Box>
);



};

export default ListDrivers;
