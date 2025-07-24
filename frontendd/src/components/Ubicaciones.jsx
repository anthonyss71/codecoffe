import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/Ubicaciones.css";
const Ubicaciones = () => {
  const [direccion, setDireccion] = useState("");

  return (
    <>
      <div className="container my-5 bg-light py-4">
        <h2 className="text-center text-uppercase fw-bold mb-4">
          Elige el método de entrega
        </h2>

        <div className="row g-4">
          {/* Opciones de entrega */}
          <div className="col-md-6">
            <div className="d-grid gap-3">
              <button className="btn btn-success text-uppercase fw-bold">
                <i className="bi bi-bicycle me-2"></i> Delivery
              </button>
              <button className="btn btn-outline-success text-uppercase fw-bold">
                <i className="bi bi-shop me-2"></i> Recojo en tienda
              </button>
            </div>

            <div className="my-4">
              <div className="input-group">
                <span className="input-group-text bg-success text-white">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Dirección"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
            </div>

            <button className="btn btn-success w-100 text-uppercase fw-bold">
              Enviar a esta dirección
            </button>
          </div>

          {/* Mapa */}
          <div className="col-md-6">
            <div className="rounded shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.964663061675!2d-77.09340792584577!3d-12.076928087378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c96c8bf00001%3A0x7c3138581a7c5ad5!2sSan%20Felipe%2C%20Jes%C3%BAs%20Mar%C3%ADa%2015072!5e0!3m2!1ses-419!2spe!4v1690926546095!5m2!1ses-419!2spe"
                width="100%"
                height="450"
                style={{ borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ubicaciones;
