// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

// Clave secreta para JWT (debe ser la misma que en authController)
const JWT_SECRET = 'starbucks_rewards_secret_key';

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Verificar si hay token en el header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Verificar si no hay token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado, no se proporcionó token'
      });
    }
    
    try {
      // Verificar el token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Obtener el usuario
      const [users] = await pool.query('SELECT id, nombre, apellido, email, telefono, fechaNacimiento, isAdmin FROM users WHERE id = ?', [decoded.id]);
      
      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado, usuario no encontrado'
        });
      }
      
      // Añadir el usuario a la solicitud
      req.user = users[0];
      next();
    } catch (error) {
      console.error('Error de autenticación:', error);
      return res.status(401).json({
        success: false,
        message: 'No autorizado, token inválido o expirado'
      });
    }
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Middleware para validar si el usuario es administrador
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'No autorizado, se requieren privilegios de administrador'
    });
  }
};