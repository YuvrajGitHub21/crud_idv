import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FieldTypeSelector } from "../components/dashboard/FieldTypeSelector";

export default function FormBuilder() {
  const navigate = useNavigate();
  const [systemFields, setSystemFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [customFields, setCustomFields] = useState<
    Array<{
      id: number;
      label: string;
      type: string;
      required: boolean;
      value: string;
    }>
  >([]);
  const [fieldTypeSelectorOpen, setFieldTypeSelectorOpen] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [showSystemFieldWarning, setShowSystemFieldWarning] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePrevious = () => {
    navigate("/choose-template");
  };

  const handleNext = () => {
    // Save form data to localStorage
    localStorage.setItem(
      "formBuilderData",
      JSON.stringify({
        systemFields,
        customFields,
      }),
    );
    navigate("/document-verification");
  };

  const handleSystemFieldChange = (
    field: keyof typeof systemFields,
    value: string,
  ) => {
    setSystemFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addCustomField = () => {
    const newField = {
      id: Date.now(),
      label: "Custom Label",
      type: "Input",
      required: false,
      value: "",
    };
    setCustomFields([...customFields, newField]);
  };

  const removeCustomField = (id: number) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
  };

  const toggleRequired = (id: number) => {
    setCustomFields(
      customFields.map((field) =>
        field.id === id ? { ...field, required: !field.required } : field,
      ),
    );
  };

  const updateCustomField = (
    id: number,
    updates: Partial<(typeof customFields)[0]>,
  ) => {
    setCustomFields(
      customFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    );
  };

  const handleTypeDropdownClick = (
    fieldId: number,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    setSelectedFieldId(fieldId);
    setFieldTypeSelectorOpen(true);
  };

  const handleFieldTypeSelect = (type: string) => {
    if (selectedFieldId) {
      updateCustomField(selectedFieldId, { type });
    }
    setFieldTypeSelectorOpen(false);
    setSelectedFieldId(null);
  };

  const handleFieldTypeSelectorClose = () => {
    setFieldTypeSelectorOpen(false);
    setSelectedFieldId(null);
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
            </div>
          </div>

          {/* Steps */}
          <div className="flex w-full px-4 py-3 justify-between items-center border-b border-[#DEDEDD] bg-white">
            <div className="flex justify-between items-center flex-1">
              <button
                onClick={handlePrevious}
                className="flex justify-center items-center gap-1 rounded hover:bg-gray-50 transition-colors p-2"
              >
                <span className="text-[#505258] text-[13px] font-medium">
                  Previous
                </span>
              </button>

              {/* Centered Progress Stepper */}
              <div className="flex justify-center items-center flex-1">
                <div className="flex items-center gap-2">
                  {/* Step 1 - Active */}
                  <div className="flex flex-col justify-center items-center gap-1.5">
                    <div className="flex p-1.5 justify-center items-center gap-2 rounded-full border-2 border-[#0073EA]">
                      <div className="flex w-8 h-8 p-3 flex-col justify-center items-center gap-2 rounded-full bg-[#0073EA]">
                        <span className="text-white text-base font-bold leading-4">
                          1
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center items-start gap-2">
                      <span className="text-[#172B4D] text-[13px] font-medium">
                        Form builder
                      </span>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="w-[120px] h-px bg-[#D0D4E4]"></div>

                  {/* Step 2 - Inactive */}
                  <div className="flex flex-col justify-center items-center gap-1.5">
                    <div className="flex p-1.5 justify-center items-center gap-2 rounded-full">
                      <div className="flex w-8 h-8 p-3 flex-col justify-center items-center gap-2 rounded-full border border-[#D0D4E4] bg-white">
                        <span className="text-[#505258] text-base font-bold leading-4">
                          2
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center items-start gap-2">
                      <span className="text-[#505258] text-[13px] font-medium">
                        Preview
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="flex justify-center items-center gap-1 rounded hover:bg-gray-50 transition-colors p-2"
              >
                <span className="text-[#505258] text-[13px] font-medium">
                  Next
                </span>
                <ChevronRight
                  size={14}
                  className="text-[#676879]"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex h-[765px] items-start flex-shrink-0 w-full">
            {/* Sidebar */}
            <div className="flex w-[332px] px-4 py-4 flex-col items-start gap-2 rounded-lg bg-white">
              <div className="flex flex-col items-start gap-8 w-full">
                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="flex pb-2 justify-between items-center w-full">
                    <div className="flex flex-col justify-center items-start gap-2 flex-1">
                      <h3 className="text-[#292F4C] text-[15px] font-bold leading-3">
                        Build your process
                      </h3>
                      <p className="w-full text-[#505258] text-[13px] font-normal leading-5">
                        Create a flow by adding required information fields and
                        verification steps for your users.
                      </p>
                    </div>
                  </div>
                  <div className="flex w-[308px] px-7 py-3 items-center gap-2 rounded bg-[#E6F1FD]">
                    <div className="flex flex-col items-start gap-2 flex-1">
                      <div className="flex items-center gap-1 w-full">
                        <h4 className="flex-1 text-[#292F4C] text-sm font-bold leading-[13px]">
                          Personal Information
                        </h4>
                      </div>
                      <div className="flex justify-center items-center gap-2 w-full">
                        <p className="flex-1 text-[#505258] text-[13px] font-normal leading-[18px]">
                          Set up fields to collect basic user details like name,
                          contact.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="flex pb-2 justify-between items-center w-full">
                    <div className="flex flex-col justify-center items-start gap-2 flex-1">
                      <h3 className="text-[#292F4C] text-[15px] font-bold leading-3">
                        Add Verification Steps
                      </h3>
                      <p className="w-full text-[#505258] text-[13px] font-normal leading-5">
                        Insert secure verification steps as needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <button
                      onClick={() => navigate("/document-verification")}
                      className="flex w-[308px] px-7 py-3 items-center gap-2 rounded hover:bg-[#E6F1FD] transition-colors cursor-pointer"
                    >
                      <div className="flex w-[220px] flex-col items-start gap-2 flex-shrink-0">
                        <div className="flex w-[248px] items-center gap-1">
                          <h4 className="text-[#292F4C] text-sm font-bold leading-[13px]">
                            Document Verification
                          </h4>
                        </div>
                        <div className="flex justify-center items-center gap-2 w-full">
                          <p className="flex-1 text-[#505258] text-[13px] font-normal leading-[18px]">
                            Set ID submission rules and handling for unclear
                            files.
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className="flex w-[308px] px-7 py-3 items-center gap-2.5 rounded opacity-50">
                    <div className="flex flex-col items-start gap-2 flex-1">
                      <div className="flex items-center gap-1 w-full">
                        <h4 className="w-[248px] text-[#292F4C] text-sm font-bold leading-[13px]">
                          Biometric Verification
                        </h4>
                      </div>
                      <div className="flex justify-center items-center gap-2 w-full">
                        <p className="flex-1 text-[#505258] text-[13px] font-normal leading-[18px]">
                          Set selfie retries, liveness threshold, and biometric
                          storage
                        </p>
                      </div>
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
            <div className="flex w-[1018px] px-4 py-4 flex-col items-start gap-6 h-full bg-white">
              <div className="flex h-[749px] flex-col items-start gap-6 w-full">
                <div className="flex h-[679px] px-1 pb-1 flex-col items-start flex-shrink-0 w-full rounded">
                  {/* Personal Information Accordion */}
                  <div className="flex px-2 py-3 flex-col justify-center items-start gap-2 w-full rounded-t border border-[#D0D4E4] bg-white">
                    <div className="flex items-center gap-2 w-full">
                      <Minus
                        size={18}
                        className="text-[#323238]"
                        strokeWidth={1.5}
                      />
                      <h2 className="text-[#172B4D] text-base font-bold leading-4">
                        Personal Information
                      </h2>
                    </div>
                    <div className="flex px-3 justify-center items-center gap-2.5 w-full ml-7">
                      <p className="flex-1 text-[#505258] text-[13px] font-normal leading-5">
                        Set up fields to collect basic user details like name,
                        contact.
                      </p>
                    </div>
                  </div>

                  {/* Accordion Body */}
                  <div className="flex h-[609px] px-9 py-4 flex-col items-start gap-6 flex-shrink-0 w-full rounded-b border-r border-b border-l border-[#D0D4E4] bg-white">
                    <div className="flex w-[923px] flex-col items-start">
                      <div className="flex pb-4 flex-col items-start gap-2 w-full">
                        <div className="flex h-2.5 flex-col justify-center w-full text-[#172B4D] text-[15px] font-bold leading-3">
                          System-required Fields
                        </div>
                        <p className="w-full text-[#505258] text-[13px] font-normal leading-5">
                          The following fields are fixed and required in every
                          template. Continue adding your own fields below.
                        </p>
                      </div>

                      {/* Red Warning Alert - Show only when system fields are focused */}
                      {showSystemFieldWarning && (
                        <div className="flex w-full p-3 items-start gap-3 rounded bg-red-50 border border-red-200 mb-4">
                          <div className="flex w-5 h-5 flex-shrink-0 items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 1.33334C4.32 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 8 1.33334ZM7.33333 5.33334C7.33333 4.96001 7.62667 4.66668 8 4.66668C8.37333 4.66668 8.66667 4.96001 8.66667 5.33334V8.66668C8.66667 9.04001 8.37333 9.33334 8 9.33334C7.62667 9.33334 7.33333 9.04001 7.33333 8.66668V5.33334ZM8.66667 11.3333C8.66667 11.7067 8.37333 12 8 12C7.62667 12 7.33333 11.7067 7.33333 11.3333C7.33333 10.96 7.62667 10.6667 8 10.6667C8.37333 10.6667 8.66667 10.96 8.66667 11.3333Z"
                                fill="#DC2626"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-red-700 text-[13px] font-medium leading-4">
                              This field is system-required and cannot be
                              modified.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* System Required Fields */}
                      <div className="flex w-[923px] flex-col items-start gap-2">
                        {/* First Name */}
                        <div className="flex w-[923px] flex-col items-start gap-4">
                          <div className="flex flex-col items-start flex-shrink-0 w-full rounded-lg border border-[#D0D4E4] bg-white p-5">
                            <label className="text-[#323238] text-[13px] font-semibold leading-3 mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={systemFields.firstName}
                              onChange={(e) =>
                                handleSystemFieldChange(
                                  "firstName",
                                  e.target.value,
                                )
                              }
                              onFocus={() => setShowSystemFieldWarning(true)}
                              onBlur={() => setShowSystemFieldWarning(false)}
                              placeholder="Eg: jhon"
                              className="w-full h-10 px-3 text-[#323238] text-[13px] border border-[#D0D4E4] rounded focus:outline-none focus:ring-2 focus:ring-[#0073EA] focus:border-transparent placeholder:text-[#676879]"
                            />
                          </div>
                        </div>

                        {/* Last Name */}
                        <div className="flex w-[923px] flex-col items-start gap-4">
                          <div className="flex flex-col items-start flex-shrink-0 w-full rounded-lg border border-[#D0D4E4] bg-white p-5">
                            <label className="text-[#323238] text-[13px] font-semibold leading-3 mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={systemFields.lastName}
                              onChange={(e) =>
                                handleSystemFieldChange(
                                  "lastName",
                                  e.target.value,
                                )
                              }
                              onFocus={() => setShowSystemFieldWarning(true)}
                              onBlur={() => setShowSystemFieldWarning(false)}
                              placeholder="Eg: Wick"
                              className="w-full h-10 px-3 text-[#323238] text-[13px] border border-[#D0D4E4] rounded focus:outline-none focus:ring-2 focus:ring-[#0073EA] focus:border-transparent placeholder:text-[#676879]"
                            />
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="flex w-[923px] flex-col items-start gap-4">
                          <div className="flex flex-col items-start flex-shrink-0 w-full rounded-lg border border-[#D0D4E4] bg-white p-5">
                            <label className="text-[#323238] text-[13px] font-semibold leading-3 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={systemFields.email}
                              onChange={(e) =>
                                handleSystemFieldChange("email", e.target.value)
                              }
                              onFocus={() => setShowSystemFieldWarning(true)}
                              onBlur={() => setShowSystemFieldWarning(false)}
                              placeholder="Eg: jhonwick@email.com"
                              className="w-full h-10 px-3 text-[#323238] text-[13px] border border-[#D0D4E4] rounded focus:outline-none focus:ring-2 focus:ring-[#0073EA] focus:border-transparent placeholder:text-[#676879]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add More Fields Section */}
                    <div className="flex pt-2 flex-col items-start gap-6 w-full">
                      <div className="flex flex-col items-start w-full">
                        <div className="flex w-[923px] h-[54px] pb-4 flex-col items-start gap-2">
                          <div className="flex h-2.5 flex-col justify-center flex-shrink-0 w-full text-[#172B4D] text-[15px] font-bold leading-3">
                            Add More Fields
                          </div>
                          <p className="w-full text-[#505258] text-[13px] font-normal leading-5">
                            Add fields specific to your verification flow.
                          </p>
                        </div>

                        {/* Custom Fields */}
                        <div className="flex flex-col items-start gap-2 w-full">
                          {customFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="flex w-[923px] flex-col items-start gap-4"
                            >
                              <div className="flex flex-col items-start flex-shrink-0 w-full rounded-lg border border-[#D0D4E4] bg-white p-5 relative group">
                                {/* Delete button - appears on hover */}
                                <button
                                  onClick={() => removeCustomField(field.id)}
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex w-6 h-6 justify-center items-center rounded-full hover:bg-gray-100"
                                >
                                  <Trash2
                                    size={16}
                                    className="text-[#676879]"
                                    strokeWidth={1.5}
                                  />
                                </button>

                                {/* Field Label */}
                                <div className="flex items-center gap-2 mb-2 w-full">
                                  <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) =>
                                      updateCustomField(field.id, {
                                        label: e.target.value,
                                      })
                                    }
                                    className="text-[#323238] text-[13px] font-semibold leading-3 bg-transparent border-none outline-none flex-1"
                                    placeholder="Enter field name"
                                  />
                                  {field.required && (
                                    <span className="text-red-500 text-xs">
                                      *
                                    </span>
                                  )}
                                </div>

                                {/* Field Input */}
                                <input
                                  type="text"
                                  value={field.value}
                                  onChange={(e) =>
                                    updateCustomField(field.id, {
                                      value: e.target.value,
                                    })
                                  }
                                  placeholder={`Eg: Enter ${field.label.toLowerCase()}`}
                                  className="w-full h-10 px-3 text-[#323238] text-[13px] border border-[#D0D4E4] rounded focus:outline-none focus:ring-2 focus:ring-[#0073EA] focus:border-transparent placeholder:text-[#676879]"
                                />

                                {/* Field Options */}
                                <div className="flex items-center justify-between w-full mt-3 pt-3 border-t border-[#D0D4E4]">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#505258] text-xs">
                                      Type:
                                    </span>
                                    <button
                                      onClick={(e) =>
                                        handleTypeDropdownClick(field.id, e)
                                      }
                                      className="text-[#0073EA] text-xs hover:underline"
                                    >
                                      {field.type}
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#505258] text-xs">
                                      Required:
                                    </span>
                                    <button
                                      onClick={() => toggleRequired(field.id)}
                                      className={`flex w-5 p-0.5 items-center gap-1 rounded-full transition-colors ${
                                        field.required
                                          ? "bg-[#0073EA]"
                                          : "bg-[#A3ADBA]"
                                      }`}
                                    >
                                      <div
                                        className={`w-2 h-2 flex-shrink-0 rounded-full bg-white transition-transform ${
                                          field.required
                                            ? "translate-x-2"
                                            : "translate-x-0"
                                        }`}
                                      ></div>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Add Button */}
                          <div className="w-full flex justify-center mt-4">
                            <button
                              onClick={addCustomField}
                              className="w-[38px] h-[38px] rounded-full bg-[#0073EA] hover:bg-[#0061d1] transition-colors flex items-center justify-center"
                            >
                              <Plus
                                size={20}
                                className="text-white"
                                strokeWidth={2}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex w-full justify-end px-4 py-6 border-t border-[#DEDEDD] bg-white mt-auto">
                <button
                  onClick={handleNext}
                  className="flex h-10 px-6 py-3 justify-center items-center gap-2 rounded bg-[#0073EA] hover:bg-[#005BB5] transition-colors"
                >
                  <span className="text-white text-sm font-medium">
                    Continue
                  </span>
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Field Type Selector */}
      <FieldTypeSelector
        isOpen={fieldTypeSelectorOpen}
        onClose={handleFieldTypeSelectorClose}
        onSelect={handleFieldTypeSelect}
      />
    </div>
  );
}
