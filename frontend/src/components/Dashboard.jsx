import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer // Añadimos esta importación
} from 'recharts';
import { 
  Home, Users, Settings, BarChart2, Eye, Trash2, 
  Package, CreditCard, Pencil 
} from 'lucide-react';
import dashboardService from '../services/dashboardService';

const Sidebar = ({ currentSection, setCurrentSection }) => {
    const sidebarSections = [
      { section: 'inicio', icon: Home, label: 'Inicio' },
      { section: 'usuarios', icon: Users, label: 'Usuarios' },
      { section: 'estadisticas', icon: BarChart2, label: 'Estadísticas' },
      { section: 'productos', icon: Package, label: 'Productos' },
      { section: 'ventas', icon: CreditCard, label: 'Ventas' }
    ];
  
    return (
      <div className="col-md-3 col-lg-2 bg-white shadow-sm py-4" style={{ marginTop: '23px' }}>
        <div className="d-flex flex-column">
          {sidebarSections.map((item) => (
            <button
              key={item.section}
              className={`btn btn-light text-start mb-2 ${
                currentSection === item.section ? 'active fw-bold' : ''
              }`}
              onClick={() => setCurrentSection(item.section)}
            >
              <item.icon className="me-2" size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
};

const Header = () => {
    return (
      <div className="row bg-white shadow-sm py-3 mb-4 align-items-center" style={{ marginTop: '84px' }}>
        <div className="col-md-6">
          <h4 className="fw-bold mb-0">Panel Administrativo</h4>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-light me-3">
            <Settings size={18} />
          </button>
          <span className="fw-bold">Admin</span>
        </div>
      </div>
    );
};
const InicioSection = () => {
  const [stats, setStats] = useState({
    usuariosPorMes: [],
    actividadDiaria: [],
    totalUsuarios: 0,
    usuariosConectados: 0,
    pedidosPendientes: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Obtener usuarios
        const usuariosResponse = await dashboardService.getUsuarios();
        if (!usuariosResponse.success) {
          throw new Error('Error al obtener usuarios');
        }

        // Procesar estadísticas de usuarios
        const estadisticasUsuarios = dashboardService.procesarEstadisticas(usuariosResponse.data);
        
        setStats({
          usuariosPorMes: estadisticasUsuarios.usuariosPorMes,
          actividadDiaria: estadisticasUsuarios.actividadDiaria,
          totalUsuarios: usuariosResponse.data.length,
          usuariosConectados: estadisticasUsuarios.usuariosConectados, // Aquí está el cambio
          pedidosPendientes: Math.floor(Math.random() * 10)
        });
        // Ordenar usuarios recientes
        const sortedUsers = usuariosResponse.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentUsers(sortedUsers);

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;

  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="text-primary">¡Bienvenido al Panel Administrativo!</h4>
              <p className="text-muted">
                Aquí podrás gestionar usuarios, ver estadísticas y más.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        {/* Total Usuarios */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Usuarios</h6>
                  <h2 className="mb-0">{stats.totalUsuarios}</h2>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <Users size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usuarios Conectados */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Usuarios Conectados</h6>
                  <h2 className="mb-0">{stats.usuariosConectados}</h2>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <Users size={24} className="text-success" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pedidos Pendientes */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pedidos Pendientes</h6>
                  <h2 className="mb-0">{stats.pedidosPendientes}</h2>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <Package size={24} className="text-warning" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">Usuarios por Mes</h6>
            </div>
            <div className="card-body">
              <BarChart width={500} height={300} data={stats.usuariosPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#0d6efd" name="Usuarios" />
              </BarChart>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h6 className="mb-0">Actividad Diaria</h6>
            </div>
            <div className="card-body">
              <BarChart width={500} height={300} data={stats.actividadDiaria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="activos" fill="#198754" name="Usuarios Activos" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h6 className="mb-0">Usuarios Recientes</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Fecha de Registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(user => (
                      <tr key={user._id}>
                        <td>{user.nombre} {user.apellido}</td>
                        <td>{user.email}</td>
                        <td>{user.telefono}</td>
                        <td>{new Date(user.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const UsuariosSection = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, userId: null });
  const [editForm, setEditForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      const response = await dashboardService.getUsuarios();
      if (response.success) {
        setUsuarios(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleShowEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      telefono: user.telefono
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dashboardService.updateUsuario(selectedUser._id, editForm);
      if (response.success) {
        setUsuarios(usuarios.map(user => 
          user._id === selectedUser._id ? { ...user, ...editForm } : user
        ));
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await dashboardService.deleteUsuario(userId);
      if (response.success) {
        setUsuarios(usuarios.filter(user => user._id !== userId));
        setDeleteConfirmation({ show: false, userId: null });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div>
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Gestión de Usuarios</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(user => (
                  <tr key={user._id}>
                    <td>{user.nombre} {user.apellido}</td>
                    <td>{user.email}</td>
                    <td>{user.telefono}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleShowDetails(user)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => handleShowEdit(user)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setDeleteConfirmation({ show: true, userId: user._id })}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Detalles */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Detalles del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Nombre:</strong> {selectedUser.nombre} {selectedUser.apellido}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Teléfono:</strong> {selectedUser.telefono}</p>
              <p><strong>Fecha de Registro:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
        <div className="w-100 d-flex justify-content-center">
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={editForm.nombre}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                value={editForm.apellido}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                name="telefono"
                value={editForm.telefono}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowEditModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal show={deleteConfirmation.show} onHide={() => setDeleteConfirmation({ show: false, userId: null })}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este usuario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmation({ show: false, userId: null })}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteConfirmation.userId)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const EstadisticasSection = () => {
  const [stats, setStats] = useState({
    usuariosPorMes: [],
    actividadDiaria: [],
    totalUsuarios: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await dashboardService.getUsuarios();
        if (response.success) {
          const estadisticas = dashboardService.procesarEstadisticas(response.data);
          setStats(estadisticas);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;

  const productosData = [
    { nombre: 'Café', cantidad: 350 },
    { nombre: 'Té', cantidad: 250 },
    { nombre: 'Pasteles', cantidad: 180 },
    { nombre: 'Galletas', cantidad: 220 },
    { nombre: 'Bebidas', cantidad: 290 }
  ];

  const visitasData = [
    { hora: '8am', visitas: 120 }, { hora: '10am', visitas: 240 },
    { hora: '12pm', visitas: 380 }, { hora: '2pm', visitas: 280 },
    { hora: '4pm', visitas: 220 }, { hora: '6pm', visitas: 160 }
  ];

  const satisfaccionData = [
    { nivel: 'Excelente', valor: 45 },
    { nivel: 'Bueno', valor: 30 },
    { nivel: 'Regular', valor: 15 },
    { nivel: 'Malo', valor: 10 }
  ];

  return (
    <div className="container-fluid px-0">
      <h4 className="mb-4">Estadísticas Generales</h4>
      
      {/* Primera fila: Gráficos principales */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">Usuarios por Mes</h6>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="chart-container" style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.usuariosPorMes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#0d6efd" name="Usuarios" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-success text-white">
              <h6 className="mb-0">Actividad Diaria</h6>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="chart-container" style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.actividadDiaria}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="activos" fill="#198754" name="Usuarios Activos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda fila: Gráficos secundarios */}
      <div className="row g-4">
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-info text-white">
              <h6 className="mb-0">Productos más Vendidos</h6>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="chart-container" style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productosData}
                      dataKey="cantidad"
                      nameKey="nombre"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#0dcaf0"
                      label
                    >
                      {productosData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" align="center" verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-warning text-white">
              <h6 className="mb-0">Visitas por Hora</h6>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="chart-container" style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitasData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hora" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="visitas" fill="#ffc107" stroke="#ffc107" name="Visitas" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-12 col-xl-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-danger text-white">
              <h6 className="mb-0">Nivel de Satisfacción</h6>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="chart-container" style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={satisfaccionData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="nivel" />
                    <PolarRadiusAxis />
                    <Radar dataKey="valor" stroke="#dc3545" fill="#dc3545" fillOpacity={0.6} name="Satisfacción" />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState('inicio');

  return (
    <div className="bg-light min-vh-100">
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Sidebar 
            currentSection={currentSection} 
            setCurrentSection={setCurrentSection} 
          />
          <div className="col-md-9 col-lg-10 py-4">
            {currentSection === 'inicio' && <InicioSection />}
            {currentSection === 'usuarios' && <UsuariosSection />}
            {currentSection === 'estadisticas' && <EstadisticasSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;