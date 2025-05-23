import React, { createContext, useContext, useState, useEffect } from 'react';

const ContextoGlobal = createContext();

export function useGlobal() {
  return useContext(ContextoGlobal);
}

const leerLS = (clave, valorDefecto) => {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorDefecto;
  } catch {
    return valorDefecto;
  }
};

export function ProveedorGlobal({ children }) {
  // Carrito de productos
  const [carrito, setCarrito] = useState(() => leerLS('carrito', []));
  // Direcciones guardadas
  const [direcciones, setDirecciones] = useState(() => leerLS('direcciones', []));
  // Pedidos realizados
  const [pedidos, setPedidos] = useState(() => leerLS('pedidos', []));

  // Buscador global
  const [buscadorVisible, setBuscadorVisible] = useState(false);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);
  useEffect(() => {
    localStorage.setItem('direcciones', JSON.stringify(direcciones));
  }, [direcciones]);
  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  // Funciones para el carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };
  const quitarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(carrito.map(item =>
      item.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };
  const limpiarCarrito = () => setCarrito([]);

  // Funciones para direcciones
  const agregarDireccion = (direccion) => {
    setDirecciones([...direcciones, direccion]);
  };

  // Función para crear pedido
  const crearPedido = (pedido) => {
    setPedidos([...pedidos, pedido]);
    limpiarCarrito();
  };

  return (
    <ContextoGlobal.Provider value={{
      carrito, setCarrito, agregarAlCarrito, quitarDelCarrito, actualizarCantidad, limpiarCarrito,
      direcciones, setDirecciones, agregarDireccion,
      pedidos, setPedidos, crearPedido,
      buscadorVisible, setBuscadorVisible, busquedaGlobal, setBusquedaGlobal
    }}>
      {children}
    </ContextoGlobal.Provider>
  );
} 