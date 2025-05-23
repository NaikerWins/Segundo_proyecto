import { getCustomerByEmail, createCustomer } from "./customerService";
import { auth } from "../firebase";

export const syncWithBackend = async (user, setCustomer, navigate) => {
    try {
        const token = await auth.currentUser.getIdToken();

        const photoURL = user.photoURL || "https://i.pravatar.cc/300"; // Imagen genérica
        const name = user.displayName || "Usuario"; // Nombre genérico
        const email = user.email;
        const phone = user.phoneNumber || "0000000000"; // Número genérico

        const baseInfo = {
            name: name,
            email: email,
            phone: phone,
            photo: photoURL,
            token: token,
        };

        const existingCustomer = await getCustomerByEmail(email, token);

        if (existingCustomer) {
            const updatedCustomer = { ...existingCustomer, photo: photoURL, token };
            setCustomer(updatedCustomer);
            localStorage.setItem("customer", JSON.stringify(updatedCustomer));
            console.log("Cliente ya existe:", updatedCustomer);
        } else {
            const createdCustomer = await createCustomer(baseInfo, token);
            const newCustomer = { ...createdCustomer, photo: photoURL, token };
            setCustomer(newCustomer);
            localStorage.setItem("customer", JSON.stringify(newCustomer));
            console.log("Nuevo cliente guardado:", newCustomer);
        }
        

        navigate("/clientes");
    } catch (error) {
        console.error("Error sincronizando con el backend:", error);
        alert("Error sincronizando con el backend. Verifica los datos y vuelve a intentar.");
    }
};
