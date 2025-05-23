import { useNotification } from '../../context/NotificationContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Badge, IconButton, Menu, MenuItem, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider
} from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { Button } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';


function getStatusColor(status) {
  switch (status) {
    case "Entregado": return "success.main";
    case "En progreso": return "info.main";
    case "Pendiente": return "warning.main";
    case "Cancelado": return "error.main";
    default: return "grey.500";
  }
}

function getStatusIcon(status) {
  switch (status) {
    case "Entregado": return <AssignmentTurnedInIcon />;
    case "En progreso": return <DirectionsBikeIcon />;
    case "Pendiente": return <PendingActionsIcon />;
    case "Cancelado": return <CancelIcon />;
    default: return <PendingActionsIcon />;
  }
}

export default function NotificationBell() {
  const { notifications, clearNotifications } = useNotification();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 350,
              width: 350,
              padding: 0,
            },
          },
        }}
      >
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No hay notificaciones
            </Typography>
          </MenuItem>
        ) : (
          <>
            <List dense sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
              {notifications.map((n, i) => (
                <div key={i}>
                  <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getStatusColor(n.estado) }}>
                        {getStatusIcon(n.estado)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight={600}>
                          {n.tipo === "nuevo" ? "Nuevo pedido" : "Pedido actualizado"}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            Cliente: {n.cliente}
                          </Typography>
                          <Typography variant="body2" sx={{ color: getStatusColor(n.estado), fontWeight: 500 }}>
                            Estado: {n.estado}
                          </Typography>
                          {n.fecha && (
                            <Typography variant="caption" color="text.secondary">
                              {n.fecha}
                            </Typography>
                          )}
                          {n.license_plate && (
                            <Button
                              variant="text"
                              size="small"
                              startIcon={<MapIcon />}
                              onClick={() => {
                                handleClose(); // para cerrar el menú antes de navegar
                                navigate(`/mapa-moto/${n.license_plate}`);
                              }}
                              sx={{ mt: 1, ml: -1 }}
                            >
                              Mapa
                            </Button>
                          )}
                        </>
                      }

                    />
                  </ListItem>
                  {i < notifications.length - 1 && <Divider component="li" />}
                </div>
              ))}
            </List>
            <MenuItem onClick={clearNotifications} sx={{ color: 'red', justifyContent: "center" }}>
              Limpiar notificaciones
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}
