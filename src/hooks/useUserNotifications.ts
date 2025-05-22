import { useEffect, useState } from "react";
import { Notification, UserInfo } from "../types/notification";

export const useUserNotifications = () => {
  const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
  const [usuario, setUsuario] = useState<UserInfo | null>(null);

  useEffect(() => {
    setUsuario({ nombre: "Tatiana Mosquera", rol: "usuario" });
    setNotificaciones([
      {
        id: 1,
        titulo: "TITULO DE NOTIFICACIONES",
        mensaje: "Mensaje larguisimooo de notificacion enviado por el que lo envio",
        fecha: "5/03/24",
        leido: true,
      },
      {
        id: 2,
        titulo: "TITULO DE NOTIFICACIONES",
        mensaje: "Mensaje larguisimooo de notificacion enviado por el que lo envio",
        fecha: "5/03/24",
        leido: false,
      },
      {
        id: 3,
        titulo: "TITULO DE NOTIFICACIONES",
        mensaje: "Mensaje larguisimooo de notificacion enviado por el que lo envio",
        fecha: "5/03/24",
        leido: false,
      },
    ]);
  }, []);

  return { notificaciones, usuario };
};
