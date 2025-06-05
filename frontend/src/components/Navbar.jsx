import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../js/CartContext"; // Ajusta el path según tu estructura
import logo from "../assets/images/logo.png";
import "./../styles/Navbar.css";
import authService from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, calculateTotal } = useCart();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      setIsAdmin(user.email === "pepe@admin.com");
      setUserName(user.nombre || user.name || user.email);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserName("");
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    navigate("/");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    navigate("/checkout");
    setIsCartOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Code Coffee Logo" className="me-2" style={{ height: "50px" }} />
            <span className="fw-bold">Code Coffee</span>
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/bebidas">
                  BEBIDAS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/postres">
                  POSTRES
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/tiendas">
                  TIENDAS
                </Link>
              </li>
            </ul>

            {/* Cart and User Actions */}
            <div className="d-flex align-items-center gap-3 justify-content-end">
              {/* Cart Icon */}
              <div className="position-relative">
                <button className="btn btn-outline-success" onClick={toggleCart}>
                  <i className="bi bi-cart3"></i>
                  {cartItems.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>

              {/* User Menu */}
              {isLoggedIn ? (
                <div className="dropdown ms-2">
                  <button
                    className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle fs-5"></i>
                    <span>{userName}</span>
                  </button>
                  <ul className="dropdown-menu shadow-sm">
                    {isAdmin && (
                      <>
                        <li>
                          <Link to="/dashboard" className="dropdown-item">
                            Panel de Admin
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                      </>
                    )}
                    <li>
                      <Link to="/perfil" className="dropdown-item">
                        Información Personal
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-dark">
                    Iniciar Sesión
                  </Link>
                  <Link to="/registro" className="btn btn-dark">
                    Regístrate
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-side">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Carrito de Compras</h5>
                <button type="button" className="btn-close" onClick={toggleCart}></button>
              </div>
              <div className="modal-body">
                {cartItems.length === 0 ? (
                  <p className="text-center">Tu carrito está vacío</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="d-flex align-items-center mb-3 border-bottom">
                      <img src={item.imagen} alt={item.nombre} style={{ width: "60px" }} />
                      <div>
                        <h6>{item.nombre}</h6>
                        <p>S/ {item.precio.toFixed(2)} c/u</p>
                        <div className="d-flex">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                    </div>
                  ))
                )}
              </div>
              <div className="modal-footer">
                <strong>Total: S/ {calculateTotal()}</strong>
                <button onClick={handleCheckout}>Ir a Pagar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
