import { useEffect, useRef } from "react";
import io from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMotorcycle, FaPlay, FaStop } from "react-icons/fa";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import road from "../../assets/road.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const customIcon = new L.Icon({
    iconUrl: road,
    iconSize: [25, 25],
    iconAnchor: [25, 25],
    popupAnchor: [12.5, 12.5],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
    shadowAnchor: [14, 41],
});

export default function MotoMapRealtime({ plate }) {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const socketRef = useRef(null);
    const pathRef = useRef(null);

    const BASE_URL = "http://localhost:5000";

    useEffect(() => {
        if (!plate) return;

        if (!mapRef.current && document.getElementById("map")) {
            const map = L.map("map").setView([5.05, -75.49], 16);
            mapRef.current = map;

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(map);

            const marker = L.marker([5.05, -75.49], { icon: customIcon }).addTo(map);
            marker.bindTooltip(`Placa: ${plate}`, { permanent: true, direction: "right" });

            markerRef.current = marker;

            const polyline = L.polyline([], { color: "red" }).addTo(map);
            pathRef.current = polyline;
        }

        socketRef.current = io(BASE_URL);

        socketRef.current.on(plate, (data) => {
            const { lat, lng } = data;
            if (markerRef.current && mapRef.current) {
                markerRef.current.setLatLng([lat, lng]);
                mapRef.current.panTo([lat, lng]);
                if (pathRef.current) {
                    pathRef.current.addLatLng([lat, lng]);
                }
            }
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [plate]);

    const iniciarTracking = async () => {
        try {
            const res = await fetch(`${BASE_URL}/motorcycles/track/${plate}`, {
                method: "POST",
            });
            const json = await res.json();
            console.log("✅ Tracking iniciado:", json);
        } catch (error) {
            console.error("❌ Error al iniciar:", error);
        }
    };

    const detenerTracking = async () => {
        try {
            const res = await fetch(`${BASE_URL}/motorcycles/stop/${plate}`, {
                method: "POST",
            });
            const json = await res.json();
            console.log("🛑 Tracking detenido:", json);
        } catch (error) {
            console.error("❌ Error al detener:", error);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 700,
                mx: "auto",
                mt: { xs: 4, md: 25 },
                mb: { xs: 2, md: 4 },
                px: { xs: 1, sm: 2, md: 4 },
            }}
        >
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                        <FaMotorcycle color="#ff9800" size={28} />
                        <Typography variant="h5" fontWeight="bold">
                            Seguimiento en Tiempo Real
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" ml={2}>
                            {plate ? `Placa: ${plate}` : "Sin placa seleccionada"}
                        </Typography>
                    </Stack>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<FaPlay />}
                            onClick={iniciarTracking}
                            disabled={!plate}
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                        >
                            Iniciar Recorrido
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<FaStop />}
                            onClick={detenerTracking}
                            disabled={!plate}
                            sx={{ width: { xs: "100%", sm: "auto" } }}
                        >
                            Detener Recorrido
                        </Button>
                    </Stack>
                    <Box
                        id="map"
                        sx={{
                            width: "100%",
                            height: { xs: 300, sm: 400, md: 450 },
                            borderRadius: 2,
                            boxShadow: 2,
                            border: "1px solid #e0e0e0",
                            overflow: "hidden",
                        }}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}
