// testMacDB.js - Versión simplificada para macOS
const mysql = require('mysql2');

// Crear una conexión simple
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Por defecto en XAMPP
  database: 'starbucks_rewards'
});

// Establecer la conexión
console.log('Intentando conectar a MySQL...');

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err.message);
    console.error('Código de error:', err.code);
    
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('El usuario o contraseña son incorrectos');
    } else if (err.code === 'ECONNREFUSED') {
      console.log('No se pudo conectar al servidor MySQL. Verifica que XAMPP está ejecutándose.');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('La base de datos "starbucks_rewards" no existe');
    }
    
    return;
  }
  
  console.log('¡Conexión exitosa a MySQL!');
  
  // Mostrar las tablas de la base de datos
  connection.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Error al mostrar tablas:', err.message);
      connection.end();
      return;
    }
    
    console.log('Tablas en la base de datos:');
    if (results.length === 0) {
      console.log('No hay tablas en la base de datos');
    } else {
      results.forEach((row, index) => {
        console.log(`${index + 1}. ${Object.values(row)[0]}`);
      });
    }
    
    // Cerrar la conexión
    connection.end(() => {
      console.log('Conexión cerrada correctamente');
    });
  });
});