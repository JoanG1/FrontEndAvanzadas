import { FC } from "react";
import { Notification } from "../../../types/notification";
import "../../../styles/Reports.css";

interface Props {
  notificacion: Notification;
  onMarcarLeido?: (id: string) => void;
}

export const NotificationCard: FC<Props> = ({ notificacion, onMarcarLeido }) => {
  const icono = notificacion.tipo === "comentario" ? "💬"
    : notificacion.tipo === "estado" ? "🔔"
    : "📌";

  return (
    <div
      className="report-card"
      style={{
        border: notificacion.leido ? "1px solid rgba(255,255,255,0.2)" : "2px solid #a78bfa",
        backgroundColor: notificacion.leido ? "rgba(255,255,255,0.05)" : "rgba(167,139,250,0.1)",
        padding: "1rem",
        borderRadius: "12px",
        marginBottom: "0.5rem",
        cursor: !notificacion.leido ? "pointer" : "default",
        transition: "all 0.2s",
      }}
      onClick={() => !notificacion.leido && onMarcarLeido?.(notificacion.id)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "1rem" }}>{icono}</span>
            {!notificacion.leido && (
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#a78bfa", flexShrink: 0, display: "inline-block"
              }} />
            )}
            <h3 style={{
              margin: 0, fontSize: "0.9rem", fontWeight: "bold",
              color: notificacion.leido ? "rgba(255,255,255,0.6)" : "white"
            }}>
              {notificacion.titulo}
            </h3>
          </div>
          <p style={{
            margin: 0, fontSize: "0.82rem",
            color: notificacion.leido ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.75)"
          }}>
            {notificacion.mensaje}
          </p>
        </div>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", flexShrink: 0, marginLeft: "1rem" }}>
          {notificacion.fecha}
        </span>
      </div>
      {!notificacion.leido && (
        <p style={{ fontSize: "0.72rem", color: "#a78bfa", margin: "6px 0 0", textAlign: "right" }}>
          Clic para marcar como leída
        </p>
      )}
    </div>
  );
};