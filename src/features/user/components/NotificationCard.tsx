import { FC } from "react";
import { Notification } from "../../../types/notification";
import "../../../styles/Reports.css";

interface Props {
  notificacion: Notification;
}

export const NotificationCard: FC<Props> = ({ notificacion }) => {
  return (
    <div
      className="report-card"
      style={{
        border: notificacion.leido ? "2px solid #00BFFF" : "1px solid #bbb",
        backgroundColor: "#eee",
      }}
    >
      <div className="report-info">
        <h3 className="report-title">{notificacion.titulo}</h3>
        <p className="report-categoria">{notificacion.mensaje}</p>
      </div>
      <div className="report-ubicacion">{notificacion.fecha}</div>
    </div>
  );
};
