// src/pages/ReportPreviewPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReportPreviewCard } from "../features/user/components/ReportPreviewCard";
import { UserProfileIcon } from "../components/ui/UserProfileIcon";
import { crearReporte, uploadImage } from '../features/user/userServices/api';
import useAuth from "../hooks/useAuth"


const ReportPreviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reportData = location.state;
  const {email} = useAuth();


  const handleCreate = async () => {
    try {
      const nuevoReporte = {
        titulo: reportData.title,
        descripcion: reportData.description,
        ubicacion: {
          latitud: reportData.latitud,
          longitud: reportData.longitud,
          direccion: reportData.location
        },
        estadoReporte: "PENDIENTE",
        imagenes: [""],
        categoria: reportData.category,
        fechaCreacion: ""
      };
      console.log(nuevoReporte);
      if(email){

        console.log(reportData.images);
        const response = await crearReporte(email,nuevoReporte);

        // Subir cada imagen
      for (const imageFile of reportData.images) {
      
        console.log("image "+ imageFile + " id "+response.mensaje)
        await uploadImage(response.mensaje, imageFile);
      }
        navigate('/reportes-feed'); // Redirige a la lista de reportes o a donde desees
      }else{
        alert("algo salio mal");
      }
      
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      // Manejo de errores según sea necesario
    }
  };

  if (!reportData) {
    return <div>No se proporcionaron datos para vista previa</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center text-white px-4">
      <UserProfileIcon />
      <ReportPreviewCard
        title={reportData.title}
        imageSrc={reportData.images.length > 0 ? URL.createObjectURL(reportData.images[0]) : "/placeholder-image.svg"}
        category={reportData.category}
        description={reportData.description}
        location={reportData.location}
        primaryLabel="CREAR"
        onPrimaryAction={handleCreate}
        showArrows={reportData.images.length > 1}
      />
    </div>
  );
};

export default ReportPreviewPage;
