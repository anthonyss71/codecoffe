const API_URL = 'http://localhost:5000/api/auth';

const dashboardService = {
    async getUsuarios() {
        try {
            const token = localStorage.getItem('userToken');
            console.log('Obteniendo usuarios...');
            const response = await fetch(`${API_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Respuesta del servidor:', response);
            const data = await response.json();
            console.log('Datos recibidos:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Error al obtener usuarios');
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error detallado:', error);
            return { success: false, message: error.message };
        }
    },

    async deleteUsuario(id) {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al eliminar usuario');
            }

            return { success: true, message: 'Usuario eliminado correctamente' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    async updateUsuario(id, userData) {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Error al actualizar usuario');
            }
    
            return { success: true, data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    async getEstadisticas() {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`${API_URL}/stats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al obtener estadísticas');
            }

            return { success: true, data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    procesarEstadisticas(usuarios) {
        const meses = {};
        const fechaActual = new Date();
        
        for (let i = 5; i >= 0; i--) {
            const fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - i, 1);
            const mes = fecha.toLocaleString('es-ES', { month: 'long' });
            meses[mes] = 0;
        }

        usuarios.forEach(user => {
            const fecha = new Date(user.createdAt);
            const mes = fecha.toLocaleString('es-ES', { month: 'long' });
            if (meses[mes] !== undefined) {
                meses[mes]++;
            }
        });

        const usuariosPorMes = Object.entries(meses).map(([mes, cantidad]) => ({
            mes: mes.charAt(0).toUpperCase() + mes.slice(1),
            cantidad
        }));

        const dias = {};
        const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        
        for (let i = 6; i >= 0; i--) {
            const fecha = new Date(fechaActual);
            fecha.setDate(fechaActual.getDate() - i);
            const dia = nombresDias[fecha.getDay()];
            dias[dia] = 0;
        }

        // Nueva lógica simplificada para usuarios conectados
        let usuariosConectados = 0;
        const token = localStorage.getItem('userToken');
        if (token) {
            usuariosConectados = 1;
        }

        usuarios.forEach(user => {
            const fecha = new Date(user.createdAt);
            if ((fechaActual - fecha) / (1000 * 60 * 60 * 24) <= 7) {
                const dia = nombresDias[fecha.getDay()];
                if (dias[dia] !== undefined) {
                    dias[dia]++;
                }
            }
        });

        const actividadDiaria = Object.entries(dias).map(([dia, activos]) => ({
            dia,
            activos
        }));

        return {
            usuariosPorMes,
            actividadDiaria,
            totalUsuarios: usuarios.length,
            usuariosConectados
        };
    }
};

export default dashboardService;