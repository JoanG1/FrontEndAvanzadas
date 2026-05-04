import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReportPreviewCard } from "../features/user/components/ReportPreviewCard";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import { crearReporte, uploadImage } from '../features/user/userServices/api';
import useAuth from "../hooks/useAuth";
import "../styles/ReportPreviewCard.css";

const ReportPreviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reportData = location.state;
  const { email } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!email) {
      setError("No se pudo identificar al usuario. Por favor inicia sesión nuevamente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const nuevoReporte = {
        titulo: reportData.title,
        descripcion: reportData.description,
        ubicacion: {
          latitud: reportData.latitud,
          longitud: reportData.longitud,
          direccion: reportData.location,
        },
        estadoReporte: "PENDIENTE",
        imagenes: [""],
        categoria: reportData.category,
        fechaCreacion: "",
      };

      const response = await crearReporte(email, nuevoReporte);

      // El backend devuelve el reporte creado — el ID puede venir como response.id o response.mensaje
      const reporteId: string = response.id ?? response.mensaje ?? response;

      if (!reporteId) {
        throw new Error("El servidor no devolvió el ID del reporte creado.");
      }

      // Subir imágenes solo si hay archivos válidos
      const imagenes: File[] = (reportData.images ?? []).filter(
        (f: any) => f instanceof File
      );

      for (const imageFile of imagenes) {
        await uploadImage(reporteId, imageFile);
      }

      navigate("/reportes-feed");
    } catch (err: any) {
      console.error("Error al crear el reporte:", err);
      const mensaje =
        err?.response?.data?.mensaje ||
        err?.response?.data?.message ||
        err?.message ||
        "Ocurrió un error al crear el reporte. Intenta de nuevo.";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  if (!reportData) {
    return <div>No se proporcionaron datos para vista previa</div>;
  }

  return (
    <div className="report-preview-page">
      <UserProfileIcon />

      {error && (
        <div style={{
          background: "rgba(200,0,0,0.15)",
          border: "1px solid #cc0000",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          marginBottom: "1rem",
          color: "#ffcccc",
          maxWidth: "600px",
          width: "100%",
        }}>
          ⚠️ {error}
        </div>
      )}

      <ReportPreviewCard
        title={reportData.title}
        imageSrc={
          reportData.images?.length > 0
            ? URL.createObjectURL(reportData.images[0])
            : "/placeholder-image.svg"
        }
        category={reportData.category}
        description={reportData.description}
        location={reportData.location}
        primaryLabel={loading ? "Creando..." : "CREAR"}
        onPrimaryAction={loading ? undefined : handleCreate}
        showArrows={reportData.images?.length > 1}
      />
    </div>
  );
};

export default ReportPreviewPage;
