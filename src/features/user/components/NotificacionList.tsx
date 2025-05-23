import { FC } from "react";
import { Notification } from "../../../types/notification";
import { NotificationCard } from "./NotificationCard";

interface Props {
  notificaciones: Notification[];
}

export const NotificationList: FC<Props> = ({ notificaciones }) => {
  return (
    <div className="report-list">
      {notificaciones.map((n) => (
        <NotificationCard key={n.id} notificacion={n} />
      ))}
    </div>
  );
};
