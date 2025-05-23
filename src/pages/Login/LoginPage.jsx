// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    OAuthProvider
} from "firebase/auth";
import { Typography, Box, Paper, Container } from "@mui/material";
import LoginForm from "../../components/Login/LoginForm";
import { auth, providerGoogle, providerGithub, microsoftProvider } from "../../firebase";
import { syncWithBackend } from "../../services/authService";
import { useCustomer } from "../../context/CustomerContext";
import "../../styles/login.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const { setCustomer } = useCustomer();  

    const handleSubmit = (values) => {
        const { email, password, name, phone } = values;

        if (isRegistering) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Registration successful!");
                    const userWithExtras = {
                        id: userCredential.user.uid,
                        email: userCredential.user.email,
                        name: name,
                        phone: phone,
                        photo: userCredential.user.photoURL,
                    };
                    
                    syncWithBackend(userWithExtras, setCustomer, navigate);
                    
                })
                .catch((error) => {
                    alert("Error during registration: " + error.message);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Login successful!");
                    syncWithBackend(userCredential.user, setCustomer, navigate);
                })
                .catch((error) => {
                    alert("Error during login: " + error.message);
                });
        }
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                localStorage.setItem("accessToken", token);
                alert("Google login successful!");
                setCustomer(result.user)
                localStorage.setItem("user", JSON.stringify(result.user))
                syncWithBackend(result.user, setCustomer, navigate);
            })
            .catch((error) => {
                alert("Error with Google: " + error.message);
            });
    };

    const handleGithubLogin = () => {
        signInWithPopup(auth, providerGithub)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                localStorage.setItem("accessToken", token);
                alert("Github login successful!");
                syncWithBackend(result.user, setCustomer, navigate);
            })
            .catch((error) => {
                alert("Error with Github: " + error.message);
            });
    };

    const handleMicrosoftLogin = () => {
        signInWithPopup(auth, microsoftProvider)
            .then((result) => {
                const credential = OAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                localStorage.setItem("accessToken", token);
                alert("Microsoft login successful!");
                syncWithBackend(result.user, setCustomer, navigate);
            })
            .catch((error) => {
                alert("Error with Microsoft: " + error.message);
            });
    };

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                pt: { xs: 2, sm: 10 },
                pb: { xs: 2, sm: 1 }
            }}

        >
            <Container maxWidth="lg">
                <Paper
                    elevation={8}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: 4,
                        mt: 4,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                        maxWidth: 800, // Puedes ajustar este valor
                        mx: "auto"     // Centra el Paper dentro del Container
                    }}
                >
                    <Typography variant="h3" align="center" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
                        Rappi Entregas
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                        {isRegistering ? "Crear cuenta" : "Iniciar sesion"}
                    </Typography>
                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        isRegistering={isRegistering}
                        handleSubmit={handleSubmit}
                        handleGoogleLogin={handleGoogleLogin}
                        handleGithubLogin={handleGithubLogin}
                        handleMicrosoftLogin={handleMicrosoftLogin}
                        toggleAuthMode={toggleAuthMode}
                    />
                </Paper>
            </Container>
        </Box>
    );
}

export default LoginPage;
