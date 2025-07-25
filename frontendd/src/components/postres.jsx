import React, { useState } from "react";
import "./../styles/postre.css";
import { useCart } from "../js/CartContext";

const Postres = () => {
  const { addToCart } = useCart(); // Contexto del carrito para agregar productos
  const [quantities, setQuantities] = useState(
    Array(10).fill(1) // Inicializamos las cantidades con 1 para cada postre
  );
  const [selectedPostre, setSelectedPostre] = useState(null);

  const [postres] = useState([
    {
      id: 1,
      nombre: "Crocante de manzana vegetal",
      precio: 15.0,
      descripcion:
        "Delicioso postre vegano con manzanas frescas y una crujiente cobertura de avena",
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/CROCANTE_DE_MANZANA_VEGETAL_202303071258380326.PNG",
    },
    {
      id: 2,
      nombre: "Cheesecake de Arándanos",
      precio: 15.0,
      descripcion:
        "Cremoso cheesecake cubierto con una deliciosa salsa de arándanos frescos",
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/CHEESECAKE_DE_ARANDANOS_V2.png",
    },
    {
      id: 3,
      nombre: "Torta de chocolate",
      precio: 12.5,
      descripcion:
        "Esponjosa torta de chocolate con ganache y decoración de chocolate",
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/TORTA_DE_CHOCOLATE_V2.png",
    },
    {
      id: 4,
      nombre: "Cake Pop Vainilla",
      precio: 6.5,
      descripcion:
        "Delicada paleta de pastel sabor vainilla cubierta de chocolate",
      imagen: "https://www.starbucks.pe/Multimedia/productos/Cake_Pop_V1.png",
    },
    {
      id: 5,
      nombre: "Muffin de berries",
      precio: 9.5,
      descripcion: "Suave muffin con arándanos y moras frescas",
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/MUFFIN_DE_BERRIES_V2.png",
    },
    {
      id: 6,
      nombre: "Keke de limón",
      precio: 9.5,
      descripcion:
        "Esponjoso keke con intenso sabor a limón y glaseado cítrico",
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/KEKE_DE_LIMON_V2.png",
    },
    {
      id: 7,
      nombre: "Galleta de chocochips",
      precio: 6.0,
      descripcion: "Galleta suave con abundantes chips de chocolate",
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/GALLETA_DE_CHOCOCHIPS_V2.png",
    },
    {
      id: 8,
      nombre: "Banana Bread",
      precio: 8.0,
      descripcion: "Pan casero de plátano con nueces y canela",
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/BANANA_BREAD_202405290954349522.PNG",
    },
    {
      id: 9,
      nombre: "Galleta cranberry",
      precio: 5.5,
      descripcion: "Galleta con trozos de arándanos rojos deshidratados",
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/GALLETA_DE_CRANBERRIES_V2.png",
    },
    {
      id: 10,
      nombre: "Egg Bites de Jamón y Queso",
      precio: 9.0,
      descripcion: "Bocaditos de huevo esponjosos con jamón y queso derretido",
      imagen:
        "https://www.starbucks.pe/Multimedia/productos/Egg_Bites_Jamon_Y_Queso_V1.png",
    },
  ]);

  // Incrementar cantidad de un postre
  const incrementarCantidad = (index, event) => {
    event.stopPropagation(); // Evita que se propague al contenedor padre
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  // Decrementar cantidad de un postre
  const decrementarCantidad = (index, event) => {
    event.stopPropagation(); // Evita que se propague al contenedor padre
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  // Manejar la compra de un postre
  const handleComprar = (postre, index, event) => {
    event.stopPropagation(); // Evita que se propague al contenedor padre
    addToCart(postre, quantities[index]); // Agregar al carrito
    alert(
      `Agregaste ${quantities[index]} ${postre.nombre} al carrito por un total de S/ ${(postre.precio * quantities[index]).toFixed(
        2
      )}`
    );
  };

  return (
    <>
      <div className="w-100" style={{ background: "#1f4037", minHeight: "100vh", margin: 0, padding: 0 }}>
        <div style={{height: '110px', background: '#1f4037', width: '100%'}}></div>
        <div className="container p-4 rounded shadow" style={{marginTop:'0'}}>
          <h2 className="text-center text-uppercase fw-bold mb-4">
            Menú de Postres
          </h2>
          <div className="row g-4">
            {postres.map((postre, index) => (
              <div key={postre.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 shadow-sm border-0"
                  onClick={() => setSelectedPostre(postre)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={postre.imagen}
                    alt={postre.nombre}
                    className="card-img-top img-fluid rounded"
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h3 className="card-title text-success">{postre.nombre}</h3>
                    <p className="card-text text-muted">{postre.descripcion}</p>
                    <p className="fw-bold text-dark mb-2">
                      Precio: S/.{postre.precio.toFixed(2)}
                    </p>
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <button
                        className="btn btn-outline-success btn-sm mr-2"
                        onClick={(e) => decrementarCantidad(index, e)}
                      >
                        -
                      </button>
                      <span className="mx-3">{quantities[index]}</span>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={(e) => incrementarCantidad(index, e)}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-weight-bold text-dark mb-2">
                      Total: S/ {(postre.precio * quantities[index]).toFixed(2)}
                    </p>
                    <button
                      className="btn btn-success mt-auto"
                      onClick={(e) => handleComprar(postre, index, e)}
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal ampliado con fondo borroso */}
      {selectedPostre && (
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
          onClick={() => setSelectedPostre(null)}
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
              onClick={() => setSelectedPostre(null)}
            >
              &times;
            </button>
            <img
              src={selectedPostre.imagen}
              alt={selectedPostre.nombre}
              style={{
                width: "100%",
                maxWidth: "350px",
                display: "block",
                margin: "0 auto",
                borderRadius: "12px"
              }}
            />
            <h2 className="mt-3">{selectedPostre.nombre}</h2>
            <p>{selectedPostre.descripcion}</p>
            <p className="fw-bold">Precio: S/ {selectedPostre.precio.toFixed(2)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Postres;