import React from "react";
import { X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="relative flex w-[540px] p-6 items-start gap-4 rounded-lg bg-white shadow-lg">
        {/* Success Icon */}
        <div className="flex w-12 h-12 p-3 justify-center items-center flex-shrink-0 rounded-full border-8 border-[#ECFDF3] bg-[#D1FADF]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 11.0779V11.9979C21.9988 14.1543 21.3005 16.2526 20.0093 17.9797C18.7182 19.7069 16.9033 20.9704 14.8354 21.5818C12.7674 22.1932 10.5573 22.1198 8.53447 21.3725C6.51168 20.6252 4.78465 19.244 3.61096 17.435C2.43727 15.6259 1.87979 13.486 2.02168 11.3342C2.16356 9.18248 2.99721 7.13424 4.39828 5.49498C5.79935 3.85573 7.69279 2.71329 9.79619 2.23806C11.8996 1.76282 14.1003 1.98025 16.07 2.85791M22 3.99791L12 14.0079L9.00001 11.0079"
              stroke="#039855"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-7 flex-1">
          <div className="flex flex-col items-start gap-2 w-full">
            <h3 className="w-full text-[#323238] text-base font-bold leading-[26px]">
              {title}
            </h3>
            <p className="w-full text-[#676879] text-[13px] font-normal leading-5">
              {message}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex w-8 h-8 justify-center items-center flex-shrink-0 rounded-full bg-white hover:bg-gray-50 transition-colors"
        >
          <X size={20} className="text-[#676879]" />
        </button>
      </div>
    </div>
  );
}
