import React from 'react';
import { CodigoValidacionForm } from '../features/user/components/CodigoValidacionForm';

const CodigoValidacion: React.FC = () => {
  const email = "usuario@example.com"; // Esto debería venir de estado global o props

  const handleEnviarCodigo = (codigo: string) => {
    console.log("Código enviado:", codigo);
    // Acción con código
  };

  const handleEditarCorreo = () => {
    console.log("Volver a editar correo");
    // Acción para volver (e.g. navegación)
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Verificación de correo</h1>
      <CodigoValidacionForm
        email={email}
        onSubmit={handleEnviarCodigo}
        onEditarCorreo={handleEditarCorreo}
      />
    </div>
  );
};

export default CodigoValidacion;
