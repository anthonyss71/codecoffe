// backend/server.js
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors()); // Permitir solicitudes de origen cruzado
app.use(express.json()); // Parsear solicitudes como JSON

// Probar conexión a la base de datos
testConnection();

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Puerto y servidor
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  const message = `
  ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨
  
  🚀 ¡Servidor corriendo exitosamente! 🚀
  📡 Puerto: ${PORT}
  🔗 URL local: http://localhost:${PORT}
  🛠️ API disponible en: http://localhost:${PORT}/api/auth
  
  ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨
  `;
  console.log(message);
});