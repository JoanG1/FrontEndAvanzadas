import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import type { CodigoValidacionFormProps } from "../../../types/user";
import "../../../styles/CodigoValidacionForm.css";


export const CodigoValidacionForm: FC<CodigoValidacionFormProps> = ({ email, userId }) => {
  const navigate = useNavigate();

  const handleEnviarCodigo = () => {
    const codigoSimulado = "1234"; // CODIGO QUEMADO
    console.log(JSON.stringify({ mensaje: "Código enviado", codigo: codigoSimulado, email, userId }));
    // Aquí iría la lógica que llama al servicio real /api/auth/codigo-validacion
  };

  const handleEditarCorreo = () => {
    console.log("Volver a editar correo");
    navigate("/register", { state: { email } }); // opcional: pasar el email para precargar
  };

  return (
    <div className="codigo-validacion-container">
      <h2 className="codigo-validacion-title">Verificación de código</h2>

      <p className="codigo-validacion-texto">
        A continuación se enviará un código de activación al correo
        proporcionado <strong>{email}</strong>. Haz clic en <strong>Enviar código</strong> para continuar. 
        Para editar el correo, vuelve atrás.
      </p>

      <div className="codigo-validacion-buttons">
        <Button onClick={handleEnviarCodigo}>Enviar código</Button>
        <Button onClick={handleEditarCorreo}>Editar correo</Button>
      </div>
    </div>
  );
};
