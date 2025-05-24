import { FC, useEffect, useState } from "react";
import { Button } from "../../../components/ui/Button";
import "../../../styles/UserInfoCard.css";
import useAuth from "../../../hooks/useAuth";
import { getUsuarioPorEmail } from "../../user/userServices/api";
import { useNavigate } from "react-router-dom";

interface Usuario {
  nombre: string;
  email: string;
  contrasena: string;
  telefono: string;
  direccion: string;
  estado: string;
}

export const UserInfoCard: FC = () => {
  const { email, rol } = useAuth();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      if (email) {
        try {
          const data = await getUsuarioPorEmail(email);
          if (!data.error) {
            setUsuario(data.mensaje);
          } else {
            console.error("❌ Error al obtener datos:", data.mensaje);
          }
        } catch (error) {
          console.error("❌ Error en la solicitud:", error);
        }
      }
    };

    fetchUsuario();
  }, [email]);

  const handleToggle = () => setEmailNotifications(prev => !prev);

  return (
    <div className="user-card-container">
      <div className="user-card-header">
        <div className="user-avatar">
          <span role="img" aria-label="user" className="user-avatar-icon">👤</span>
        </div>
        <div className="user-info-texts">
          <h2 className="user-name">{usuario?.nombre || "Nombre no disponible"}</h2>
          <p className="user-role">{rol || "Rol no disponible"}</p>
          <p className="user-email">{usuario?.email || "Email no disponible"}</p>
        </div>
      </div>

      <div className="user-info-body">
        <div className="user-info-row">
          <span className="label">Teléfono:</span>
          <span className="value">{usuario?.telefono || "No disponible"}</span>
        </div>
        <div className="user-info-row">
          <span className="label">Dirección:</span>
          <span className="value">{usuario?.direccion || "No disponible"}</span>
        </div>
        <div className="user-info-row">
          <span className="label">Estado:</span>
          <span className="value">{usuario?.estado || "No disponible"}</span>
        </div>
        <div className="user-info-row">
          <span className="label">Notificación por correo:</span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={handleToggle}
          />
        </div>
      </div>

      <div className="user-card-footer">
        <Button onClick={() => navigate("/")}>Atrás</Button>
        <Button onClick={() => navigate("/editar-usuario")}>Editar Datos</Button>
      </div>
    </div>
  );
};
