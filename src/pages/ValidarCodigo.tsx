import React, { useState } from "react";
import { ValidarCodigoForm } from "../features/user/components/ValidarCodigoForm";
import { MessagePanel } from "../components/ui/MesaggePanel";
import { ActivacionErrorPanel } from "../features/user/components/ActivacionErrorPanel";
import { useNavigate } from "react-router-dom";

const ValidarCodigo: React.FC = () => {
  const [estado, setEstado] = useState<"pendiente" | "valido" | "invalido">("pendiente");
  const email = "usuario@example.com";
  const navigate = useNavigate();

  const handleReenviarCodigo = () => {
    console.log("Código reenviado.");
    setEstado("pendiente");
  };

  const handleSalir = () => {
    navigate("/"); // Cambia al path que desees como home o login
  };

  return (
    <div className="p-4">

      {estado === "valido" && (
        <MessagePanel
          titulo="Activación de cuenta"
          mensaje="La activación de la cuenta fue exitosa."
        />
      )}

      {estado === "invalido" && (
        <ActivacionErrorPanel onReenviar={handleReenviarCodigo} onSalir={handleSalir} />
      )}

      {estado === "pendiente" && (
        <ValidarCodigoForm
          email={email}
          onSuccess={() => setEstado("valido")}
          onError={() => setEstado("invalido")}
        />
      )}
    </div>
  );
};

export default ValidarCodigo;
