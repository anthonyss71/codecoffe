import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./../styles/Register.css";
import authService from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    fechaNacimiento: "",
    terminos: false,
  });

  const [formErrors, setFormErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    fechaNacimiento: "",
    terminos: "",
  });

  const validateForm = () => {
    const errors = {};
    const { email, password, confirmPassword, telefono } = formData;

    if (!formData.nombre) errors.nombre = "Nombre es obligatorio";
    if (!formData.apellido) errors.apellido = "Apellido es obligatorio";

    // Validación de email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) errors.email = "Correo electrónico es obligatorio";
    else if (!emailPattern.test(email))
      errors.email = "Correo electrónico no válido";

    // Contraseña y confirmación
    if (!password) errors.password = "Contraseña es obligatoria";
    if (password !== confirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden";

    // Validación de teléfono (solo números y 9 dígitos)
    if (!telefono) errors.telefono = "Teléfono es obligatorio";
    else if (!/^\d{9}$/.test(telefono)) errors.telefono = "Teléfono no válido";

    if (!formData.terminos)
      errors.terminos = "Debes aceptar los términos y condiciones";

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Si no hay errores, el formulario es válido
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userData = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        telefono: formData.telefono.trim(),
        fechaNacimiento: formData.fechaNacimiento,
      };

      // Llamar al servicio de autenticación para registrar
      const response = await authService.register(userData);
      console.log('Respuesta del registro:', response); // Para debug

      if (response.success) {
        // Solo guardar en localStorage si el registro en el backend fue exitoso
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("userToken", response.data.token);
        navigate("/");
      } else {
        setError(response.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setError(error.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="container" style={{marginTop:'110px'}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Logo y Título */}
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Starbucks Logo"
              className="img-fluid mb-3"
              style={{ width: "100px" }}
            />
            <h1 className="h4 fw-bold text-dark">Crear cuenta</h1>
          </div>

          {/* Formulario */}
          <div className="card shadow p-4">
            <div className="mb-4">
              <h2 className="text-success text-uppercase h5 fw-bold">
                STARBUCKS® REWARDS
              </h2>
              <p className="text-muted small">
                Únete a Starbucks Rewards para ganar Estrellas por tus compras y
                canjearlas por bebidas y comida gratis.
              </p>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-grid gap-3">
              <div className="form-floating">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`form-control ${
                    formErrors.nombre ? "is-invalid" : ""
                  }`}
                  required
                />
                <label htmlFor="nombre">Nombre</label>
                {formErrors.nombre && (
                  <div className="invalid-feedback">{formErrors.nombre}</div>
                )}
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className={`form-control ${
                    formErrors.apellido ? "is-invalid" : ""
                  }`}
                  required
                />
                <label htmlFor="apellido">Apellido</label>
                {formErrors.apellido && (
                  <div className="invalid-feedback">{formErrors.apellido}</div>
                )}
              </div>

              <div className="form-floating">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${
                    formErrors.email ? "is-invalid" : ""
                  }`}
                  required
                />
                <label htmlFor="email">Correo electrónico</label>
                {formErrors.email && (
                  <div className="invalid-feedback">{formErrors.email}</div>
                )}
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control ${
                    formErrors.password ? "is-invalid" : ""
                  }`}
                  required
                />
                <label htmlFor="password">Contraseña</label>
                {formErrors.password && (
                  <div className="invalid-feedback">{formErrors.password}</div>
                )}
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-control ${
                    formErrors.confirmPassword ? "is-invalid" : ""
                  }`}
                  required
                />
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                {formErrors.confirmPassword && (
                  <div className="invalid-feedback">
                    {formErrors.confirmPassword}
                  </div>
                )}
              </div>

              <div className="form-floating">
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={`form-control ${
                    formErrors.telefono ? "is-invalid" : ""
                  }`}
                  required
                />
                <label htmlFor="telefono">Teléfono</label>
                {formErrors.telefono && (
                  <div className="invalid-feedback">{formErrors.telefono}</div>
                )}
              </div>

              <div className="form-floating">
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="terminos"
                  name="terminos"
                  checked={formData.terminos}
                  onChange={handleChange}
                  className="form-check-input"
                  required
                />
                <label htmlFor="terminos" className="form-check-label">
                  Acepto los términos y condiciones
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </form>

            <div className="mt-3 text-center">
              <span>¿Ya tienes una cuenta? </span>
              <Link
                to="/login"
                className="text-decoration-none text-success fw-bold"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
