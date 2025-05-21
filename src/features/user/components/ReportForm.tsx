import React, { useState } from "react";
import { ReportFormData } from "../../../types/report";
import "../../../styles/ReportForm.css";

const CATEGORIES = ["Incidente", "Reclamo", "Sugerencia", "Otro"];

export const ReportForm: React.FC = () => {
  const [formData, setFormData] = useState<ReportFormData>({
    title: "",
    category: "",
    isImportant: false,
    location: "",
    description: "",
    images: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === "checkbox") {
      const checked = (target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const files = Array.from((target as HTMLInputElement).files || []);
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
      setErrors((prev) => ({ ...prev, images: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageDelete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Este campo es obligatorio.";
    if (!formData.category.trim()) newErrors.category = "Selecciona una categoría.";
    if (!formData.location.trim()) newErrors.location = "Este campo es obligatorio.";
    if (!formData.description.trim()) newErrors.description = "Este campo es obligatorio.";
    if (formData.images.length === 0) newErrors.images = "Debes subir al menos una imagen.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = () => {
    if (validateForm()) {
      console.log("PREVISUALIZANDO:", formData);
    } else {
      console.log("Errores encontrados.");
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="report-form-wrapper">
      <form className="report-form">

        <div className="top-section">
          {/* Imagen */}
          <div className="image-upload">
            <label htmlFor="image-upload" className="image-placeholder">
              {formData.images.length > 0 ? formData.images.length : "+"}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              name="images"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            {errors.images && <p className="error">{errors.images}</p>}

            <div className="image-thumbnails">
              {formData.images.map((img, idx) => (
                <div key={idx} className="thumb-wrapper">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                    className="thumb"
                  />
                  <button
                    type="button"
                    className="delete-thumb"
                    onClick={() => handleImageDelete(idx)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Título, Categoría, Importante */}
          <div className="right-section">
            <div className="input-group small">
              <label>TITULO</label>
              <input name="title" value={formData.title} onChange={handleChange} />
              {errors.title && <p className="error">{errors.title}</p>}
            </div>

            <div className="input-group small">
              <label>CATEGORIA</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">------</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>

            <div className="input-group checkbox-group">
              <label>IMPORTANTE</label>
              <input
                type="checkbox"
                name="isImportant"
                checked={formData.isImportant}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="input-group">
          <label>UBICACION</label>
          <input name="location" value={formData.location} onChange={handleChange} />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        <div className="input-group">
          <label>DESCRIPCION</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="button-group">
          <button type="button" className="back-button" onClick={handleBack}>
            ATRAS
          </button>
          <button type="button" className="preview-button" onClick={handlePreview}>
            PREVISUALIZAR REPORTE
          </button>
        </div>
      </form>
    </div>
  );
};
