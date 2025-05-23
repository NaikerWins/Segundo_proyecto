import "../src/styles/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext";
import Login from "./pages/Login/LoginPage";
import CustomersPage from "./pages/Customer/CustomersPage";
import MotorcyclePage from "./pages/Motorcycle/MotorcyclePage";
import ShiftsPage from "./pages/Shifts/ShiftsPage";
import NavBar from "./components/Navbar/navBar";
import MotoMapRealtime from "./components/Map/MotoMap"
import ProductosCrud from './pages/productos/productosCrud';
import AddressCRUD from './pages/Address/AddressCrud'
import IssuePage from './pages/Issue/IssuePage';
import Chat from './pages/Chatbot/Chatbot';
import ListRestaurants from './pages/Restaurant/List';
import ListMenus from './pages/Menu/List';
import ListDrivers from './pages/Driver/List';
import OrdersPage from './pages/Orders/OrdersPage'
import { ThemeProvider, CssBaseline } from "@mui/material";
import darkTheme from "./theme"; // Asegúrate que el path sea correcto
import { NotificationProvider } from "./context/NotificationContext"; // importa el proveedor
import Graficas from "./pages/Graficos/GraficosPage"
import PhotoPage from "./pages/Photos/PhotoPage"


function MotoMapPage() {
  const { plate } = useParams()
  return <MotoMapRealtime plate={plate} />
}
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Aplica el modo oscuro y normaliza estilos */}
      <div className="App">
        <Router>
          <NotificationProvider>
            <CustomerProvider>
              <NavBar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/clientes" element={<CustomersPage />} />
                <Route path="/motos" element={<MotorcyclePage />} />
                <Route path="/turnos" element={<ShiftsPage />} />
                <Route path="/mapa-moto/:plate" element={<MotoMapPage />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/productos" element={<ProductosCrud />} />
                <Route path="/ordenes" element={<OrdersPage />} />
                <Route path="/direcciones" element={<AddressCRUD />} />
                <Route path="/incovenientes" element={<IssuePage />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/restaurantes" element={<ListRestaurants />} />
                <Route path="/menus" element={<ListMenus />} />
                <Route path="/conductores" element={<ListDrivers />} />
                <Route path="/graficos" element={<Graficas />} />
                <Route path="/fotos" element={<PhotoPage/>} />
              </Routes>
              
            </CustomerProvider>
          </NotificationProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
