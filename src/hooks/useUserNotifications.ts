import { useEffect, useState, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import useAuth from "./useAuth";
import {
  getUsuarioPorEmail,
  getUsuarioIdPorEmail,
  getNotificaciones,
  marcarNotificacionLeida,
  marcarTodasNotificacionesLeidas,
} from "../features/user/userServices/api";

export interface Notification {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
  tipo?: string;
}

export interface UserInfo {
  nombre: string;
  rol: string;
}

export const useUserNotifications = () => {
  const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
  const [usuario, setUsuario] = useState<UserInfo | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const clientRef = useRef<Client | null>(null);
  const { email } = useAuth();

  // ✅ Cargar notificaciones desde BD
  const cargarNotificaciones = useCallback(async (idUsuario: string) => {
    try {
      const data = await getNotificaciones(idUsuario);
      const mapeadas: Notification[] = data.map((n: any) => ({
        id: n.id,
        titulo: n.titulo,
        mensaje: n.mensaje,
        fecha: new Date(n.fecha).toLocaleString(),
        leido: n.leido,
        tipo: n.tipo,
      }));
      setNotificaciones(mapeadas);
    } catch (e) {
      console.error("Error cargando notificaciones:", e);
    }
  }, []);

  useEffect(() => {
    if (!email) return;

    const inicializar = async () => {
      // Cargar usuario
      try {
        const data = await getUsuarioPorEmail(email);
        setUsuario({
          nombre: data.mensaje?.nombre ?? email,
          rol: data.mensaje?.rol ?? "usuario",
        });
      } catch {
        setUsuario({ nombre: email, rol: "usuario" });
      }

      // Obtener ID del usuario
      let idUsuario: string | null = null;
      try {
        idUsuario = await getUsuarioIdPorEmail(email);
        setUserId(idUsuario);
      } catch {
        console.warn("No se pudo obtener el ID del usuario");
        return;
      }

      // ✅ Cargar notificaciones históricas desde BD
      await cargarNotificaciones(idUsuario);

      // ✅ Conectar WebSocket
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const token = localStorage.getItem("jwt_token");

      const client = new Client({
        webSocketFactory: () => new SockJS(`${apiUrl}/ws`),
        connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("✅ WebSocket conectado");

          // Topic general — actualizaciones de reportes
          client.subscribe("/topic/reports", (message) => {
            try {
              const data = JSON.parse(message.body);
              const nuevaNotif: Notification = {
                id: String(Date.now()),
                titulo: data.titulo ?? "Reporte actualizado",
                mensaje: data.descripcion ?? `Estado: ${data.estado ?? "Desconocido"}`,
                fecha: new Date().toLocaleString(),
                leido: false,
                tipo: "estado",
              };
              setNotificaciones((prev) => [nuevaNotif, ...prev]);
            } catch (e) {
              console.error("Error al parsear notificación general:", e);
            }
          });

          // ✅ Topic personal — comentarios y cambios en reportes seguidos
          if (idUsuario) {
            client.subscribe(`/topic/user/${idUsuario}/reports`, (message) => {
              try {
                const data = JSON.parse(message.body);
                const nuevaNotif: Notification = {
                  id: String(Date.now() + 1),
                  titulo: data.titulo ?? "Nueva notificación",
                  mensaje: data.descripcion ?? "",
                  fecha: new Date().toLocaleString(),
                  leido: false,
                  tipo: data.topic ?? "general",
                };
                // ✅ Agregar al estado y recargar desde BD para tener el ID real
                setNotificaciones((prev) => [nuevaNotif, ...prev]);
                setTimeout(() => cargarNotificaciones(idUsuario!), 500);
              } catch (e) {
                console.error("Error al parsear notificación personal:", e);
              }
            });
          }
        },
        onDisconnect: () => console.log("WebSocket desconectado"),
        onStompError: (frame) => console.error("Error STOMP:", frame),
      });

      client.activate();
      clientRef.current = client;
    };

    inicializar();

    return () => {
      clientRef.current?.deactivate();
    };
  }, [email, cargarNotificaciones]);

  // ✅ Marcar una notificación como leída en BD y en estado local
  const marcarLeido = async (id: string) => {
    try {
      await marcarNotificacionLeida(id);
      setNotificaciones((prev) =>
        prev.map((n) => (n.id === id ? { ...n, leido: true } : n))
      );
    } catch (e) {
      console.error("Error al marcar notificación como leída:", e);
    }
  };

  // ✅ Marcar todas como leídas
  const marcarTodasLeidas = async () => {
    if (!userId) return;
    try {
      await marcarTodasNotificacionesLeidas(userId);
      setNotificaciones((prev) => prev.map((n) => ({ ...n, leido: true })));
    } catch (e) {
      console.error("Error al marcar todas como leídas:", e);
    }
  };

  // ✅ Limpiar solo en memoria (no borra de BD)
  const limpiarNotificaciones = () => setNotificaciones([]);

  return {
    notificaciones,
    usuario,
    marcarLeido,
    marcarTodasLeidas,
    limpiarNotificaciones,
  };
};