import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import useAuth from "./useAuth";

export interface Notification {
  id: number;
  titulo: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
}

export interface UserInfo {
  nombre: string;
  rol: string;
}

export const useUserNotifications = () => {
  const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
  const [usuario, setUsuario] = useState<UserInfo | null>(null);
  const clientRef = useRef<Client | null>(null);
  const { email } = useAuth();

  useEffect(() => {
    if (email) {
      setUsuario({ nombre: email, rol: "usuario" });
    }

    // Conectar al WebSocket del backend
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
    const token = localStorage.getItem("jwt_token");

    const client = new Client({
      webSocketFactory: () => new SockJS(`${apiUrl}/ws`),
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ WebSocket conectado");
        // Suscribirse al topic de reportes
        client.subscribe("/topic/reports", (message) => {
          try {
            const reporte = JSON.parse(message.body);
            const nuevaNotif: Notification = {
              id: Date.now(),
              titulo: `Reporte actualizado: ${reporte.titulo ?? "Sin título"}`,
              mensaje: `Estado: ${reporte.estado ?? "Desconocido"} — ${reporte.descripcion ?? ""}`,
              fecha: new Date().toLocaleString(),
              leido: false,
            };
            setNotificaciones((prev) => [nuevaNotif, ...prev]);
          } catch (e) {
            console.error("Error al parsear notificación:", e);
          }
        });
      },
      onDisconnect: () => {
        console.log("WebSocket desconectado");
      },
      onStompError: (frame) => {
        console.error("Error STOMP:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [email]);

  const marcarLeido = (id: number) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leido: true } : n))
    );
  };

  const limpiarNotificaciones = () => {
    setNotificaciones([]);
  };

  return { notificaciones, usuario, marcarLeido, limpiarNotificaciones };
};