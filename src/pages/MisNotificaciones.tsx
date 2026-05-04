import React from "react";
import { useUserNotifications } from "../hooks/useUserNotifications";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import { NotificationList } from "../features/user/components/NotificacionList";
import "../styles/Reports.css";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const MisNotificaciones: React.FC = () => {
  const { notificaciones, usuario } = useUserNotifications();

  return (
    // Usamos page-background para el fondo de ciudad centrado
    <div className="page-background">
      <UserProfileIcon />

      {/* report-form-wrapper ya tiene el glass borroso y el centrado */}
      <div className="report-form-wrapper">
        <ReportesHeader usuario={usuario} titulo="MIS NOTIFICACIONES" />
        <NotificationList notificaciones={notificaciones} />
      </div>
    </div>
  );
};

export default MisNotificaciones;
