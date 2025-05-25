import { FC, useState } from "react";
import "../../../styles/CrearCategoriaForm.css";
import { crearCategoria } from "../userServices/api"; // ajusta el path si es necesario

export const CrearCategoriaForm: FC = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      await crearCategoria({ nombre, descripcion });
      alert("Categoría creada exitosamente.");
      setNombre("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert("Hubo un error al crear la categoría.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="crear-categoria-form" onSubmit={handleSubmit}>
      <label>Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ingrese el nombre"
        disabled={loading}
      />

      <label>Descripción</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Ingrese una descripción"
        rows={5}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creando..." : "Crear categoría"}
      </button>
    </form>
  );
};
