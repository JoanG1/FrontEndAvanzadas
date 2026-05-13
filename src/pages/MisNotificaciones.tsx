import React from "react";
import { useUserNotifications } from "../hooks/useUserNotifications";
import { ReportesHeader } from "../features/user/components/ReportesHeader";
import { NotificationList } from "../features/user/components/NotificacionList";
import "../styles/Reports.css";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";

const MisNotificaciones: React.FC = () => {
  const {
    notificaciones,
    usuario,
    marcarLeido,
    marcarTodasLeidas,
    limpiarNotificaciones,
  } = useUserNotifications();

  return (
    <div className="page-background">
      <UserProfileIcon />
      <div className="report-form-wrapper">
        <ReportesHeader usuario={usuario} titulo="MIS NOTIFICACIONES" />
        <NotificationList
          notificaciones={notificaciones}
          onMarcarLeido={marcarLeido}
          onMarcarTodasLeidas={marcarTodasLeidas}
          onLimpiar={limpiarNotificaciones}
        />
      </div>
    </div>
  );
};

export default MisNotificaciones;