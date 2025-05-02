import React from "react";
import { ValidarCodigoForm } from "../features/user/components/ValidarCodigoForm";

const ValidarCodigo: React.FC = () => {
  const email = "usuario@example.com"; // Idealmente de estado global o navegación

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Verificación de código</h1>
      <ValidarCodigoForm email={email} />
    </div>
  );
};

export default ValidarCodigo;
