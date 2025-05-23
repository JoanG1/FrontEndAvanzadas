import React from 'react';
import { CodigoValidacionForm } from '../features/user/components/CodigoValidacionForm';

const CodigoValidacion: React.FC = () => {
  const email = "usuario@example.com"; // Idealmente viene del estado global o props

  return (
    <div className="p-4">

      <CodigoValidacionForm email={email} />
    </div>
  );
};

export default CodigoValidacion;
