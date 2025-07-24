// backend/controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Clave secreta para JWT (en producción, deberías usar variables de entorno)
const JWT_SECRET = 'starbucks_rewards_secret_key';

// Controller para el registro de usuarios
exports.register = async (req, res) => {
  try {
    const result = await User.register(req.body);
    
    if (result.success) {
      // Generar token JWT
      const token = jwt.sign(
        { id: result.data.user.id, email: result.data.user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      result.data.token = token;
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error en el controlador de registro:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor durante el registro' 
    });
  }
};

// Controller para el login de usuarios
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Por favor proporciona email y contraseña' 
      });
    }
    
    const result = await User.login(email, password);
    
    if (result.success) {
      // Generar token JWT
      const token = jwt.sign(
        { id: result.data.user.id, email: result.data.user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      result.data.token = token;
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error('Error en el controlador de login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor durante el login' 
    });
  }
};