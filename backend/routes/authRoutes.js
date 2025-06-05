// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// Ruta para registro de usuarios
router.post('/register', authController.register);

// Ruta para login de usuarios
router.post('/login', authController.login);

// Ruta protegida de ejemplo (requiere autenticación)
router.get('/profile', protect, (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user
    }
  });
});

// Ruta protegida solo para administradores
router.get('/admin/dashboard', protect, admin, (req, res) => {
  res.json({
    success: true,
    message: 'Acceso al panel de administrador concedido'
  });
});

module.exports = router;