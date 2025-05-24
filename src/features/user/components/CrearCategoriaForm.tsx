import { FC, useState } from "react";
import "../../../styles/CrearCategoriaForm.css";

export const CrearCategoriaForm: FC = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    console.log({ nombre, descripcion });

    // Lógica para enviar la categoría
  };

  return (
    <form className="crear-categoria-form" onSubmit={handleSubmit}>
      <label>Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ingrese el nombre"
      />

      <label>Descripción</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Ingrese una descripción"
        rows={5}
      />

      <button type="submit">Crear categoría</button>
    </form>
  );
};
