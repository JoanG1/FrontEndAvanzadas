import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/EditarUsuarioForm.css";
import useAuth from "../../../hooks/useAuth";
import { getUsuarioPorEmail, actualizarUsuario } from "../../user/userServices/api";

export const EditarUsuarioForm: FC = () => {
  const navigate = useNavigate();
  const { email } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    ciudad: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          const response = await getUsuarioPorEmail(email);
          if (!response.error) {
            const { nombre, telefono, direccion, ciudad } = response.mensaje;
            setFormData({ nombre, telefono, direccion, ciudad: ciudad || "" });
          }
        } catch (err) {
          console.error("Error al cargar usuario:", err);
        }
      }
    };
    fetchData();
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (email) {
        const response = await actualizarUsuario(email, formData);
        if (!response.error) {
          navigate("/user-info");
        } else {
          alert("Error al actualizar: " + response.mensaje);
        }
      }
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      alert("Hubo un error al enviar los datos ❌");
    }
  };

  return (
    <div className="form-container">
      {/* Avatar SVG inline */}
      <div className="form-avatar">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="45" cy="45" r="45" fill="rgba(255,255,255,0.15)" />
          <circle cx="45" cy="34" r="16" fill="rgba(255,255,255,0.85)" />
          <ellipse cx="45" cy="75" rx="24" ry="16" fill="rgba(255,255,255,0.85)" />
        </svg>
      </div>

      <div className="form-fields">
        <div className="form-row">
          <label>CORREO</label>
          <input name="email" value={email || ""} disabled />
        </div>
        <div className="form-row">
          <label>NOMBRE</label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>TELÉFONO</label>
          <input name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>DIRECCIÓN</label>
          <input name="direccion" value={formData.direccion} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>CIUDAD</label>
          <select name="ciudad" value={formData.ciudad} onChange={handleChange}>
            <option value="">Seleccione una ciudad</option>
            <option value="MEDELLIN">Medellín</option>
            <option value="PEREIRA">Pereira</option>
            <option value="BOGOTA">Bogotá</option>
            <option value="ARMENIA">Armenia</option>
            <option value="MANIZALES">Manizales</option>
            <option value="CALI">Cali</option>
          </select>
        </div>
      </div>

      <div className="form-buttons">
        <button onClick={() => navigate("/user-info")}>ATRÁS</button>
        <button onClick={handleSubmit}>TERMINAR</button>
      </div>
    </div>
  );
};
