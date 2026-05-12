import { FC } from "react";
import { Notification } from "../../../types/notification";
import { NotificationCard } from "./NotificationCard";

interface Props {
  notificaciones: Notification[];
  onMarcarLeido?: (id: number) => void;
  onLimpiar?: () => void;
}

export const NotificationList: FC<Props> = ({ notificaciones, onMarcarLeido, onLimpiar }) => {
  const sinLeer = notificaciones.filter((n) => !n.leido).length;

  if (notificaciones.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginTop: "2rem" }}>
        No tienes notificaciones.
      </p>
    );
  }

  return (
    <div className="report-list">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
          {sinLeer > 0 ? `${sinLeer} sin leer` : "Todo leído ✓"}
        </span>
        {notificaciones.length > 0 && (
          <button
            onClick={onLimpiar}
            style={{
              background: "transparent", color: "#f87171", border: "1px solid #f87171",
              borderRadius: "6px", padding: "3px 10px", cursor: "pointer", fontSize: "0.75rem"
            }}
          >
            Limpiar todo
          </button>
        )}
      </div>
      {notificaciones.map((n) => (
        <NotificationCard key={n.id} notificacion={n} onMarcarLeido={onMarcarLeido} />
      ))}
    </div>
  );
};
