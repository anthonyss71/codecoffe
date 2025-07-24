// src/services/authService.js
const API_URL = 'http://localhost:4001/api/auth';

// Función para obtener el token almacenado
const getToken = () => {
  return localStorage.getItem('userToken') || '';
};

// Función para guardar el token y los datos del usuario
const saveUserData = (token, user) => {
  localStorage.setItem('userToken', token);
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Función para limpiar los datos del usuario
const clearUserData = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('currentUser');
};

const authService = {
  // Registrar un nuevo usuario
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (data.success) {
        // Guardar token y datos del usuario
        saveUserData(data.data.token, data.data.user);
      }
      
      return data;
    } catch (error) {
      console.error('Error en el registro:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  },

  // Iniciar sesión
  login: async ({email, password}) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Guardar token y datos del usuario
        saveUserData(data.data.token, data.data.user);
      }
      
      return data;
    } catch (error) {
      console.error('Error en el login:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  },

  // Cerrar sesión
  logout: () => {
    clearUserData();
    return { success: true };
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = getToken();
    return !!token;
  },

  // Obtener el perfil del usuario actual
  getCurrentUser: async () => {
    const token = getToken();
    
    if (!token) {
      return { success: false, message: 'No autenticado' };
    }
    
    try {
      const response = await fetch(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  },
};

export default authService;