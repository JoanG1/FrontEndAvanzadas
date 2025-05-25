import { FC } from "react";
import { Report } from "../../../types/report";
import { ReportCard } from "./ReportCard";
import "../../../styles/Reports.css";
import { cambiarEstadoReporte } from "../userServices/api"; // ajusta el path

interface Props {
  reportes: Report[];
}

export const ReportList: FC<Props> = ({ reportes }) => {
  const handleEditar = async (id: number) => {
    const nuevoEstado = prompt("Ingrese el nuevo estado (ej: VERIFICADO, RECHAZADO, ACTIVO)");

    if (!nuevoEstado) return;

    try {
      await cambiarEstadoReporte(id, nuevoEstado);
      alert("Estado actualizado correctamente.");
      // TODO: aquí puedes recargar los reportes si tienes un `refetch()`
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      alert("Error al actualizar el estado del reporte.");
    }
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
