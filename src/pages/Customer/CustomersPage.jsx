import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card } from "@mui/material";
import { useCustomers } from "../../hooks/useCustomers";
import CustomerList from "../../components/Customer/CustomerList";
import CustomerProfile from "../../components/Customer/CustomerProfile";

import { useCustomer } from "../../context/CustomerContext";

function CustomersPage() {
    const navigate = useNavigate();
    const { customer: loggedUser, setCustomer } = useCustomer();

    const {
        customers,
        handleDelete,
        handleUpdate,
        handleEditClick,
    } = useCustomers(loggedUser, setCustomer);

    return (
        <Box
            minHeight="100vh"
            width="100vw"
            bgcolor="var(--background)"
            color="var(--foreground)"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            pt="200px"
            sx={{
                pt: { xs: 45, sm: 20 }
            }}
        >
            <Card
                sx={{
                    width: { xs: '98%', sm: 600, md: 1200 },
                    p: { xs: 2, sm: 4 },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 6,
                }}
            >
                {/* Lista de clientes */}

                <Box
                    width={{ xs: "100%", md: "30%" }}
                    minWidth={0}
                    p={4}
                    borderRight={{ md: "1px solid", xs: "none" }}
                    borderColor="divider"
                    className="customers-scrollbar"
                    sx={{
                        color: "text.primary",
                        overflowY: "auto",
                        maxHeight: { xs: 250, md: 500 },
                        mb: { xs: 2, md: 0 }
                    }}
                >
                    <CustomerList
                        customers={customers}
                        loggedUser={loggedUser}
                        onEdit={handleEditClick}
                        onDelete={handleDelete}
                    />
                </Box>

                {/* Perfil y edición */}
                <Box
                    flex={1}
                    p={4}
                    sx={{
                        overflow: "auto",
                        color: "text.primary",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Mi Perfil
                    </Typography>

                    <CustomerProfile
                        user={loggedUser}
                        onUpdate={(newValues) => handleUpdate(loggedUser.id, newValues)}
                    />

                    <Button
                        onClick={() => navigate("/ordenes")}
                        variant="contained"
                        sx={{
                            mt: 1,
                            bgcolor: "primary.main",
                            "&:hover": { bgcolor: "primary.dark" },
                        }}
                    >
                        Continuar a pedidos
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}

export default CustomersPage;
