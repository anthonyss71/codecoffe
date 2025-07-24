import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer
} from 'recharts';
import {
  Home, Users, Settings, BarChart2, Eye, Trash2,
  Package, CreditCard, Pencil
} from 'lucide-react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'framer-motion';

// Paleta de colores Starbucks
const colors = {
  primary: '#006241', // Verde Starbucks
  secondary: '#d4e9e2', // Verde claro
  accent: '#1e3932', // Verde oscuro
  highlight: '#f1f8f5', // Fondo claro
  text: '#1e3932', // Texto principal
  lightText: '#ffffff', // Texto claro
  chart1: '#00704a', // Verde para gráficos
  chart2: '#dfa123', // Dorado
  chart3: '#cba258', // Bronce
};

const Sidebar = ({ currentSection, setCurrentSection }) => {
  const sidebarSections = [
    { section: 'inicio', icon: Home, label: 'Inicio' },
    { section: 'usuarios', icon: Users, label: 'Usuarios' },
    { section: 'estadisticas', icon: BarChart2, label: 'Estadísticas' },
    { section: 'productos', icon: Package, label: 'Productos' },
    { section: 'ventas', icon: CreditCard, label: 'Ventas' }
  ];
  
  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="col-md-3 col-lg-2 py-4"
      style={{ 
        background: colors.primary,
        marginTop: '23px',
        minHeight: '100vh',
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
      }}
    >
      <div className="d-flex flex-column">
        {sidebarSections.map((item) => (
          <motion.button
            key={item.section}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`btn mb-3 text-start ${currentSection === item.section ? 'fw-bold' : ''}`}
            onClick={() => setCurrentSection(item.section)}
            style={{
              background: currentSection === item.section ? colors.secondary : 'transparent',
              color: currentSection === item.section ? colors.text : colors.lightText,
              border: 'none',
              borderRadius: '8px',
              padding: '12px 15px',
              transition: 'all 0.3s ease'
            }}
          >
            <item.icon className="me-2" size={18} />
            {item.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const Header = () => (
  <motion.div 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="row py-3 mb-4 align-items-center sticky-top"
    style={{ 
      background: colors.primary,
      marginTop: '84px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}
  >
    <div className="col-md-6">
      <h4 className="fw-bold mb-0" style={{ color: colors.lightText }}>
        <motion.span
          animate={{ 
            textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 5px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0)']
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3 
          }}
        >
          ☕ Panel Administrativo
        </motion.span>
      </h4>
    </div>
    <div className="col-md-6 text-end">
      <motion.button 
        whileHover={{ rotate: 15 }}
        className="btn me-3"
        style={{ background: colors.accent, color: colors.lightText }}
      >
        <Settings size={18} />
      </motion.button>
      <span className="fw-bold" style={{ color: colors.lightText }}>Admin</span>
    </div>
  </motion.div>
);

const StatCard = ({ title, value, icon, delay }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: delay * 0.1 }}
    className="col-md-4 mb-4"
  >
    <div 
      className="card h-100 border-0"
      style={{ 
        background: `linear-gradient(135deg, ${colors.secondary}, ${colors.highlight})`,
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}
    >
      <motion.div 
        whileHover={{ y: -5 }}
        className="card-body d-flex align-items-center"
      >
        <div 
          className="me-3 p-3 rounded-circle"
          style={{ 
            background: colors.primary,
            color: colors.lightText,
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </div>
        <div>
          <h6 className="mb-1" style={{ color: colors.text }}>{title}</h6>
          <h2 
            className="mb-0 fw-bold"
            style={{ color: colors.primary }}
          >
            {value}
          </h2>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const InicioSection = () => {
  const [stats, setStats] = useState({ usuariosPorMes: [], actividadDiaria: [], totalUsuarios: 0, usuariosConectados: 0, pedidosPendientes: 0 });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    setStats({
      usuariosPorMes: [
        { mes: 'Enero', cantidad: 12 }, { mes: 'Febrero', cantidad: 18 }, { mes: 'Marzo', cantidad: 24 }, { mes: 'Abril', cantidad: 20 }, { mes: 'Mayo', cantidad: 30 }
      ],
      actividadDiaria: [
        { dia: 'Lunes', activos: 5 }, { dia: 'Martes', activos: 8 }, { dia: 'Miércoles', activos: 12 }, { dia: 'Jueves', activos: 9 }, { dia: 'Viernes', activos: 14 }
      ],
      totalUsuarios: 7,
      usuariosConectados: 3,
      pedidosPendientes: 4
    });
    setRecentUsers([
      { _id: '1', nombre: 'Marcos', apellido: 'Silva', email: 'marcos@correo.com', telefono: '987654321', createdAt: new Date() },
      { _id: '2', nombre: 'Luis', apellido: 'Torres', email: 'luis@correo.com', telefono: '912345678', createdAt: new Date() },
      { _id: '3', nombre: 'Anthony', apellido: 'Cotrina', email: 'anthony@correo.com', telefono: '923456789', createdAt: new Date() }
    ]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="row mb-4">
        <StatCard 
          title="Total Usuarios" 
          value={stats.totalUsuarios} 
          icon={<Users size={20} />} 
          delay={0}
        />
        <StatCard 
          title="Usuarios Conectados" 
          value={stats.usuariosConectados} 
          icon={<Eye size={20} />} 
          delay={1}
        />
        <StatCard 
          title="Pedidos Pendientes" 
          value={stats.pedidosPendientes} 
          icon={<Package size={20} />} 
          delay={2}
        />
      </div>

      <div className="row mb-4">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="col-md-6 mb-4"
        >
          <div 
            className="card border-0 h-100"
            style={{ 
              background: colors.highlight,
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}
          >
            <div className="card-body">
              <h5 style={{ color: colors.text }}>Usuarios por Mes</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.usuariosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.secondary} />
                  <XAxis dataKey="mes" stroke={colors.text} />
                  <YAxis stroke={colors.text} />
                  <Tooltip 
                    contentStyle={{ 
                      background: colors.primary, 
                      border: 'none', 
                      borderRadius: '8px',
                      color: colors.lightText
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="cantidad" 
                    fill={colors.chart1}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="col-md-6 mb-4"
        >
          <div 
            className="card border-0 h-100"
            style={{ 
              background: colors.highlight,
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}
          >
            <div className="card-body">
              <h5 style={{ color: colors.text }}>Actividad Diaria</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.actividadDiaria}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.secondary} />
                  <XAxis dataKey="dia" stroke={colors.text} />
                  <YAxis stroke={colors.text} />
                  <Tooltip 
                    contentStyle={{ 
                      background: colors.primary, 
                      border: 'none', 
                      borderRadius: '8px',
                      color: colors.lightText
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="activos" 
                    fill={colors.chart2}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div 
          className="card border-0"
          style={{ 
            background: colors.highlight,
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
        >
          <div className="card-body">
            <h5 style={{ color: colors.text }}>Usuarios Recientes</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr style={{ background: colors.secondary }}>
                    <th style={{ color: colors.text }}>Nombre</th>
                    <th style={{ color: colors.text }}>Email</th>
                    <th style={{ color: colors.text }}>Teléfono</th>
                    <th style={{ color: colors.text }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((u, index) => (
                    <motion.tr
                      key={u._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ 
                        background: colors.secondary,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <td>{u.nombre} {u.apellido}</td>
                      <td>{u.email}</td>
                      <td>{u.telefono}</td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const UsuariosSection = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setUsuarios([
      { _id: '1', nombre: 'Marcos', apellido: 'Silva', email: 'marcos@correo.com', telefono: '987654321', createdAt: new Date() },
      { _id: '2', nombre: 'Luis', apellido: 'Torres', email: 'luis@correo.com', telefono: '912345678', createdAt: new Date() },
      { _id: '3', nombre: 'Anthony', apellido: 'Cotrina', email: 'anthony@correo.com', telefono: '923456789', createdAt: new Date() },
      { _id: '4', nombre: 'Pepe', apellido: 'Administrador', email: 'pepe@correo.com', telefono: '934567890', createdAt: new Date() },
      { _id: '5', nombre: 'Maria', apellido: 'Gonzales', email: 'maria@correo.com', telefono: '945678901', createdAt: new Date() },
      { _id: '6', nombre: 'Carlos', apellido: 'Rodriguez', email: 'carlos@correo.com', telefono: '956789012', createdAt: new Date() },
      { _id: '7', nombre: 'Ana', apellido: 'Martinez', email: 'ana@correo.com', telefono: '967890123', createdAt: new Date() }
    ]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="card border-0"
        style={{ 
          background: colors.highlight,
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}
      >
        <div className="card-body">
          <h4 style={{ color: colors.text }}>Usuarios</h4>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr style={{ background: colors.secondary }}>
                  <th style={{ color: colors.text }}>Nombre</th>
                  <th style={{ color: colors.text }}>Email</th>
                  <th style={{ color: colors.text }}>Teléfono</th>
                  <th style={{ color: colors.text }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, index) => (
                  <motion.tr
                    key={u._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ 
                      background: colors.secondary,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <td>{u.nombre} {u.apellido}</td>
                    <td>{u.email}</td>
                    <td>{u.telefono}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EstadisticasSection = () => {
  const productosData = [
    { nombre: 'Café', cantidad: 350 }, { nombre: 'Té', cantidad: 250 }, { nombre: 'Pasteles', cantidad: 180 }
  ];
  const visitasData = [
    { hora: '8am', visitas: 120 }, { hora: '10am', visitas: 240 }, { hora: '12pm', visitas: 380 }
  ];
  const satisfaccionData = [
    { nivel: 'Excelente', valor: 45 }, { nivel: 'Bueno', valor: 30 }, { nivel: 'Regular', valor: 15 }, { nivel: 'Malo', valor: 10 }
  ];

  const COLORS = [colors.chart1, colors.chart2, colors.chart3];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="row g-4"
    >
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="col-md-4"
      >
        <div 
          className="card border-0 h-100"
          style={{ 
            background: colors.highlight,
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
        >
          <div className="card-body">
            <h5 style={{ color: colors.text }}>Productos Vendidos</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={productosData} 
                  dataKey="cantidad" 
                  nameKey="nombre" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80} 
                  fill="#8884d8" 
                  label
                  animationBegin={0}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {productosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: colors.primary, 
                    border: 'none', 
                    borderRadius: '8px',
                    color: colors.lightText
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="col-md-4"
      >
        <div 
          className="card border-0 h-100"
          style={{ 
            background: colors.highlight,
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
        >
          <div className="card-body">
            <h5 style={{ color: colors.text }}>Visitas por Hora</h5>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={visitasData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.secondary} />
                <XAxis dataKey="hora" stroke={colors.text} />
                <YAxis stroke={colors.text} />
                <Tooltip 
                  contentStyle={{ 
                    background: colors.primary, 
                    border: 'none', 
                    borderRadius: '8px',
                    color: colors.lightText
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="visitas" 
                  stroke={colors.chart1} 
                  fill={colors.secondary}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="col-md-4"
      >
        <div 
          className="card border-0 h-100"
          style={{ 
            background: colors.highlight,
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
        >
          <div className="card-body">
            <h5 style={{ color: colors.text }}>Satisfacción del Cliente</h5>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={satisfaccionData}>
                <PolarGrid stroke={colors.secondary} />
                <PolarAngleAxis dataKey="nivel" stroke={colors.text} />
                <PolarRadiusAxis stroke={colors.text} />
                <Radar 
                  dataKey="valor" 
                  stroke={colors.chart1} 
                  fill={colors.secondary} 
                  fillOpacity={0.6}
                  animationDuration={1500}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: colors.primary, 
                    border: 'none', 
                    borderRadius: '8px',
                    color: colors.lightText
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProductosSection = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div 
      className="card border-0"
      style={{ 
        background: colors.highlight,
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}
    >
      <div className="card-body">
        <h4 style={{ color: colors.text }}>Productos más vendidos</h4>
        <motion.ul 
          className="list-group"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
              }
            }
          }}
        >
          {['Café - 350 ventas', 'Té - 250 ventas', 'Pasteles - 180 ventas'].map((item, index) => (
            <motion.li
              key={index}
              className="list-group-item"
              style={{ 
                background: colors.secondary,
                border: 'none',
                marginBottom: '8px',
                borderRadius: '8px'
              }}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ x: 5 }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  </motion.div>
);

const VentasSection = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div 
      className="card border-0"
      style={{ 
        background: colors.highlight,
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}
    >
      <div className="card-body">
        <h4 style={{ color: colors.text }}>Últimas Ventas</h4>
        <motion.ul 
          className="list-group"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
              }
            }
          }}
        >
          {['Venta #001 - S/ 50', 'Venta #002 - S/ 30', 'Venta #003 - S/ 80'].map((item, index) => (
            <motion.li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ 
                background: colors.secondary,
                border: 'none',
                marginBottom: '8px',
                borderRadius: '8px'
              }}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ x: 5 }}
            >
              {item}
              <motion.span 
                className="badge rounded-pill"
                style={{ background: colors.primary }}
                whileHover={{ scale: 1.1 }}
              >
                Ver
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState('inicio');
  
  return (
    <div 
      className="min-vh-100"
      style={{ 
        background: colors.highlight,
        fontFamily: "'Open Sans', sans-serif"
      }}
    >
      <div className="container-fluid px-0">
        <Header />
        <div className="row mx-0">
          <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
          <motion.div 
            className="col-md-9 col-lg-10 py-4 px-4"
            key={currentSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentSection === 'inicio' && <InicioSection />}
            {currentSection === 'usuarios' && <UsuariosSection />}
            {currentSection === 'estadisticas' && <EstadisticasSection />}
            {currentSection === 'productos' && <ProductosSection />}
            {currentSection === 'ventas' && <VentasSection />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;