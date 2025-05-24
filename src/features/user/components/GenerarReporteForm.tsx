import { FC, useState } from "react";
import "../../../styles/GenerarReporteForm.css";

export const GenerarReporteForm: FC = () => {
  const [usuario, setUsuario] = useState("");
  const [fecha, setFecha] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario || !fecha || !categoria || !ubicacion) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    console.log({
      usuario,
      fecha,
      categoria,
      ubicacion
    });

    // Aquí podrías agregar lógica para guardar o enviar el reporte
  };

  return (
    <form className="generar-reporte-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="">------</option>
        <option value="ambiental">Ambiental</option>
        <option value="seguridad">Seguridad</option>
        <option value="social">Social</option>
      </select>
      <input
        type="text"
        placeholder="Ubicación"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
      />

      <button type="submit">Generar Reporte</button>
    </form>
  );
};
