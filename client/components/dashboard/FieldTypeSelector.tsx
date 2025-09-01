import React from "react";
import {
  Menu,
  Menu as MenuLines,
  FileText,
  Circle,
  Square,
  ChevronDown,
  Star,
  GitCommit,
  Upload,
  Calendar,
  Clock,
} from "lucide-react";

interface FieldTypeOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface FieldTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
  position?: { x: number; y: number };
}

const fieldTypes: FieldTypeOption[] = [
  {
    id: "Input",
    label: "Input",
    icon: <Menu size={16} className="text-[#676879]" strokeWidth={1.2} />,
  },
  {
    id: "Textarea",
    label: "Textarea",
    icon: <MenuLines size={16} className="text-[#676879]" strokeWidth={1.2} />,
  },
  {
    id: "Multiple Choice",
    label: "Multiple Choice",
    icon: (
      <div className="w-4 h-4 rounded-full border border-[#676879] bg-white relative">
        <div className="w-2.5 h-2.5 rounded-full bg-[#676879] absolute top-0.5 left-0.5"></div>
      </div>
    ),
  },
  {
    id: "Checkboxes",
    label: "Checkboxes",
    icon: (
      <div className="w-4 h-4 rounded border border-[#676879] bg-[#676879] flex items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.19984 10.6178L3.67984 8.09781L2.83984 8.93781L6.19984 12.2978L13.3998 5.09781L12.5598 4.25781L6.19984 10.6178Z"
            fill="white"
          />
        </svg>
      </div>
    ),
  },
  {
    id: "Dropdown",
    label: "Dropdown",
    icon: (
      <div className="w-4 h-4 rounded-full border border-[#676879] bg-white flex items-center justify-center">
        <ChevronDown size={12} className="text-[#676879]" />
      </div>
    ),
  },
  {
    id: "Rating",
    label: "Rating",
    icon: <Star size={16} className="text-[#676879]" strokeWidth={1.2} />,
  },
  {
    id: "Compute",
    label: "Compute",
    icon: <GitCommit size={16} className="text-[#676879]" strokeWidth={1.09} />,
  },
  {
    id: "Upload Files",
    label: "Upload Files",
    icon: <Upload size={16} className="text-[#676879]" strokeWidth={1.2} />,
  },
  {
    id: "Date",
    label: "Date",
    icon: <Calendar size={16} className="text-[#676879]" strokeWidth={1.2} />,
  },
  {
    id: "Time",
    label: "Time",
    icon: <Clock size={16} className="text-[#676879]" strokeWidth={1.2} />,
  },
];

export function FieldTypeSelector({
  isOpen,
  onClose,
  onSelect,
  position,
}: FieldTypeSelectorProps) {
  if (!isOpen) return null;

  const handleSelect = (type: string) => {
    onSelect(type);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent z-40"
        onClick={handleBackdropClick}
      />

      {/* Dropdown */}
      <div
        className="fixed z-50 w-[250px] p-2 bg-white rounded shadow-lg border border-gray-200"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex flex-col items-start gap-px">
          {fieldTypes.map((fieldType, index) => (
            <React.Fragment key={fieldType.id}>
              <button
                onClick={() => handleSelect(fieldType.id)}
                className="flex items-center gap-2 w-full h-[38px] px-1.5 rounded bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {fieldType.icon}
                  <span className="text-[#676879] text-sm font-medium">
                    {fieldType.label}
                  </span>
                </div>
              </button>

              {/* Add separator lines after specific items */}
              {(index === 1 || index === 6 || index === 7) && (
                <div className="h-px w-full bg-[#D0D4E4]"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
