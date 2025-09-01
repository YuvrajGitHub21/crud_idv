import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NameTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (templateName: string) => void;
  shouldNavigate?: boolean;
}

export function NameTemplateModal({
  isOpen,
  onClose,
  onSave,
  shouldNavigate = true,
}: NameTemplateModalProps) {
  const [templateName, setTemplateName] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSave = () => {
    if (templateName.trim()) {
      onSave?.(templateName.trim());
      setTemplateName("");
      onClose();
      if (shouldNavigate) {
        navigate("/form-builder");
      }
    }
  };

  const handleCancel = () => {
    setTemplateName("");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-50"
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-lg"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "520px",
          maxWidth: "calc(100vw - 32px)",
          boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.20)",
        }}
      >
        {/* Header */}
        <div className="flex h-[52px] px-5 py-2.5 justify-between items-center border-b border-[#D0D4E4] bg-white rounded-t-lg">
          <h2 className="text-lg font-bold leading-[26px] text-[#172B4D]">
            Name Your Template
          </h2>
          <button
            onClick={handleCancel}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-white hover:bg-gray-50 transition-colors"
          >
            <X size={16} className="text-[#676879]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 bg-white">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {/* Label */}
                <label className="text-[13px] font-medium leading-[18px] text-[#172B4D]">
                  Template Name
                </label>

                {/* Input */}
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter Template Name"
                  className="h-[38px] px-3 py-[15px] border border-[#C3C6D4] rounded text-[13px] leading-5 text-[#172B4D] placeholder:text-[#676879] focus:outline-none focus:ring-2 focus:ring-[#0073EA] focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex h-[60px] px-5 justify-end items-center gap-2 border-t border-[#D0D4E4] bg-white rounded-b-lg">
          <button
            onClick={handleCancel}
            className="flex h-8 px-4 py-2.5 items-center justify-center gap-1 rounded bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-[13px] font-medium text-[#505258]">
              Cancel
            </span>
          </button>
          <button
            onClick={handleSave}
            disabled={!templateName.trim()}
            className="flex h-8 px-4 py-2.5 items-center justify-center gap-0.5 rounded border border-[#0073EA] bg-[#0073EA] hover:bg-[#0061d1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="text-[13px] font-medium text-white">
              Save & Continue
            </span>
          </button>
        </div>

        {/* Standard text at bottom */}
        <div className="absolute -bottom-8 left-0">
          <span className="text-xl font-bold leading-[30px] text-[#172B4D]">
            Standard
          </span>
        </div>
      </div>
    </>
  );
}
