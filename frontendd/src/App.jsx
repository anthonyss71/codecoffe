import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './components/Login';
import Register from './components/Register';
import Ubicaciones from './components/Ubicaciones';
import Bebidas from './components/bebidas';
import Postres from './components/postres';
import Tiendas from './components/tiendas';
import Dashboard from './components/Dashboard';
import { CartProvider } from './js/CartContext'; // Importa el proveedor del carrito
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ minHeight: "100vh", background: "#f8fafc", margin: 0, padding: 0 }}>
          <div
            style={{
              width: "100%",
              background: "#fff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              borderRadius: 0,
              margin: 0,
              padding: 0,
              position: "relative",
              zIndex: 10,
            }}
          >
            <Navbar />
          </div>
          <div style={{ width: "100%", margin: 0, padding: 0 }}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/ubicaciones" element={<Ubicaciones />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/bebidas" element={<Bebidas />} />
              <Route path="/postres" element={<Postres />} />
              <Route path="/tiendas" element={<Tiendas />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
