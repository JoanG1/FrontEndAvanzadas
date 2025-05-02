import React from 'react';
import { CodigoValidacionForm } from '../features/user/components/CodigoValidacionForm';

const CodigoValidacion: React.FC = () => {
  const email = "usuario@example.com"; // Idealmente viene del estado global o props

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Verificación de correo</h1>
      <CodigoValidacionForm email={email} />
    </div>
  );
};

export default CodigoValidacion;
