// backend/models/userModel.js
const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  // Método para registrar un nuevo usuario
  static async register(userData) {
    const { nombre, apellido, email, password, telefono, fechaNacimiento } = userData;
    
    try {
      // Verificar si el usuario ya existe
      const [existingUsers] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      if (existingUsers.length > 0) {
        return { success: false, message: 'El correo electrónico ya está registrado' };
      }
      
      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Insertar el nuevo usuario
      const [result] = await pool.query(
        'INSERT INTO users (nombre, apellido, email, password, telefono, fechaNacimiento) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, hashedPassword, telefono, fechaNacimiento]
      );
      
      if (result.affectedRows === 1) {
        // Obtener el usuario recién creado (sin la contraseña)
        const [newUser] = await pool.query(
          'SELECT id, nombre, apellido, email, telefono, fechaNacimiento, isAdmin FROM users WHERE id = ?',
          [result.insertId]
        );
        
        return { 
          success: true, 
          data: { user: newUser[0] }
        };
      }
      
      return { success: false, message: 'Error al registrar usuario' };
      
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, message: error.message || 'Error interno del servidor' };
    }
  }
  
  // Método para iniciar sesión
  static async login(email, password) {
    try {
      // Buscar el usuario
      const [users] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      if (users.length === 0) {
        return { success: false, message: 'Correo electrónico o contraseña incorrectos' };
      }
      
      const user = users[0];
      
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return { success: false, message: 'Correo electrónico o contraseña incorrectos' };
      }
      
      // No enviar la contraseña al cliente
      const userWithoutPassword = {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        telefono: user.telefono,
        fechaNacimiento: user.fechaNacimiento,
        isAdmin: user.isAdmin === 1
      };
      
      return { 
        success: true, 
        data: { user: userWithoutPassword }
      };
      
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, message: error.message || 'Error interno del servidor' };
    }
  }
}

module.exports = User;