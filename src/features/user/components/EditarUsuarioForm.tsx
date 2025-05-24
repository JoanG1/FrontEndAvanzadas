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
            setFormData({
              nombre,
              telefono,
              direccion,
              ciudad: ciudad || ""
            });
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
      <div className="form-avatar">
        <img src="/avatar.svg" alt="Avatar" className="avatar-img" />
        <span className="edit-icon">✏️</span>
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
            <option value="MEDELLIN">MEDELLIN</option>
            <option value="PEREIRA">PEREIRA</option>
            <option value="BOGOTA">BOGOTA</option>
            <option value="ARMENIA">ARMENIA</option>
            <option value="MANIZALES">MANIZALES</option>
            <option value="CALI">CALI</option>
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
