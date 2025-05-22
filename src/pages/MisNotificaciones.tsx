import React from "react";
import { useUserNotifications } from "../hooks/useUserNotifications";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import { NotificationList } from "../features/user/components/NotificacionList";
import "../styles/Reports.css"; // Usamos el mismo estilo base
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const MisNotificaciones: React.FC = () => {
  const { notificaciones, usuario } = useUserNotifications();

  return (
    <div className="mis-reportes-container">
        <UserProfileIcon />
      <ReportesHeader usuario={usuario} titulo={"MIS NOTIFICACIONES"} />
      <NotificationList notificaciones={notificaciones} />
    </div>
  );
};

export default MisNotificaciones;
