import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../js/CartContext";
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

  // Función para cerrar el carrito al hacer clic fuera
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        style={{
          width: "100%",
          margin: 0,
          padding: "0 32px",
          borderRadius: 0,
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
        }}
      >
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
      </nav>

      {/* Cart Modal Rediseñado */}
      {isCartOpen && (
        <div 
          className="modal show d-block" 
          style={{ 
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(5px)",
            zIndex: 1050 
          }}
          onClick={handleBackdropClick}
        >
          <div 
            className="modal-dialog modal-dialog-side"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              maxWidth: "420px",
              width: "100%",
              margin: 0,
              transform: "translateX(0)",
              animation: "slideInRight 0.3s ease-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="modal-content"
              style={{
                height: "100vh",
                borderRadius: 0,
                border: "none",
                background: "linear-gradient(135deg, #00704a 0%, #228b22 50%, #32cd32 100%)",
                color: "#fff",
                boxShadow: "-10px 0 30px rgba(0,0,0,0.3)"
              }}
            >
              {/* Header del Modal */}
              <div 
                className="modal-header border-0"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  padding: "1.5rem"
                }}
              >
                <div className="d-flex align-items-center">
                  <i className="bi bi-bag-heart me-2 fs-4"></i>
                  <h5 className="modal-title fw-bold mb-0">Mi Carrito</h5>
                </div>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={toggleCart}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    opacity: 1,
                    border: "none",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                >
                  <i className="bi bi-x-lg" style={{ color: "#fff", fontSize: "1.2rem" }}></i>
                </button>
              </div>

              {/* Body del Modal */}
              <div 
                className="modal-body"
                style={{
                  padding: "1.5rem",
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 200px)"
                }}
              >
                {cartItems.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-cart-x display-1 mb-3 opacity-50"></i>
                    <p className="fs-5 mb-0">Tu carrito está vacío</p>
                    <p className="opacity-75">¡Agrega algunos productos deliciosos!</p>
                  </div>
                ) : (
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="cart-item mb-3"
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "15px",
                          padding: "1rem",
                          border: "1px solid rgba(255,255,255,0.2)"
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            <img 
                              src={item.imagen} 
                              alt={item.nombre}
                              style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "12px",
                                objectFit: "cover",
                                border: "2px solid rgba(255,255,255,0.3)"
                              }}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="fw-bold mb-1">{item.nombre}</h6>
                            <p className="mb-2 opacity-75">
                              S/ {item.precio.toFixed(2)} c/u
                            </p>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <button 
                                  className="btn btn-sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  style={{
                                    background: "rgba(255,255,255,0.2)",
                                    border: "none",
                                    color: "#fff",
                                    borderRadius: "8px",
                                    width: "32px",
                                    height: "32px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  <i className="bi bi-dash"></i>
                                </button>
                                <span 
                                  className="mx-3 fw-bold"
                                  style={{
                                    minWidth: "30px",
                                    textAlign: "center",
                                    fontSize: "1.1rem"
                                  }}
                                >
                                  {item.quantity}
                                </span>
                                <button 
                                  className="btn btn-sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  style={{
                                    background: "rgba(255,255,255,0.2)",
                                    border: "none",
                                    color: "#fff",
                                    borderRadius: "8px",
                                    width: "32px",
                                    height: "32px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  <i className="bi bi-plus"></i>
                                </button>
                              </div>
                              <button 
                                className="btn btn-sm text-danger"
                                onClick={() => removeFromCart(item.id)}
                                style={{
                                  background: "rgba(220,53,69,0.2)",
                                  border: "1px solid rgba(220,53,69,0.3)",
                                  borderRadius: "8px",
                                  padding: "0.25rem 0.5rem"
                                }}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer del Modal */}
              {cartItems.length > 0 && (
                <div 
                  className="modal-footer border-0"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    padding: "1.5rem",
                    flexDirection: "column",
                    gap: "1rem"
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <span className="fs-5 fw-bold">Total:</span>
                    <span className="fs-4 fw-bold">S/ {calculateTotal()}</span>
                  </div>
                  <button 
                    className="btn btn-light w-100 fw-bold"
                    onClick={handleCheckout}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      color: "#00704a",
                      border: "none",
                      borderRadius: "12px",
                      padding: "0.75rem 1.5rem",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = "#fff";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.9)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="bi bi-credit-card me-2"></i>
                    Proceder al Pago
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Estilos adicionales para animaciones */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .cart-item {
          transition: all 0.3s ease;
        }
        
        .cart-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .btn {
          transition: all 0.3s ease;
        }
        
        .btn:hover {
          transform: translateY(-1px);
        }
        
        .modal-dialog-side {
          animation: slideInRight 0.3s ease-out;
        }
        
        /* Scrollbar personalizada */
        .modal-body::-webkit-scrollbar {
          width: 6px;
        }
        
        .modal-body::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        
        .modal-body::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 10px;
        }
        
        .modal-body::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }
        
        /* Estilos para el botón de cerrar */
        .btn-close:hover {
          background: rgba(255,255,255,0.3) !important;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default Navbar;