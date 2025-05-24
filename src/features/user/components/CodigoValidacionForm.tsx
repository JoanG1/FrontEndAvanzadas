import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import type { CodigoValidacionFormProps } from "../../../types/user";
import "../../../styles/CodigoValidacionForm.css";
import { generarCodigoValidacion } from '../../user/userServices/api';



export const CodigoValidacionForm: FC<CodigoValidacionFormProps> = ({ email, userId }) => {
  const navigate = useNavigate();

  const handleEnviarCodigo = async () => {

    console.log(userId)
  try {
    const response = await generarCodigoValidacion(userId);
    if (!response.error) {
      const codigo = response.mensaje;
      console.log(JSON.stringify({
        mensaje: "Código enviado",
        codigo,
        email,
        userId
      }));

      // Redirigir a /validar-codigo con email y userId
      navigate("/validar-codigo", {
        state: {
          email,
          userId,
          codigoGenerado: codigo
        }
      });
    } else {
      alert('Error al generar el código: ' + response.mensaje);
    }
  } catch (error: any) {
    console.error('Error generando código:', error.response?.data?.message || error.message);
    alert('Error inesperado al generar el código.');
  }
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
