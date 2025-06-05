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
    // Envuelve la aplicación dentro del CartProvider
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
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
      </Router>
    </CartProvider>
  );
}

export default App;
