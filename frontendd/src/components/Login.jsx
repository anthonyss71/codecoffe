import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "./../services/authService";
import logo from "../assets/images/logo.png";
import "./../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    recordar: false,
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });

      if (response.success) {
        // Si es el admin, establecer isAdmin = true
        if (formData.email === "pepe@admin.com") {
          const adminData = {
            ...response.data.user,
            isAdmin: true
          };
          localStorage.setItem("currentUser", JSON.stringify(adminData));
        }
        navigate("/");
        window.location.reload();
      } else {
        setFormErrors({
          ...formErrors,
          general: response.message || "Error al iniciar sesión"
        });
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      setFormErrors({
        ...formErrors,
        general: error.message || "Error al iniciar sesión. Verifica tus datos.",
      });
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

  const validateForm = () => {
    let valid = true;
    const errors = { email: "", password: "" };

    if (!formData.email) {
      errors.email = "El correo electrónico es obligatorio";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El correo electrónico no es válido";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "La contraseña es obligatoria";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Modal Personalizado */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error de inicio de sesión</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <p>Contraseña incorrecta</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleClose}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="main-content" style={{ maxWidth: "420px", width: "100%", borderRadius: "18px", boxShadow: "0 0 24px 0 rgba(0,0,0,0.07)", background: "#fff", padding: "32px 28px" }}>
        {/* Logo */}
        <div className="mb-4 text-center">
          <img
            src={logo}
            alt="Starbucks Logo"
            className="img-fluid"
            style={{ width: "90px" }}
          />
          <h1 className="h4 text-dark fw-bold mt-2" style={{ letterSpacing: "0.04em" }}>Bienvenido</h1>
        </div>

        {/* Card Principal */}
        <div>
          <div className="mb-4 text-center">
            <h2 className="text-success text-uppercase h5 fw-bold" style={{ letterSpacing: "0.08em" }}>
              STARBUCKS® REWARDS
            </h2>
            <p className="text-muted small">
              Ingresa a tu cuenta Starbucks Rewards para ganar Estrellas con
              tus compras y canjearlas por tus productos favoritos.
            </p>
          </div>

          {formErrors.general && (
            <div className="alert alert-danger">{formErrors.general}</div>
          )}

          <form onSubmit={handleSubmit} className="d-grid gap-3">
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
                style={{ borderRadius: "8px" }}
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
                style={{ borderRadius: "8px" }}
              />
              <label htmlFor="password">Contraseña</label>
              {formErrors.password && (
                <div className="invalid-feedback">{formErrors.password}</div>
              )}
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                id="recordar"
                name="recordar"
                checked={formData.recordar}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="recordar" className="form-check-label">
                Recordar datos de usuario
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
              style={{ borderRadius: "8px", fontWeight: 600, letterSpacing: "0.04em" }}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            <div className="text-center">
              <a href="/recuperar-password" className="text-decoration-none">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>

          {/* Sección de registro */}
          <div className="mt-4">
            <h3 className="h6 text-center">¿Aún no eres miembro Starbucks Rewards?</h3>
            <div className="d-flex gap-2">
              <a
                href="/invitado"
                className="btn btn-outline-success flex-fill"
                style={{ borderRadius: "8px", fontWeight: 600 }}
              >
                Continuar como invitado
              </a>
              <a href="/registro" className="btn btn-success flex-fill" style={{ borderRadius: "8px", fontWeight: 600 }}>
                Crear nueva cuenta
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-3 text-center">
          <p className="small text-muted">
            ©2024 Starbucks Coffee Company. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;