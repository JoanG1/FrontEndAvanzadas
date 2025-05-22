import { FC, useEffect, useState } from "react";
import { UserInfo } from "../../../types/report";
import "../../../styles/Reports.css";

interface Props {
  usuario: UserInfo | null;
  titulo: string;
}

export const ReportesHeader: FC<Props> = ({ usuario, titulo }) => {
  const [horaActual, setHoraActual] = useState("");

  useEffect(() => {
    const updateHora = () => {
      const now = new Date().toLocaleString("es-CO", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      setHoraActual(now);
    };

    updateHora();
    const interval = setInterval(updateHora, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reportes-header">
      <div className="user-info">
        <div className="avatar">👤</div>
        <div className="user-details">
          <h4>{usuario?.nombre}</h4>
          <p>{usuario?.rol}</p>
        </div>
      </div>

      <h2 className="header-title">{titulo}</h2>

      <div className="fecha-hora">{horaActual}</div>
    </div>
  );
};
