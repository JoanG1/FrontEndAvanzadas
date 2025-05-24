import React, { useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { ValidarCodigoForm } from "../features/user/components/ValidarCodigoForm";
import { MessagePanel } from "../components/ui/MesaggePanel";
import { ActivacionErrorPanel } from "../features/user/components/ActivacionErrorPanel";

const ValidarCodigo: React.FC = () => {
  const [estado, setEstado] = useState<"pendiente" | "valido" | "invalido">("pendiente");
  const location = useLocation();
  const navigate = useNavigate();

  const { email, userId, codigoGenerado } = location.state || {};

  // Validar que tenemos todos los datos
  if (!email || !userId || !codigoGenerado) {
    return <Navigate to="/register" />;
  }

  // Redirigir automáticamente si la activación fue exitosa
  useEffect(() => {
    if (estado === "valido") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [estado, navigate]);

  const handleReenviarCodigo = () => {
    console.log("Código reenviado."); // Aquí podrías volver a llamar al backend si quieres
    setEstado("pendiente");
  };

  const handleSalir = () => {
    navigate("/"); // Redirigir a home, login u otra ruta según tu flujo
  };

  return (
    <div className="p-4">
      {estado === "valido" && (
        <MessagePanel
          titulo="Activación de cuenta"
          mensaje="La activación de la cuenta fue exitosa. Serás redirigido en 5 segundos..."
        />
      )}

      {estado === "invalido" && (
        <ActivacionErrorPanel
          onReenviar={handleReenviarCodigo}
          onSalir={handleSalir}
        />
      )}

      {estado === "pendiente" && (
        <ValidarCodigoForm
          email={email}
          userId={userId}
          codigoGenerado={codigoGenerado}
          onSuccess={() => setEstado("valido")}
          onError={() => setEstado("invalido")}
        />
      )}
    </div>
  );
};

export default ValidarCodigo;
