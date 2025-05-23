import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer, updateCustomer } from "../services/customerService";
import Swal from "sweetalert2";

export function useCustomers(loggedUser, setCustomer) {
    const [customers, setCustomers] = useState([]);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        if (loggedUser) {
            getCustomers().then(setCustomers);
        }
    }, [loggedUser]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            await deleteCustomer(id);
            setCustomers(customers.filter(c => c.id !== id));
            Swal.fire("Eliminado", "El cliente ha sido eliminado.", "success");
        }
    };

    const handleUpdate = async (id, updateData) => {
        await updateCustomer(id, updateData);
        setCustomers(customers.map(c => (c.id === id ? { ...c, ...updateData } : c)));
        setEditingCustomerId(null);
        if (id === loggedUser.id) {
            const updated = { ...loggedUser, ...updateData };
            setCustomer({ ...updated });
            localStorage.setItem("customer", JSON.stringify(updated));
        }
        Swal.fire("Actualizado", "Los datos del cliente han sido actualizados.", "success");
    };

    const handleEditClick = (customer) => {
        setEditingCustomerId(customer.id);
        setEditFormData({ name: customer.name, email: customer.email, phone: customer.phone });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    return {
        customers,
        editingCustomerId,
        editFormData,
        setEditingCustomerId,
        handleDelete,
        handleUpdate,
        handleEditClick,
        handleInputChange,
    };
}
