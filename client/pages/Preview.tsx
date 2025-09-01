import React, { useState, useEffect } from "react";
import { ChevronLeft, Minus, Eye, Save, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../components/ui/SuccessModal";
import { NameTemplateModal } from "../components/dashboard/NameTemplateModal";
import { SendInviteModal } from "../components/dashboard/SendInviteModal";

export default function Preview() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<"admin" | "receiver">("admin");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNameTemplateModal, setShowNameTemplateModal] = useState(false);
  const [showSendInviteModal, setShowSendInviteModal] = useState(false);

  // User configuration data
  const [formData, setFormData] = useState({
    systemFields: { firstName: "", lastName: "", email: "" },
    customFields: [],
    uploadOptions: {
      allowUploadFromDevice: false,
      allowCaptureViaWebcam: false,
    },
    documentHandling: "reject" as "reject" | "retry",
    countries: [],
    biometricSettings: {
      maxRetries: "4",
      livenessHandling: "retry" as "retry" | "block",
      dataStorage: true,
      retentionPeriod: "6",
    },
  });

  useEffect(() => {
    // Load user data from localStorage if available
    const savedFormData = localStorage.getItem("formBuilderData");
    const savedDocumentData = localStorage.getItem("documentVerificationData");
    const savedBiometricData = localStorage.getItem(
      "biometricVerificationData",
    );

    if (savedFormData || savedDocumentData || savedBiometricData) {
      setFormData((prev) => ({
        ...prev,
        ...(savedFormData ? JSON.parse(savedFormData) : {}),
        ...(savedDocumentData ? JSON.parse(savedDocumentData) : {}),
        ...(savedBiometricData ? JSON.parse(savedBiometricData) : {}),
      }));
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePrevious = () => {
    navigate("/biometric-verification");
  };

  const handleSave = () => {
    // Show the naming modal instead of saving directly
    setShowNameTemplateModal(true);
  };

  const handleSaveWithName = (templateName: string) => {
    // Save the template to localStorage with the provided name
    const templateData = {
      id: Date.now(),
      name: templateName,
      ...formData,
      createdDate: new Date().toLocaleDateString("en-GB"),
      createdBy: "Current User",
      status: "Completed" as const,
      lastUpdated: new Date().toLocaleDateString("en-GB"),
      invitees: [
        { initials: "CU", color: "avatar-1" },
        { initials: "+0", color: "grey-bg" },
      ],
    };

    // Save to localStorage
    const existingTemplates = JSON.parse(
      localStorage.getItem("savedTemplates") || "[]",
    );
    existingTemplates.unshift(templateData);
    localStorage.setItem("savedTemplates", JSON.stringify(existingTemplates));

    // Close naming modal and show success modal
    setShowNameTemplateModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Navigate to home page (dashboard) after closing modal
    navigate("/");
  };

  const handleSaveAndSendInvite = () => {
    setShowSendInviteModal(true);
  };

  const handleInviteSuccess = () => {
    // Also save the template when invite is sent
    const templateData = {
      id: Date.now(),
      name: "New Template", // You could also integrate with naming modal here
      ...formData,
      createdDate: new Date().toLocaleDateString("en-GB"),
      createdBy: "Current User",
      status: "Completed" as const,
      lastUpdated: new Date().toLocaleDateString("en-GB"),
      invitees: [
        { initials: "CU", color: "avatar-1" },
        { initials: "+0", color: "grey-bg" },
      ],
    };

    // Save to localStorage
    const existingTemplates = JSON.parse(
      localStorage.getItem("savedTemplates") || "[]",
    );
    existingTemplates.unshift(templateData);
    localStorage.setItem("savedTemplates", JSON.stringify(existingTemplates));

    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="flex flex-col items-start bg-white h-screen">
      {/* Header */}
      <div className="flex w-full h-11 px-4 justify-between items-center flex-shrink-0 border-b border-[#DEDEDD] bg-white">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/4566b1e4f2b69299156b1f1c61472e06e0ad9666?width=180"
          alt="Logo"
          className="w-[90px] h-7 flex-shrink-0"
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
      <div className="flex h-[934px] items-start flex-shrink-0 w-full bg-white">
        <div className="flex h-[934px] flex-col items-start flex-1 bg-white">
          {/* Sub Header */}
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
            <div className="flex h-12 px-4 py-2 justify-between items-center w-full">
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
              <div className="flex items-center gap-1">
                <button
                  onClick={handleSaveAndSendInvite}
                  className="flex h-8 px-2 py-[9px] justify-center items-center gap-1 rounded border border-[#0073EA] bg-white hover:bg-[#F6F7FB] transition-colors"
                >
                  <Send size={16} className="text-[#0073EA]" />
                  <span className="text-[#0073EA] text-[13px] font-medium">
                    Save & Send Invite
                  </span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex h-8 px-2 py-[9px] justify-center items-center gap-1 rounded border border-[#0073EA] bg-[#0073EA] hover:bg-[#005BB5] transition-colors"
                >
                  <Save size={16} className="text-white" />
                  <span className="text-white text-[13px] font-medium">
                    Save
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="flex w-full px-4 py-3 justify-between items-center border-b border-[#DEDEDD] bg-white">
            <div className="flex justify-between items-center flex-1">
              <button
                onClick={handlePrevious}
                className="flex justify-center items-center gap-1 rounded hover:bg-gray-50 transition-colors p-2"
              >
                <ChevronLeft size={16} className="text-[#676879]" />
                <span className="text-[#505258] text-[13px] font-medium">
                  Previous
                </span>
              </button>

              {/* Centered Progress Stepper */}
              <div className="flex justify-center items-center flex-1">
                <div className="flex items-center gap-2">
                  {/* Step 1 - Completed */}
                  <div className="flex flex-col justify-center items-center gap-1.5">
                    <div className="flex p-1.5 justify-center items-center gap-2 rounded-full border-2 border-[#258750]">
                      <div className="flex w-8 h-8 p-3 flex-col justify-center items-center gap-2 rounded-full bg-[#258750]">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.16241 11.2116L13.438 4.93608C13.6089 4.76515 13.8117 4.67969 14.0463 4.67969C14.281 4.67969 14.4837 4.76515 14.6547 4.93608C14.8256 5.107 14.9111 5.30979 14.9111 5.54444C14.9111 5.77908 14.8256 5.98186 14.6547 6.15278L7.76363 13.0438C7.59271 13.2147 7.3923 13.3002 7.16241 13.3002C6.93253 13.3002 6.73212 13.2147 6.5612 13.0438L3.34516 9.82778C3.17423 9.65686 3.09115 9.45408 3.0959 9.21944C3.10066 8.98479 3.1885 8.782 3.35943 8.61108C3.53035 8.44015 3.73314 8.35469 3.96779 8.35469C4.20243 8.35469 4.40521 8.44015 4.57613 8.61108L7.16241 11.2116Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-center items-start gap-2">
                      <span className="text-[#172B4D] text-[13px] font-medium">
                        Form builder
                      </span>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="w-[120px] h-px bg-[#DEDEDD]"></div>

                  {/* Step 2 - Active */}
                  <div className="flex flex-col justify-center items-center gap-1.5">
                    <div className="flex p-1.5 justify-center items-center gap-2 rounded-full border-2 border-[#0073EA]">
                      <div className="flex w-8 h-8 p-3 flex-col justify-center items-center gap-2 rounded-full bg-[#0073EA]">
                        <span className="text-white text-base font-bold leading-4">
                          2
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center items-start gap-2">
                      <span className="text-[#172B4D] text-[13px] font-medium">
                        Preview
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-1 rounded p-2 opacity-50">
                <span className="text-[#505258] text-[13px] font-medium">
                  Next
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex h-[765px] items-start flex-shrink-0 w-full">
            {/* Sidebar */}
            <div className="flex w-[332px] px-4 py-4 flex-col items-start gap-2 rounded-lg bg-white">
              <div className="flex flex-col items-start gap-4 w-full">
                <button
                  onClick={() => setCurrentView("admin")}
                  className={`flex w-[308px] px-7 py-3 items-center gap-2 rounded transition-colors ${
                    currentView === "admin"
                      ? "bg-[#E6F1FD]"
                      : "bg-white hover:bg-[#F6F7FB]"
                  }`}
                >
                  <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="flex items-center gap-1 w-full">
                      <h4 className="text-[#292F4C] text-sm font-bold leading-[13px]">
                        Admin View
                      </h4>
                    </div>
                    <div className="flex justify-center items-center gap-2 w-full">
                      <p className="flex-1 text-[#505258] text-[13px] font-normal leading-[18px]">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                  </div>
                </button>
                <div className="flex w-[308px] px-7 py-3 items-center gap-2 rounded opacity-50">
                  <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="flex items-center gap-1 w-full">
                      <h4 className="text-[#292F4C] text-sm font-bold leading-[13px]">
                        Receiver's View
                      </h4>
                    </div>
                    <div className="flex justify-center items-center gap-2 w-full">
                      <p className="flex-1 text-[#505258] text-[13px] font-normal leading-[18px]">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resize Handle */}
            <div className="flex w-4 flex-col items-center gap-2.5 h-full bg-white">
              <div className="flex w-px px-1 flex-col items-start gap-2.5 flex-1 bg-[#DEDEDD]"></div>
            </div>

            {/* Main Content Area */}
            <div className="flex w-[1018px] px-6 py-4 flex-col items-center gap-6 h-full bg-white overflow-y-auto">
              <div className="flex flex-col items-start gap-4 w-full max-w-[987px]">
                {/* Personal Information Section */}
                <div className="flex flex-col items-start w-full rounded border border-[#DEDEDD] bg-white">
                  <div className="flex px-2 py-4 items-center gap-2 w-full">
                    <Minus
                      size={18}
                      className="text-[#323238]"
                      strokeWidth={1.5}
                    />
                    <h2 className="text-[#172B4D] text-base font-bold leading-3">
                      Personal Information
                    </h2>
                  </div>
                  <div className="flex px-3 items-center gap-2.5 w-full ml-7 pb-1">
                    <p className="flex-1 text-[#172B4D] text-[13px] font-normal leading-5">
                      Please provide your basic personal information to begin
                      the identity verification process.
                    </p>
                  </div>

                  <div className="flex px-9 py-5 flex-col items-start w-full border-t border-[#DEDEDD] bg-white">
                    <div className="flex flex-col items-start gap-6 w-full">
                      {/* System Fields Row */}
                      <div className="flex items-start gap-6 w-full">
                        <div className="flex flex-col items-start gap-2 flex-1">
                          <label className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                            First Name
                          </label>
                          <div className="flex h-[38px] px-3 items-center w-full rounded border border-[#C3C6D4] bg-white">
                            <span className="text-[#676879] text-[13px]">
                              {formData.systemFields?.firstName || "Input"}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 flex-1">
                          <label className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                            Last Name
                          </label>
                          <div className="flex h-[38px] px-3 items-center w-full rounded border border-[#C3C6D4] bg-white">
                            <span className="text-[#676879] text-[13px]">
                              {formData.systemFields?.lastName || "Input"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-6 w-full">
                        <div className="flex flex-col items-start gap-2 flex-1">
                          <label className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                            Email
                          </label>
                          <div className="flex h-[38px] px-3 items-center w-full rounded border border-[#C3C6D4] bg-white">
                            <span className="text-[#676879] text-[13px]">
                              {formData.systemFields?.email || "Input"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Custom Fields */}
                      {formData.customFields &&
                        formData.customFields.length > 0 && (
                          <div className="flex flex-col items-start gap-4 w-full">
                            {formData.customFields.map(
                              (field: any, index: number) => (
                                <div
                                  key={field.id || index}
                                  className="flex flex-col items-start gap-2 w-full"
                                >
                                  <label className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                                    {field.label}
                                    {field.required && (
                                      <span className="text-red-500 ml-1">
                                        *
                                      </span>
                                    )}
                                  </label>
                                  <div className="flex h-[38px] px-3 items-center w-full rounded border border-[#C3C6D4] bg-white">
                                    <span className="text-[#676879] text-[13px]">
                                      {field.value || `${field.type} input`}
                                    </span>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Document Verification Section */}
                <div className="flex flex-col items-start w-full rounded border border-[#DEDEDD] bg-white">
                  <div className="flex px-3 py-3 items-center gap-2 w-full">
                    <h2 className="text-[#172B4D] text-base font-bold leading-3">
                      Document Verification
                    </h2>
                  </div>
                  <div className="flex px-3 items-center gap-2.5 w-full ml-7 pb-1">
                    <p className="flex-1 text-[#172B4D] text-[13px] font-normal leading-5">
                      Choose a valid government-issued ID (like a passport,
                      driver's license, or national ID) and upload a clear photo
                      of it.
                    </p>
                  </div>

                  <div className="flex px-9 py-4 flex-col items-start gap-6 w-full border-t border-[#DEDEDD] bg-white">
                    {/* User Upload Options */}
                    <div className="flex flex-col items-start gap-4 w-full">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <h3 className="text-[#172B4D] text-base font-bold leading-3">
                          User Upload Options
                        </h3>
                        <p className="text-[#172B4D] text-[13px] leading-5">
                          Select how users are allowed to submit documents
                          during the process.
                        </p>
                      </div>

                      <div className="flex px-6 py-5 flex-col items-start gap-5 w-full rounded bg-[#F6F7FB]">
                        {formData.uploadOptions?.allowUploadFromDevice && (
                          <div className="flex items-start gap-2 w-full pb-5 border-b border-[#D0D4E4]">
                            <div className="flex w-[18px] h-[18px] items-center justify-center rounded-full bg-[#258750]">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M4.96526 7.24452L8.49526 3.71453C8.5914 3.61839 8.70547 3.57031 8.83745 3.57031C8.96944 3.57031 9.08351 3.61839 9.17965 3.71453C9.2758 3.81068 9.32387 3.92474 9.32387 4.05673C9.32387 4.18872 9.2758 4.30278 9.17965 4.39893L5.30345 8.27514C5.2073 8.37128 5.09457 8.41935 4.96526 8.41935C4.83595 8.41935 4.72322 8.37128 4.62707 8.27514L2.81805 6.46612C2.72191 6.36997 2.67517 6.25591 2.67784 6.12392C2.68052 5.99193 2.72993 5.87786 2.82608 5.78172C2.92222 5.68557 3.03629 5.6375 3.16828 5.6375C3.30027 5.6375 3.41433 5.68557 3.51048 5.78172L4.96526 7.24452Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col items-start gap-2 flex-1">
                              <h4 className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                                Allow Upload from Device
                              </h4>
                              <p className="text-[#505258] text-[13px] leading-5">
                                Let users upload existing documents directly
                                from their device.
                              </p>
                            </div>
                          </div>
                        )}

                        {formData.uploadOptions?.allowCaptureViaWebcam && (
                          <div className="flex items-start gap-2 w-full">
                            <div className="flex w-[18px] h-[18px] items-center justify-center rounded-full bg-[#258750]">
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M4.96526 7.24452L8.49526 3.71453C8.5914 3.61839 8.70547 3.57031 8.83745 3.57031C8.96944 3.57031 9.08351 3.61839 9.17965 3.71453C9.2758 3.81068 9.32387 3.92474 9.32387 4.05673C9.32387 4.18872 9.2758 4.30278 9.17965 4.39893L5.30345 8.27514C5.2073 8.37128 5.09457 8.41935 4.96526 8.41935C4.83595 8.41935 4.72322 8.37128 4.62707 8.27514L2.81805 6.46612C2.72191 6.36997 2.67517 6.25591 2.67784 6.12392C2.68052 5.99193 2.72993 5.87786 2.82608 5.78172C2.92222 5.68557 3.03629 5.6375 3.16828 5.6375C3.30027 5.6375 3.41433 5.68557 3.51048 5.78172L4.96526 7.24452Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col items-start gap-2 flex-1">
                              <h4 className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                                Allow Capture via Webcam
                              </h4>
                              <p className="text-[#505258] text-[13px] leading-5">
                                Enable webcam access to allow users to capture
                                documents in real time.
                              </p>
                            </div>
                          </div>
                        )}

                        {!formData.uploadOptions?.allowUploadFromDevice &&
                          !formData.uploadOptions?.allowCaptureViaWebcam && (
                            <div className="text-[#676879] text-[13px] italic">
                              No upload options selected
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Unreadable Document Handling */}
                    <div className="flex flex-col items-start gap-4 w-full">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <h3 className="text-[#172B4D] text-base font-bold leading-3">
                          Unreadable Document Handling
                        </h3>
                        <p className="text-[#172B4D] text-[13px] leading-5">
                          Choose what action the system should take if a
                          submitted document is not clear or unreadable.
                        </p>
                      </div>

                      <div className="flex px-6 py-5 flex-col items-start gap-5 w-full rounded bg-[#F6F7FB]">
                        <div className="flex items-start gap-2 w-full">
                          <div className="flex w-[18px] h-[18px] items-center justify-center rounded-full bg-[#258750]">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M4.96526 7.24452L8.49526 3.71453C8.5914 3.61839 8.70547 3.57031 8.83745 3.57031C8.96944 3.57031 9.08351 3.61839 9.17965 3.71453C9.2758 3.81068 9.32387 3.92474 9.32387 4.05673C9.32387 4.18872 9.2758 4.30278 9.17965 4.39893L5.30345 8.27514C5.2073 8.37128 5.09457 8.41935 4.96526 8.41935C4.83595 8.41935 4.72322 8.37128 4.62707 8.27514L2.81805 6.46612C2.72191 6.36997 2.67517 6.25591 2.67784 6.12392C2.68052 5.99193 2.72993 5.87786 2.82608 5.78172C2.92222 5.68557 3.03629 5.6375 3.16828 5.6375C3.30027 5.6375 3.41433 5.68557 3.51048 5.78172L4.96526 7.24452Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col items-start gap-2 flex-1">
                            <h4 className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                              {formData.documentHandling === "retry"
                                ? "Allow Retries Before Rejection"
                                : "Reject Immediately"}
                            </h4>
                            <p className="text-[#505258] text-[13px] leading-5">
                              {formData.documentHandling === "retry"
                                ? "Let users reattempt uploading the document before it's finally rejected."
                                : "Skip retry and reject unclear documents without further attempts."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Supported Countries */}
                    <div className="flex flex-col items-start gap-4 w-full">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <h3 className="text-[#172B4D] text-base font-bold leading-3">
                          Supported Countries for Identity Verification
                        </h3>
                        <p className="text-[#172B4D] text-[13px] leading-5">
                          Only document from these countries are supported.
                        </p>
                      </div>

                      <div className="flex px-6 py-6 flex-col items-start gap-2 w-full rounded bg-[#F6F7FB]">
                        <div className="flex flex-col items-start gap-2 w-full">
                          <label className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                            Which countries are supported?
                          </label>
                        </div>

                        {formData.countries && formData.countries.length > 0 ? (
                          formData.countries.map((country: any) => (
                            <div
                              key={country.id}
                              className="flex px-3 py-3 flex-col items-start w-full rounded bg-white"
                            >
                              <div className="flex h-[42px] items-center gap-6 w-full">
                                <h4 className="text-black text-sm font-medium">
                                  {country.name}
                                </h4>
                              </div>

                              <div className="flex px-3 py-3 items-start content-start gap-2 flex-wrap w-full rounded bg-white">
                                {country.documentTypes
                                  ?.filter((doc: any) => doc.selected)
                                  .map((docType: any) => (
                                    <div
                                      key={docType.id}
                                      className="flex h-8 px-2 justify-center items-center gap-2 rounded-full border border-[#C3C6D4] bg-[#FEFEFE]"
                                    >
                                      <div className="flex w-5 h-5 items-center justify-center rounded-full bg-[#258750]">
                                        <svg
                                          width="11"
                                          height="11"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                        >
                                          <path
                                            d="M4.85224 7.37932L8.77446 3.45712C8.88129 3.35029 9.00803 3.29688 9.15468 3.29688C9.30133 3.29688 9.42807 3.35029 9.5349 3.45712C9.64173 3.56395 9.69514 3.69069 9.69514 3.83734C9.69514 3.98399 9.64173 4.11073 9.5349 4.21756L5.228 8.52446C5.12118 8.63129 4.99592 8.6847 4.85224 8.6847C4.70856 8.6847 4.58331 8.63129 4.47648 8.52446L2.46646 6.51443C2.35963 6.40761 2.3077 6.28087 2.31067 6.13422C2.31364 5.98756 2.36855 5.86082 2.47537 5.75399C2.5822 5.64716 2.70894 5.59375 2.8556 5.59375C3.00225 5.59375 3.12899 5.64716 3.23582 5.75399L4.85224 7.37932Z"
                                            fill="white"
                                          />
                                        </svg>
                                      </div>
                                      <span className="text-[#505258] text-[13px] font-medium">
                                        {docType.name}
                                      </span>
                                    </div>
                                  ))}
                                {!country.documentTypes?.some(
                                  (doc: any) => doc.selected,
                                ) && (
                                  <div className="text-[#676879] text-[13px] italic">
                                    No document types selected
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex px-3 py-3 w-full rounded bg-white">
                            <div className="text-[#676879] text-[13px] italic">
                              No countries selected
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biometric Verification Section */}
                <div className="flex flex-col items-start w-full rounded border border-[#DEDEDD] bg-white">
                  <div className="flex px-3 py-3 items-center gap-2 w-full">
                    <h2 className="text-[#172B4D] text-base font-bold leading-3">
                      Biometric Verification
                    </h2>
                  </div>
                  <div className="flex px-3 items-center gap-2.5 w-full ml-7 pb-1">
                    <p className="flex-1 text-[#172B4D] text-[13px] font-normal leading-5">
                      Take a live selfie to confirm you are the person in the ID
                      document. Make sure you're in a well-lit area and your
                      face is clearly visible.
                    </p>
                  </div>

                  <div className="flex px-4 py-4 flex-col items-start gap-6 w-full border-t border-[#DEDEDD] bg-white">
                    {/* Retry Attempts */}
                    <div className="flex flex-col items-start gap-4 w-full">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <h3 className="text-[#172B4D] text-base font-bold leading-3">
                          Retry Attempts for Selfie Capture
                        </h3>
                        <p className="text-[#172B4D] text-[13px] leading-5">
                          Define how many times a user can retry if the selfie
                          capture fails.
                        </p>
                      </div>

                      <div className="flex px-6 py-5 flex-col items-start gap-2 w-full rounded bg-[#F6F7FB]">
                        <div className="flex items-center gap-2 w-full">
                          <label className="text-[#172B4D] text-[13px] font-medium leading-[18px] flex-1">
                            Set the maximum number of retries
                          </label>
                          <div className="flex h-8 px-3 w-80 items-center rounded border border-[#C3C6D4] bg-[#F6F7FB]">
                            <span className="text-[#676879] text-[13px]">
                              {formData.biometricSettings?.maxRetries || "4"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Liveness Confidence */}
                    <div className="flex flex-col items-start gap-4 w-full">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <h3 className="text-[#172B4D] text-base font-bold leading-3">
                          Liveness Confidence Threshold (%)
                        </h3>
                        <p className="text-[#172B4D] text-[13px] leading-5">
                          Choose what should happen if a user's liveness score
                          does not meet the required threshold.
                        </p>
                      </div>

                      <div className="flex px-6 py-5 flex-col items-start gap-5 w-full rounded bg-[#F6F7FB]">
                        <div className="flex items-start gap-2 w-full">
                          <div className="flex w-[18px] h-[18px] items-center justify-center rounded-full bg-[#258750]">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M4.96526 7.24452L8.49526 3.71453C8.5914 3.61839 8.70547 3.57031 8.83745 3.57031C8.96944 3.57031 9.08351 3.61839 9.17965 3.71453C9.2758 3.81068 9.32387 3.92474 9.32387 4.05673C9.32387 4.18872 9.2758 4.30278 9.17965 4.39893L5.30345 8.27514C5.2073 8.37128 5.09457 8.41935 4.96526 8.41935C4.83595 8.41935 4.72322 8.37128 4.62707 8.27514L2.81805 6.46612C2.72191 6.36997 2.67517 6.25591 2.67784 6.12392C2.68052 5.99193 2.72993 5.87786 2.82608 5.78172C2.92222 5.68557 3.03629 5.6375 3.16828 5.6375C3.30027 5.6375 3.41433 5.68557 3.51048 5.78172L4.96526 7.24452Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col items-start gap-2 flex-1">
                            <h4 className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                              {formData.biometricSettings?.livenessHandling ===
                              "retry"
                                ? "Ask the user to try again"
                                : "Block further attempts after allowed retries fail"}
                            </h4>
                            <p className="text-[#505258] text-[13px] leading-5">
                              {formData.biometricSettings?.livenessHandling ===
                              "retry"
                                ? "Prompt the user to reattempt the selfie."
                                : "Send submission for manual verification."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Biometric Data Retention */}
                    <div className="flex flex-col items-start gap-4 w-full">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <h3 className="text-[#172B4D] text-base font-bold leading-3">
                          Biometric Data Retention
                        </h3>
                        <p className="text-[#172B4D] text-[13px] leading-5">
                          Choose whether to store biometric/selfie data and
                          define retention duration.
                        </p>
                      </div>

                      <div className="flex px-6 py-5 flex-col items-start gap-2 w-full rounded bg-[#F6F7FB]">
                        {formData.biometricSettings?.dataStorage ? (
                          <div className="flex items-center gap-2 w-full">
                            <label className="text-[#172B4D] text-[13px] font-medium leading-[18px] flex-1">
                              Enable biometric data storage
                            </label>
                            <div className="flex h-8 px-3 w-80 items-center rounded border border-[#C3C6D4]">
                              <span className="text-[#676879] text-[13px]">
                                {formData.biometricSettings?.retentionPeriod ||
                                  "6"}{" "}
                                Months
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-[#676879] text-[13px] italic">
                            Biometric data storage disabled
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title='Template has been saved successfully.'
        message="Now invite users using this saved template."
      />

      {/* Name Template Modal */}
      <NameTemplateModal
        isOpen={showNameTemplateModal}
        onClose={() => setShowNameTemplateModal(false)}
        onSave={handleSaveWithName}
        shouldNavigate={false}
      />

      {/* Send Invite Modal */}
      <SendInviteModal
        isOpen={showSendInviteModal}
        onClose={() => setShowSendInviteModal(false)}
        onSuccess={handleInviteSuccess}
      />
    </div>
  );
}
