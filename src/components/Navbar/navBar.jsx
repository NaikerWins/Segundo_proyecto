import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    FaBars,
    FaTimes,
    FaStore,
    FaChevronDown,
    FaRobot,
    FaSignOutAlt
} from "react-icons/fa";
import "../../styles/NavBar.css";
import { useCustomer } from "../../context/CustomerContext";
import Avatar from "@mui/material/Avatar";
import NotificationBell from "../../pages/Notificaciones/NotificationBell";

const NavBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openConductores, setOpenConductores] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false);
    const [openLocales, setOpenLocales] = useState(false);
    const { customer } = useCustomer();

    if (pathname === "/login") return null;

    const handleLogout = () => {
        localStorage.removeItem("customer");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container" style={{ justifyContent: "center" }}>
                <div className="navbar-logo">
                    <FaStore style={{ marginRight: 8, color: "#4caf50" }} />
                    Entregas Rápidas
                </div>

                <button className="navbar-toggle" onClick={() => setOpen(!open)}>
                    {open ? <FaTimes /> : <FaBars />}
                </button>

                <ul className={`navbar-links ${open ? "open" : ""}`} style={{ alignItems: "center", flex: 1 }}>
                    {/* Conductores */}
                    <li className="navbar-dropdown">
                        <button
                            className="navbar-dropdown-btn"
                            onClick={() => {
                                setOpenConductores(!openConductores);
                                setOpenAdmin(false);
                                setOpenLocales(false);
                            }}
                        >
                            Conductores <FaChevronDown style={{ marginLeft: 4 }} />
                        </button>
                        <ul className={`navbar-dropdown-menu${openConductores ? " show" : ""}`}>
                            <li><Link to="/conductores" className={pathname === "/conductores" ? "active" : ""} onClick={() => { setOpen(false); setOpenConductores(false); }}>Conductores</Link></li>
                            <li><Link to="/motos" className={pathname === "/motos" ? "active" : ""} onClick={() => { setOpen(false); setOpenConductores(false); }}>Vehículos</Link></li>
                            <li><Link to="/turnos" className={pathname === "/turnos" ? "active" : ""} onClick={() => { setOpen(false); setOpenConductores(false); }}>Jornadas</Link></li>
                            <li><Link to="/incovenientes" className={pathname === "/incovenientes" ? "active" : ""} onClick={() => { setOpen(false); setOpenConductores(false); }}>Problemas</Link></li>
                            <li><Link to="/fotos" className={pathname === "/fotos" ? "active" : ""} onClick={() => { setOpen(false); setOpenConductores(false); }}>Evidencias</Link></li>
                        </ul>
                    </li>

                    {/* Administración */}
                    <li className="navbar-dropdown">
                        <button
                            className="navbar-dropdown-btn"
                            onClick={() => {
                                setOpenAdmin(!openAdmin);
                                setOpenConductores(false);
                                setOpenLocales(false);
                            }}
                        >
                            Administración <FaChevronDown style={{ marginLeft: 4 }} />
                        </button>
                        <ul className={`navbar-dropdown-menu${openAdmin ? " show" : ""}`}>
                            <li><Link to="/clientes" className={pathname === "/clientes" ? "active" : ""} onClick={() => { setOpen(false); setOpenAdmin(false); }}>Usuarios</Link></li>
                            <li><Link to="/ordenes" className={pathname === "/ordenes" ? "active" : ""} onClick={() => { setOpen(false); setOpenAdmin(false); }}>Órdenes</Link></li>
                            <li><Link to="/direcciones" className={pathname === "/direcciones" ? "active" : ""} onClick={() => { setOpen(false); setOpenAdmin(false); }}>Ubicaciones</Link></li>
                            <li><Link to="/graficos" className={pathname === "/graficos" ? "active" : ""} onClick={() => { setOpen(false); setOpenAdmin(false); }}>Estadísticas</Link></li>
                        </ul>
                    </li>

                    {/* Locales */}
                    <li className="navbar-dropdown">
                        <button
                            className="navbar-dropdown-btn"
                            onClick={() => {
                                setOpenLocales(!openLocales);
                                setOpenConductores(false);
                                setOpenAdmin(false);
                            }}
                        >
                            Locales <FaChevronDown style={{ marginLeft: 4 }} />
                        </button>
                        <ul className={`navbar-dropdown-menu${openLocales ? " show" : ""}`}>
                            <li><Link to="/restaurantes" className={pathname === "/restaurantes" ? "active" : ""} onClick={() => { setOpen(false); setOpenLocales(false); }}>Comercios</Link></li>
                            <li><Link to="/menus" className={pathname === "/menus" ? "active" : ""} onClick={() => { setOpen(false); setOpenLocales(false); }}>Platos</Link></li>
                            <li><Link to="/productos" className={pathname === "/productos" ? "active" : ""} onClick={() => { setOpen(false); setOpenLocales(false); }}>Artículos</Link></li>
                        </ul>
                    </li>

                    {/* Asistente */}
                    <li style={{ display: "flex", alignItems: "center" }}>
                        <Link
                            to="/chat"
                            className={pathname === "/chat" ? "active" : ""}
                            onClick={() => {
                                setOpen(false);
                                setOpenConductores(false);
                                setOpenAdmin(false);
                                setOpenLocales(false);
                            }}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                        >
                            <FaRobot size={30} />
                            <span style={{ fontWeight: 600, color: "#fff" }}>Asistente</span>
                        </Link>
                    </li>
                </ul>

                {/* Notificaciones y Logout */}
                <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                    <NotificationBell />
                    {customer && (
                        <Avatar
                            src={customer.photo || ""}
                            alt={customer.name || "avatar"}
                            sx={{
                                width: 36,
                                height: 36,
                                marginRight: 1,
                                bgcolor: "#4caf50",
                                fontWeight: 700,
                                fontSize: 18,
                            }}
                        >
                            {(!customer.photo && customer.name) ? customer.name[0].toUpperCase() : ""}
                        </Avatar>
                    )}
                    <button
                        className="navbar-dropdown-btn"
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            color: "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center"
                        }}
                        onClick={handleLogout}
                        title="Cerrar sesión"
                    >
                        <FaSignOutAlt size={22} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
