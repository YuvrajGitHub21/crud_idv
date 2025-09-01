import React from "react";
import { ChevronLeft, Shield, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChooseTemplate() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleUseTemplate = (templateType: string) => {
    console.log(`Using template: ${templateType}`);
    // Navigate to template configuration or creation flow
  };

  const handlePreview = (templateType: string) => {
    console.log(`Previewing template: ${templateType}`);
    // Open template preview
  };

  const handleCreateCustom = () => {
    console.log("Creating custom template");
    // Navigate to custom template builder
  };

  return (
    <div className="flex flex-col justify-center items-start bg-white min-h-screen">
      {/* Header */}
      <div className="flex h-11 px-4 justify-between items-center border-b border-[#DEDEDD] bg-white w-full">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/4566b1e4f2b69299156b1f1c61472e06e0ad9666?width=180"
          alt="Logo"
          className="w-[90px] h-7"
        />
        <div className="flex items-center gap-2">
          <div className="flex w-8 h-8 p-2 justify-center items-center gap-2 rounded-full bg-[#F65F7C]">
            <span className="text-white text-xs font-medium leading-[10px]">
              OS
            </span>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="flex w-full justify-center items-center bg-white flex-1">
        <div className="flex flex-col items-start flex-1 bg-white w-full max-w-none">
          {/* Sub Header */}
          <div className="flex h-20 flex-col items-start flex-shrink-0 w-full">
            <div className="flex flex-col items-start w-full border-b border-[#DEDEDD]">
              {/* Breadcrumbs */}
              <div className="flex h-[38px] px-4 items-center gap-2 w-full">
                <div className="flex items-center gap-2 w-full">
                  <div className="flex h-8 justify-center items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.33268 1.51562V4.26932C9.33268 4.64268 9.33268 4.82937 9.40535 4.97198C9.46928 5.09742 9.57122 5.1994 9.69668 5.26332C9.83928 5.33598 10.0259 5.33598 10.3993 5.33598H13.153M9.33268 11.3359H5.33268M10.666 8.66927H5.33268M13.3327 6.66142V11.4693C13.3327 12.5894 13.3327 13.1494 13.1147 13.5773C12.9229 13.9536 12.617 14.2595 12.2407 14.4513C11.8128 14.6693 11.2528 14.6693 10.1327 14.6693H5.86602C4.74591 14.6693 4.18586 14.6693 3.75804 14.4513C3.38171 14.2595 3.07575 13.9536 2.884 13.5773C2.66602 13.1494 2.66602 12.5894 2.66602 11.4693V4.53594C2.66602 3.41583 2.66602 2.85578 2.884 2.42796C3.07575 2.05163 3.38171 1.74567 3.75804 1.55392C4.18586 1.33594 4.74591 1.33594 5.86602 1.33594H8.00722C8.49635 1.33594 8.74095 1.33594 8.97115 1.3912C9.17522 1.44019 9.37028 1.521 9.54928 1.63066C9.75108 1.75434 9.92402 1.92729 10.2699 2.2732L12.3954 4.39868C12.7413 4.74458 12.9143 4.91754 13.0379 5.11937C13.1476 5.29831 13.2284 5.4934 13.2774 5.69747C13.3327 5.92765 13.3327 6.17224 13.3327 6.66142Z"
                        stroke="#515257"
                        strokeWidth="1.09091"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[#505258] text-xs font-medium leading-3">
                      Template
                    </span>
                  </div>
                  <div className="flex h-8 justify-center items-center gap-2">
                    <span className="text-[#505258] text-xs font-medium leading-3">
                      /
                    </span>
                  </div>
                  <div className="flex h-8 justify-center items-center gap-1">
                    <span className="text-[#505258] text-xs font-medium leading-3">
                      Create New Template
                    </span>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <div className="flex h-[42px] px-4 py-2 justify-between items-center w-full">
                <div className="flex items-start gap-2">
                  <button
                    onClick={handleBack}
                    className="flex w-7 h-7 p-2 flex-col justify-center items-center gap-2 rounded-full bg-[#F1F2F4] hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft
                      size={16}
                      className="text-[#676879]"
                      strokeWidth={2}
                    />
                  </button>
                  <h1 className="text-[#172B4D] text-xl font-bold leading-[30px]">
                    New Template
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Template Cards */}
          <div className="flex p-4 items-start gap-6 w-full">
            {/* Standard Template Card */}
            <div className="flex flex-col items-start flex-1 rounded border border-[#DEDEDD] bg-white">
              <div className="flex flex-col items-start w-full">
                <div className="flex h-[66px] px-4 pt-4 items-center gap-2 w-full">
                  <Shield
                    size={36}
                    className="text-[#0073EA]"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex px-4 py-2 flex-col items-start gap-2 w-full">
                  <div className="flex justify-center items-center gap-2 w-full">
                    <h3 className="flex-1 text-[#172B4D] text-[15px] font-bold leading-6">
                      Standard
                    </h3>
                  </div>
                  <div className="flex items-center gap-[77px] w-full">
                    <div className="flex items-center gap-2 flex-1">
                      <p className="h-9 flex-1 text-[#505258] text-[13px] font-normal leading-[18px]">
                        Upload ID and take a selfie. System matches the selfie
                        with the ID photo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-3 justify-end items-center gap-2 w-full border-t border-[#DEDEDD]">
                <button
                  onClick={() => handlePreview("Standard")}
                  className="flex h-8 px-4 py-2.5 justify-center items-center gap-2.5 rounded border border-[#0073EA] bg-white hover:bg-blue-50 transition-colors"
                >
                  <span className="text-[#0073EA] text-[13px] font-medium">
                    Preview
                  </span>
                </button>
                <button
                  onClick={() => handleUseTemplate("Standard")}
                  className="flex h-8 px-4 py-2.5 justify-center items-center gap-2.5 rounded bg-[#0073EA] hover:bg-[#0061d1] transition-colors"
                >
                  <span className="text-white text-[13px] font-medium">
                    Use Template
                  </span>
                </button>
              </div>
            </div>

            {/* Secure Template Card */}
            <div className="flex h-[206px] flex-col items-start flex-1 rounded border border-[#DEDEDD] bg-white">
              <div className="flex flex-col items-start w-full">
                <div className="flex h-[66px] px-4 pt-4 items-center gap-2 w-full">
                  <Lock size={36} className="text-[#0073EA]" strokeWidth={2} />
                </div>
                <div className="flex h-[84px] px-4 py-2 flex-col items-start gap-2 w-full">
                  <div className="flex justify-center items-center gap-2 w-full">
                    <h3 className="flex-1 text-[#172B4D] text-[15px] font-bold leading-6">
                      Secure
                    </h3>
                  </div>
                  <div className="flex items-center gap-[77px] w-full">
                    <div className="flex items-center gap-2 flex-1">
                      <p className="h-9 flex-1 text-[#505258] text-[13px] font-normal leading-[18px]">
                        Upload ID and take a selfie. System matches the selfie
                        with the ID photo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-3 justify-end items-center gap-2 w-full border-t border-[#DEDEDD]">
                <button
                  onClick={() => handlePreview("Secure")}
                  className="flex h-8 px-4 py-2.5 justify-center items-center gap-2.5 rounded border border-[#0073EA] bg-white hover:bg-blue-50 transition-colors"
                >
                  <span className="text-[#0073EA] text-[13px] font-medium">
                    Preview
                  </span>
                </button>
                <button
                  onClick={() => handleUseTemplate("Secure")}
                  className="flex h-8 px-4 py-2.5 justify-center items-center gap-2.5 rounded bg-[#0073EA] hover:bg-[#0061d1] transition-colors"
                >
                  <span className="text-white text-[13px] font-medium">
                    Use Template
                  </span>
                </button>
              </div>
            </div>

            {/* Create Custom Template Card */}
            <div className="flex flex-col items-start flex-1 rounded border border-[#DEDEDD] bg-white">
              <div className="flex flex-col items-start w-full">
                <div className="flex h-[66px] px-4 pt-4 items-center gap-2 w-full"></div>
                <div className="flex px-4 py-2 flex-col items-start gap-2 w-full">
                  <div className="flex justify-center items-center gap-2 w-full">
                    <h3 className="flex-1 text-[#172B4D] text-[15px] font-bold leading-6">
                      Create your own template
                    </h3>
                  </div>
                  <div className="flex items-center gap-[77px] w-full">
                    <div className="flex items-center gap-2">
                      <p className="w-[258px] h-9 text-[#505258] text-[13px] font-normal leading-[18px]">
                        Personalize and create your own template
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-3 justify-end items-center gap-2 w-full border-t border-[#DEDEDD]">
                <button
                  onClick={handleCreateCustom}
                  className="flex h-8 px-3 py-2 justify-center items-center gap-1 rounded bg-[#0073EA] hover:bg-[#0061d1] transition-colors"
                >
                  <span className="text-white text-[13px] font-medium">
                    Create
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
