import { FC } from "react";
import { Report } from "../../../types/report";
import "../../../styles/Reports.css";

interface Props {
  reporte: Report;
  onEditar: (id: number) => void;
  onEliminar: (id: number) => void;
}

export const ReportCard: FC<Props> = ({ reporte, onEditar, onEliminar }) => {
  const iconEstado =
    reporte.estado === "verificado" ? "✅" : "⚠️";

  return (
    <div className="report-card">
      <img src={reporte.imagenUrl} alt="Reporte" className="report-img" />
      <div className="report-info">
        <h3 className="report-title">{reporte.titulo}</h3>
        <p className="report-categoria">{reporte.categoria}</p>
      </div>
      <div className="report-ubicacion">{reporte.ubicacion}</div>
      <div className="report-acciones">
        <span>{iconEstado}</span>
        <button onClick={() => onEditar(reporte.id)}>📄</button>
        <button onClick={() => onEliminar(reporte.id)}>❌</button>
      </div>
    </div>
  );
};
