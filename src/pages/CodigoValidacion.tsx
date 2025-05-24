import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { CodigoValidacionForm } from '../features/user/components/CodigoValidacionForm';

const CodigoValidacion: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email;
  const userId = location.state?.userId;

  if (!email || !userId) {
    return <Navigate to="/register" />;
  }

  return (
    <div className="p-4">
      <CodigoValidacionForm email={email} userId={userId} />
    </div>
  );
};

export default CodigoValidacion;
