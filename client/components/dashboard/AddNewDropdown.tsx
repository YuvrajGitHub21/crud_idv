import React from "react";
import { useNavigate } from "react-router-dom";

interface AddNewDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNewTemplate?: () => void;
}

interface DropdownItemProps {
  label: string;
  onClick?: () => void;
}

function DropdownItem({ label, onClick }: DropdownItemProps) {
  return (
    <div
      className="flex items-center h-8 px-2 rounded bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <span className="text-sm font-medium text-secondary-text">{label}</span>
    </div>
  );
}

export function AddNewDropdown({
  isOpen,
  onClose,
  onCreateNewTemplate,
}: AddNewDropdownProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCreateNewTemplate = () => {
    onClose(); // Close the dropdown first
    onCreateNewTemplate?.();
  };

  const handleChooseTemplate = () => {
    onClose(); // Close the dropdown first
    navigate("/choose-template");
  };

  const handleAction = (action: string) => {
    console.log(`${action} action triggered`);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed z-50 w-[230px] p-2 bg-white rounded shadow-lg"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.20)",
        }}
      >
        <div className="flex flex-col gap-px">
          <DropdownItem
            label="Create New Template"
            onClick={handleCreateNewTemplate}
          />

          <DropdownItem
            label="Choose Template"
            onClick={handleChooseTemplate}
          />
        </div>
      </div>
    </>
  );
}
