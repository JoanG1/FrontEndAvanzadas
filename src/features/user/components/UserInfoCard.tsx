import { FC, useState } from "react";
import { Button } from "../../../components/ui/Button";
import "../../../styles/UserInfoCard.css";

export const UserInfoCard: FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleToggle = () => setEmailNotifications(prev => !prev);

  return (
    <div className="user-card-container">
      <div className="user-card-header">
        <div className="user-avatar">
          <span role="img" aria-label="user" className="user-avatar-icon">👤</span>
        </div>
        <div className="user-info-texts">
          <h2 className="user-name">Tatiana Mosquera</h2>
          <p className="user-role">Usuario</p>
          <p className="user-email">tatiana@gmail.com</p>
        </div>
      </div>

      <div className="user-info-body">
        <div className="user-info-row">
          <span className="label">Residencia:</span>
          <span className="value">Centro de la ciudad</span>
        </div>
        <div className="user-info-row">
          <span className="label">Ciudad:</span>
          <span className="value">Armenia Quindío</span>
        </div>
        <div className="user-info-row">
          <span className="label">Nivel:</span>
          <span className="value">Usuario</span>
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
        <Button onClick={() => alert("Volver atrás")}>Atrás</Button>
        <Button onClick={() => alert("Editar datos")}>Editar Datos</Button>
      </div>
    </div>
  );
};
