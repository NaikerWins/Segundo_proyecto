import { createContext, useState, useContext } from 'react';
import sonidoNuevo from '../assets/sounds/nuevo.mp3';
import sonidoActualizado from '../assets/sounds/actualizado.mp3';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playNotificationSound = (notification) => {
    if (!soundEnabled) return;

    let soundFile = null;

    if (notification.tipo === 'nuevo') {
      soundFile = sonidoNuevo;
    } else if (notification.tipo === 'actualizado') {
      soundFile = sonidoActualizado;
    }

    if (soundFile) {
      const audio = new Audio(soundFile);
      audio.play().catch(err => {
        console.error('Error al reproducir sonido:', err);
      });
    }
  };

  const addNotification = (notification) => {
    playNotificationSound(notification);
    setNotifications(prev => [...prev, notification]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
