export interface ReportPreviewCardProps {
  title: string;
  imageSrc?: string;
  category: string;
  description: string;
  location: string;
  primaryLabel: string;
  onPrimaryAction: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  showSecondaryAction?: boolean;
  showArrows?: boolean;
}