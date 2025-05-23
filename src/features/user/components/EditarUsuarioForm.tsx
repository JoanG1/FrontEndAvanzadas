// src/features/user/components/EditarUsuarioForm.tsx
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/EditarUsuarioForm.css";

export const EditarUsuarioForm: FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "TATIANA@GMAIL.COM",
    nombre: "Tatiana Mosquera",
    residencia: "Centro de la ciudad",
    ciudad: "Armenia Quindio",
    nivel: "Usuario"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Datos enviados:", formData);
    alert("Simulación de envío exitosa ✅");
  };

  return (
    <div className="form-container">
      <div className="form-avatar">
        <img src="/avatar.svg" alt="Avatar" className="avatar-img" />
        <span className="edit-icon">✏️</span>
      </div>

      <div className="form-fields">
        <div className="form-row">
          <label>CORREO</label>
          <input name="email" value={formData.email} disabled />
        </div>

        <div className="form-row">
          <label>NOMBRE</label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>RESIDENCIA</label>
          <input name="residencia" value={formData.residencia} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>CIUDAD</label>
          <input name="ciudad" value={formData.ciudad} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>NIVEL</label>
          <input name="nivel" value={formData.nivel} onChange={handleChange} />
        </div>
      </div>

      <div className="form-buttons">
        <button onClick={() => navigate(-1)}>ATRÁS</button>
        <button onClick={handleSubmit}>TERMINAR</button>
      </div>
    </div>
  );
};
