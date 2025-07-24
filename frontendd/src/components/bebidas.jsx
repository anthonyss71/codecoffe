import React, { useState } from "react";
import "./../styles/bebidas.css";
import { useCart } from "../js/CartContext";

const Bebidas = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState(Array(10).fill(1));
  const [selectedBebida, setSelectedBebida] = useState(null);

  const [bebidas] = useState([
    {
      id: 1,
      nombre: "Pure Matcha Cream Frappuccino",
      precio: 16,
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/MATCHA_FRAPPUCCINO_ECOMMERCE_V1.png",
      descripcion:
        "Deliciosa bebida que combina el té verde matcha con crema batida y hielo, creando una experiencia refrescante y única.",
    },
    {
      id: 2,
      nombre: "Holiday Cinannmon Frappuccino",
      precio: 16.5,
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/Holiday_Cinnamon_Frappuccino_v1.png",
      descripcion:
        "Una mezcla festiva de canela, café y crema batida, perfecta para las festividades.",
    },
    {
      id: 3,
      nombre: "Mocha Blanco Frappuccino",
      precio: 16.5,
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/MOCHA_BLANCO_FRAPP_V2.png",
      descripcion:
        "Deliciosa combinación de chocolate blanco, café, leche y hielo, cubierto con crema batida.",
    },
    {
      id: 4,
      nombre: "Black & White Mocha Frappuccino",
      precio: 16.5,
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/BLACK_AND_WHITE_MOCHA_FRAPP_V2.png",
      descripcion:
        "Una mezcla perfecta de chocolate negro y blanco con café, topped con crema batida.",
    },
    {
      id: 5,
      nombre: "Strawberry Acai Frozen Refresher",
      precio: 16.0,
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/STRAWBERRY_ACAI_FROZEN_REFRESHER_202303231539284586.PNG",
      descripcion:
        "Refrescante bebida congelada de fresa y acai, perfecta para días calurosos.",
    },
    {
      id: 6,
      nombre: "Strawberry Acaí Refresher",
      precio: 13.0,
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/STRAWBERRY_ACAI_REFRESHER_V2.png",
      descripcion:
        "Bebida refrescante con sabores de fresa y acai, servida con hielo y trozos de fruta real.",
    },
    {
      id: 7,
      nombre: "Mango Dragon Fruit Lemonade Refresher",
      precio: 16.0,
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/MANGO_DRAGON_FRUIT_LEMONADE_REFRESHER_V2.png",
      descripcion:
        "Limonada tropical con mango y fruta del dragón, perfectamente refrescante.",
    },
    {
      id: 8,
      nombre: "Pink Drink",
      precio: 15.5,
      imagen: "https://www.starbucks.pe/Multimedia/productos/PINK_DRINK_V2.png",
      descripcion:
        "Bebida refrescante de fresa y acai con leche de coco, servida con fresas reales.",
    },
    {
      id: 9,
      nombre: "Dragon Drink",
      precio: 15.5,
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/DRAGON_DRINK_V2.png",
      descripcion:
        "Refrescante combinación de mango y fruta del dragón con leche de coco.",
    },
    {
      id: 10,
      nombre: "Mango Dragon Frozen Refresher",
      precio: 16.0,
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/MANGO_DRAGON_FROZEN_REFRESHER_202303231541268568.PNG",
      descripcion:
        "Versión congelada de nuestra bebida de mango y fruta del dragón, perfecta para refrescarte.",
    },
  ]);

  const incrementarCantidad = (index, event) => {
    event.stopPropagation(); // Evita que se propague al contenedor padre
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decrementarCantidad = (index, event) => {
    event.stopPropagation(); // Evita que se propague al contenedor padre
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  const handleComprar = (bebida, index, event) => {
    event.stopPropagation(); // Evita que se propague al contenedor padre
    addToCart(bebida, quantities[index]);
    alert(
      `Agregaste ${quantities[index]} ${bebida.nombre} al carrito por un total de S/ ${(bebida.precio * quantities[index]).toFixed(
        2
      )}`
    );
  };

  return (
    <div className="w-100" style={{ background: "#1f4037", minHeight: "100vh", margin: 0, padding: 0 }}>
      <div style={{height: '110px', background: '#1f4037', width: '100%'}}></div>
      <div
        className="mx-auto"
        style={{
          maxWidth: "1300px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: "32px 0 32px 0",
        }}
      >
        <h2 className="text-center text-uppercase fw-bold mb-4" style={{ letterSpacing: "0.08em" }}>
          Frappuccinos
        </h2>
        <div className="row g-4 justify-content-center mx-0" style={{ width: "100%" }}>
          {bebidas.map((bebida, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={bebida.id}>
              <div
                className="card h-100 w-100 d-flex flex-column shadow-sm"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  transition: "box-shadow 0.2s",
                  overflow: "hidden",
                  minHeight: "540px",
                  margin: "0 auto",
                }}
                onClick={() => setSelectedBebida(bebida)}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    background: "#184C3A",
                    height: "220px",
                    width: "220px",
                    borderRadius: "50%",
                    margin: "0 auto",
                    marginTop: "24px",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={bebida.imagen}
                    alt={bebida.nombre}
                    style={{
                      objectFit: "contain",
                      height: "180px",
                      width: "180px",
                      background: "transparent",
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column align-items-center text-center p-4">
                  <h3 className="card-title text-success text-capitalize mb-2 fw-bold" style={{ letterSpacing: "0.04em", fontSize: "2rem" }}>
                    {bebida.nombre}
                  </h3>
                  <p className="fw-bold text-dark mb-1" style={{ fontSize: "1.1rem" }}>
                    Desde: S/ {bebida.precio.toFixed(2)}
                  </p>
                  <p className="text-muted mb-3" style={{ minHeight: "60px" }}>{bebida.descripcion}</p>
                  <div className="d-flex align-items-center mb-2 gap-2">
                    <button
                      className="btn btn-outline-success btn-sm"
                      style={{ borderRadius: "8px", fontWeight: 600 }}
                      onClick={(e) => decrementarCantidad(index, e)}
                    >
                      -
                    </button>
                    <span className="fw-bold px-2">{quantities[index]}</span>
                    <button
                      className="btn btn-outline-success btn-sm"
                      style={{ borderRadius: "8px", fontWeight: 600 }}
                      onClick={(e) => incrementarCantidad(index, e)}
                    >
                      +
                    </button>
                  </div>
                  <p className="fw-bold text-dark mb-2" style={{ fontSize: "1rem" }}>
                    Total: S/ {(bebida.precio * quantities[index]).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-success mt-auto w-100"
                    style={{ borderRadius: "8px", fontWeight: 600, letterSpacing: "0.04em" }}
                    onClick={(e) => handleComprar(bebida, index, e)}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal ampliado con fondo borroso */}
      {selectedBebida && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setSelectedBebida(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 32px rgba(0,0,0,0.2)",
              padding: "32px",
              minWidth: "320px",
              maxWidth: "480px",
              width: "90vw",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "transparent",
                border: "none",
                fontSize: "2rem",
                cursor: "pointer"
              }}
              onClick={() => setSelectedBebida(null)}
            >
              &times;
            </button>
            <img
              src={selectedBebida.imagen}
              alt={selectedBebida.nombre}
              style={{
                width: "100%",
                maxWidth: "350px",
                display: "block",
                margin: "0 auto",
                borderRadius: "12px"
              }}
            />
            <h2 className="mt-3">{selectedBebida.nombre}</h2>
            <p>{selectedBebida.descripcion}</p>
            <p className="fw-bold">Precio: S/ {selectedBebida.precio.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bebidas;