import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    
    // Se tiver token, renderiza a rota filha (Outlet). Se não, manda para o Login.
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;