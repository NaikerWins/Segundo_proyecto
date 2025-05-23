// src/context/CustomerContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
// Creamos el contexto
const CustomerContext = createContext();

// Hook para usar el contexto fácilmente
export const useCustomer = () => useContext(CustomerContext);


// Componente proveedor
export const CustomerProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);

    // Cargar el cliente desde localStorage al iniciar la app
    useEffect(() => {
        const storedCustomer = localStorage.getItem("customer");
        console.log("Datos en localStorage:", storedCustomer);
        if (storedCustomer) {
            const parsedCustomer = JSON.parse(storedCustomer);
            setCustomer(parsedCustomer);
        }
    }, []);

    // Cuando cambia el cliente, lo guardamos en localStorage
    useEffect(() => {
        if (customer) {
            localStorage.setItem("customer", JSON.stringify(customer));
        } else {
            localStorage.removeItem("customer");
        }
    }, [customer]);

    return (
        <CustomerContext.Provider value={{ customer, setCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
};
