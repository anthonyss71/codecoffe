import React, { useState } from "react";
import "./../styles/bebidas.css";
import { useCart } from "../js/CartContext"; // Mantengo la ruta para tu contexto del carrito

const Bebidas = () => {
  const { addToCart } = useCart(); // Contexto del carrito para agregar productos
  const [quantities, setQuantities] = useState(
    Array(10).fill(1) // Inicializamos las cantidades con 1 para cada bebida
  );

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

  // Incrementar cantidad de una bebida
  const incrementarCantidad = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  // Decrementar cantidad de una bebida
  const decrementarCantidad = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  // Manejar la compra de una bebida
  const handleComprar = (bebida, index) => {
    addToCart(bebida, quantities[index]); // Agregar al carrito
    alert(
      `Agregaste ${quantities[index]} ${bebida.nombre} al carrito por un total de S/ ${(bebida.precio * quantities[index]).toFixed(
        2
      )}`
    );
  };

  return (
    <div className="container mt-5">
      <br />
      <br />
      <h2 className="text-center text-uppercase font-weight-bold mb-4">
        Frappuccinos
      </h2>
      <div className="row justify-content-center">
        {bebidas.map((bebida, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={bebida.id}>
            <div className="card h-100 shadow-sm">
              <img
                className="card-img-top img-fluid"
                src={bebida.imagen}
                alt={bebida.nombre}
              />
              <div className="card-body d-flex flex-column align-items-center text-center">
                <h3 className="card-title text-success text-capitalize mb-2">
                  {bebida.nombre}
                </h3>
                <p className="font-weight-bold text-dark mb-2">
                  Desde: S/ {bebida.precio.toFixed(2)}
                </p>
                <p className="text-muted mb-4">{bebida.descripcion}</p>
                <div className="d-flex align-items-center mb-3">
                  <button
                    className="btn btn-outline-success btn-sm mr-2"
                    onClick={() => decrementarCantidad(index)}
                  >
                    -
                  </button>
                  <span className="mr-2">{quantities[index]}</span>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => incrementarCantidad(index)}
                  >
                    +
                  </button>
                </div>
                <p className="font-weight-bold text-dark mb-2">
                  Total: S/ {(bebida.precio * quantities[index]).toFixed(2)}
                </p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => handleComprar(bebida, index)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bebidas;