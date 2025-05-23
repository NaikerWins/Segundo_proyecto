import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Stack, Divider } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaWindows } from "react-icons/fa";

const LoginForm = ({
  isRegistering,
  handleSubmit,
  handleGoogleLogin,
  handleGithubLogin,
  handleMicrosoftLogin,
  toggleAuthMode,
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo electrónico inválido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("La contraseña es obligatoria"),
      ...(isRegistering && {
        name: Yup.string().required("El nombre es obligatorio"),
        phone: Yup.string().required("El número es obligatorio"),
      }),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const inputStyles = {
    backgroundColor: "#f9f9fb",
    borderRadius: 8,
    '& label': {
      color: "#6e6e6e",
      fontWeight: 500,
    },
    '& label.Mui-focused': {
      color: "#3c82f6",
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "#d0d0d0",
      },
      '&:hover fieldset': {
        borderColor: "#b0b0b0",
      },
      '&.Mui-focused fieldset': {
        borderColor: "#3c82f6",
        borderWidth: 2,
      },
      color: "#2a2a2a",
    },
    '& .MuiInputBase-input': {
      color: "#2a2a2a",
    },
  };

  const mainButtonStyles = {
    background: "linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)",
    color: "#fff",
    fontWeight: 600,
    borderRadius: 10,
    padding: "12px 0",
    textTransform: "none",
    boxShadow: "0 4px 10px rgba(59, 130, 246, 0.4)",
    '&:hover': {
      background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)",
      boxShadow: "0 6px 16px rgba(59, 130, 246, 0.6)",
    },
  };

  const socialButtonStyles = {
    borderRadius: 10,
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    '&:hover': {
      transform: "scale(1.03)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  };

  const googleButton = {
    ...socialButtonStyles,
    backgroundColor: "#ffffff",
    color: "#444",
    border: "1px solid #ddd",
    '&:hover': { backgroundColor: "#f1f1f1" },
  };

  const githubButton = {
    ...socialButtonStyles,
    backgroundColor: "#24292e",
    color: "#fff",
    '&:hover': { backgroundColor: "#1c1f23" },
  };

  const microsoftButton = {
    ...socialButtonStyles,
    backgroundColor: "#2f77d0",
    color: "#fff",
    '&:hover': { backgroundColor: "#1e60b5" },
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        maxWidth: "420px",
        margin: "auto"
      }}
    >
      <TextField
        type="email"
        label="Correo electrónico"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        fullWidth
        autoComplete="email"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={inputStyles}
      />
      <TextField
        type="password"
        label="Contraseña"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        fullWidth
        autoComplete="current-password"
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={inputStyles}
      />
      {isRegistering && (
        <>
          <TextField
            type="text"
            label="Nombre"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={inputStyles}
          />
          <TextField
            type="text"
            label="Teléfono"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            fullWidth
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={inputStyles}
          />
        </>
      )}
      <Button type="submit" variant="contained" fullWidth sx={mainButtonStyles}>
        {isRegistering ? "Crear cuenta" : "Iniciar sesión"}
      </Button>

      <Typography sx={{ mt: 1, textAlign: "center", color: "#4b4b4b" }}>
        {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes una cuenta?"}{" "}
        <Button
          onClick={toggleAuthMode}
          color="primary"
          size="small"
          sx={{ textTransform: "none" }}
        >
          {isRegistering ? "Iniciar sesión" : "Registrarse"}
        </Button>
      </Typography>

      <Divider sx={{ my: 2, borderColor: "#ccc" }}>
        También puedes ingresar con
      </Divider>

      <Stack direction="column" spacing={2}>
        <Button
          onClick={handleGoogleLogin}
          variant="contained"
          fullWidth
          startIcon={<FcGoogle size={22} />}
          sx={googleButton}
        >
          Google
        </Button>
        <Button
          onClick={handleGithubLogin}
          variant="contained"
          fullWidth
          startIcon={<FaGithub size={20} />}
          sx={githubButton}
        >
          Github
        </Button>
        <Button
          onClick={handleMicrosoftLogin}
          variant="contained"
          fullWidth
          startIcon={<FaWindows size={20} />}
          sx={microsoftButton}
        >
          Microsoft
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
