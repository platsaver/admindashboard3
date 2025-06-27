import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';

const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');
  return token ? <Outlet /> : <Navigate to="/verify" replace />;
};

export default PrivateRoute;
