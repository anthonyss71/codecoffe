import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!currentUser.isAdmin) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">Panel de Administración</h1>
                    
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Gestión de Productos</h5>
                                    <p className="card-text">Administra bebidas, postres y otros productos</p>
                                    <button className="btn btn-primary">Gestionar Productos</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Gestión de Usuarios</h5>
                                    <p className="card-text">Administra las cuentas de usuarios</p>
                                    <button className="btn btn-primary">Gestionar Usuarios</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Gestión de Tiendas</h5>
                                    <p className="card-text">Administra las ubicaciones de tiendas</p>
                                    <button className="btn btn-primary">Gestionar Tiendas</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;