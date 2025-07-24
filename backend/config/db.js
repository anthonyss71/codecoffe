// backend/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // Cargar variables de entorno (si existen)

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', // Usuario por defecto de XAMPP
  password: process.env.DB_PASSWORD || '', // Contraseña por defecto (vacía en XAMPP)
  database: process.env.DB_NAME || 'starbucks_rewards',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('🟢 Conectado exitosamente a la base de datos MySQL');
    console.log(`🗄️  Base de datos: ${process.env.DB_NAME || 'starbucks_rewards'}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
    console.log('⚠️  Asegúrate de que XAMPP está ejecutándose y MySQL está activo');
    console.log('⚠️  Verifica que la base de datos "starbucks_rewards" existe');
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};