import { FC } from "react";
import { Report } from "../../../types/report";
import { ReportCard } from "./ReportCard";
import "../../../styles/Reports.css";

interface Props {
  reportes: Report[];
}

export const ReportList: FC<Props> = ({ reportes }) => {
  const handleEditar = (id: number) => {
    alert(`Editar reporte ID: ${id}`);
  };

  const handleEliminar = (id: number) => {
    alert(`Eliminar reporte ID: ${id}`);
  };

  return (
    <div className="report-list">
      {reportes.map((r) => (
        <ReportCard
          key={r.id}
          reporte={r}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      ))}
    </div>
  );
};
