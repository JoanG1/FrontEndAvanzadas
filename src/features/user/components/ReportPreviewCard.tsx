import React from "react";
import "../../../styles/ReportPreviewCard.css";
import { ReportPreviewCardProps } from "../../../types/reportPreview";

export const ReportPreviewCard: React.FC<ReportPreviewCardProps> = ({
  title,
  imageSrc,
  category,
  description,
  location,
  primaryLabel,
  onPrimaryAction,
  secondaryLabel,
  onSecondaryAction,
  showSecondaryAction = false,
  showArrows = false
}) => {
  return (
    <div className="report-card-container">
      <div className="report-card-header">
        <button className="report-card-button">ATRAS</button>
        <h2 className="report-card-title">{title}</h2>
        <button onClick={onPrimaryAction} className="report-card-button">
          {primaryLabel}
        </button>
      </div>

      <div className="report-card-image-container">
        {showArrows && <span className="report-card-arrow left">&lt;</span>}

            <div className="report-card-image-frame">
                <img
                src={imageSrc || "/placeholder-image.svg"}
                alt="Report"
                className="report-card-image"
            />
            </div>

        {showArrows && <span className="report-card-arrow right">&gt;</span>}
    </div>


      <p className="report-card-category">CATEGORÍA : {category}</p>
      <div className="report-card-description">{description}</div>
      <div className="report-card-location">{location}</div>

      {showSecondaryAction && onSecondaryAction && secondaryLabel && (
        <button
          onClick={onSecondaryAction}
          className="report-card-secondary"
        >
          {secondaryLabel}
        </button>
      )}
    </div>
  );
};
