import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  ChevronDown,
  Eye,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BiometricVerification() {
  const navigate = useNavigate();

  const [biometricSettings, setBiometricSettings] = useState({
    maxRetries: "4",
    livenessHandling: "retry" as "retry" | "block",
    dataStorage: true,
    retentionPeriod: "6",
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handlePrevious = () => {
    navigate("/document-verification");
  };

  const handleNext = () => {
    // Save biometric verification data to localStorage
    localStorage.setItem(
      "biometricVerificationData",
      JSON.stringify({
        biometricSettings,
      }),
    );
    navigate("/preview");
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
                <div className="flex h-8 px-2 py-[9px] justify-center items-center gap-1 rounded bg-white">
                  <div className="w-4 h-4 border border-[#C3C6D4] rounded bg-white"></div>
                  <span className="text-[#505258] text-[13px] font-medium">
                    Mark As Complete
                  </span>
                </div>
                <button className="flex h-8 px-2 py-[9px] justify-center items-center gap-1 rounded border border-[#0073EA] bg-white">
                  <Eye size={16} className="text-[#0073EA]" />
                  <span className="text-[#0073EA] text-[13px] font-medium">
                    Preview
                  </span>
                </button>
                <button className="flex h-8 px-2 py-[9px] justify-center items-center gap-1 rounded border border-[#0073EA] bg-[#0073EA]">
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
                <span className="text-[#505258] text-[13px] font-medium">
                  Previous
                </span>
              </button>

              {/* Centered Progress Stepper */}
              <div className="flex justify-center items-center flex-1">
                <div className="flex items-center gap-2">
                  {/* Step 1 - Completed */}
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
                  <button
                    onClick={() => navigate("/form-builder")}
                    className="flex w-[308px] px-7 py-3 items-center gap-2 rounded bg-[#F6F7FB] hover:bg-[#E6F1FD] transition-colors cursor-pointer"
                  >
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
                  </button>
                  <button
                    onClick={() => navigate("/document-verification")}
                    className="flex w-[308px] px-7 py-3 items-center gap-2 rounded bg-[#F6F7FB] hover:bg-[#E6F1FD] transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col items-start gap-2 flex-1">
                      <div className="flex items-center gap-1 w-full">
                        <h4 className="flex-1 text-[#292F4C] text-sm font-bold leading-[13px]">
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
                  <div className="flex w-[308px] px-7 py-3 items-center gap-2 rounded bg-[#E6F1FD] border border-[#DEDEDD]">
                    <div className="flex flex-col items-start gap-2 flex-1">
                      <div className="flex items-center gap-1 w-full">
                        <h4 className="text-[#292F4C] text-sm font-bold leading-[13px]">
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
            <div className="flex w-[1018px] px-4 py-4 flex-col items-start gap-6 h-full bg-white overflow-y-auto">
              <div className="flex flex-col items-start gap-6 w-full">
                {/* Biometric Verification Accordion */}
                <div className="flex flex-col items-start w-full rounded border border-[#D0D4E4] bg-white">
                  {/* Accordion Header */}
                  <div className="flex px-2 py-3 flex-col justify-center items-start gap-2 w-full rounded-t">
                    <div className="flex items-center gap-2 w-full">
                      <Minus
                        size={18}
                        className="text-[#323238]"
                        strokeWidth={1.5}
                      />
                      <h2 className="text-[#172B4D] text-base font-bold leading-4">
                        Biometric Verification
                      </h2>
                    </div>
                    <div className="flex px-3 justify-center items-center gap-2.5 w-full ml-7">
                      <p className="flex-1 text-[#505258] text-[13px] font-normal leading-5">
                        Configure selfie capture retries, liveness score
                        thresholds, and biometric data storage.
                      </p>
                    </div>
                  </div>

                  {/* Accordion Body */}
                  <div className="flex px-9 py-6 flex-col items-start gap-6 w-full">
                    {/* Retry Attempts for Selfie Capture */}
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

                      <div className="flex px-6 py-6 flex-col items-start gap-5 w-full rounded bg-[#F6F7FB]">
                        <div className="flex flex-col items-start gap-2 w-full">
                          <label className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                            Set the maximum number of retries
                          </label>
                          <div className="relative w-80">
                            <select
                              value={biometricSettings.maxRetries}
                              onChange={(e) =>
                                setBiometricSettings((prev) => ({
                                  ...prev,
                                  maxRetries: e.target.value,
                                }))
                              }
                              className="flex h-8 px-3 w-full justify-between items-center rounded border border-[#C3C6D4] bg-white text-[#676879] text-[13px] appearance-none"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            <ChevronDown
                              size={10}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#676879] pointer-events-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Liveness Confidence Threshold */}
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

                      <div className="flex px-6 py-6 flex-col items-start gap-5 w-full rounded bg-[#F6F7FB]">
                        {/* Ask the user to try again */}
                        <div className="flex pb-5 flex-col items-start w-full border-b border-[#D0D4E4]">
                          <div className="flex items-start gap-2 w-full">
                            <input
                              type="radio"
                              name="livenessHandling"
                              checked={
                                biometricSettings.livenessHandling === "retry"
                              }
                              onChange={() =>
                                setBiometricSettings((prev) => ({
                                  ...prev,
                                  livenessHandling: "retry",
                                }))
                              }
                              className="w-[18px] h-[18px] border border-[#C3C6D4] rounded-full bg-white mt-1"
                            />
                            <div className="flex flex-col items-start gap-2 flex-1">
                              <h4 className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                                Ask the user to try again
                              </h4>
                              <p className="text-[#505258] text-[13px] leading-5">
                                Prompt the user to reattempt the selfie.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Block further attempts */}
                        <div className="flex items-start gap-2 w-full">
                          <input
                            type="radio"
                            name="livenessHandling"
                            checked={
                              biometricSettings.livenessHandling === "block"
                            }
                            onChange={() =>
                              setBiometricSettings((prev) => ({
                                ...prev,
                                livenessHandling: "block",
                              }))
                            }
                            className="w-[18px] h-[18px] border border-[#C3C6D4] rounded-full bg-white mt-1"
                          />
                          <div className="flex flex-col items-start gap-2 flex-1">
                            <h4 className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                              Block further attempts after allowed retries fail
                            </h4>
                            <p className="text-[#505258] text-[13px] leading-5">
                              Send submission for manual verification.
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

                      <div className="flex px-6 py-6 flex-col items-start gap-5 w-full rounded bg-[#F6F7FB]">
                        <div className="flex items-start gap-2 w-full mb-4">
                          <input
                            type="checkbox"
                            checked={biometricSettings.dataStorage}
                            onChange={(e) =>
                              setBiometricSettings((prev) => ({
                                ...prev,
                                dataStorage: e.target.checked,
                              }))
                            }
                            className="w-[18px] h-[18px] border border-[#C3C6D4] rounded bg-white mt-1"
                          />
                          <div className="flex flex-col items-start gap-2 flex-1">
                            <h4 className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                              Enable biometric data storage
                            </h4>
                          </div>
                        </div>

                        {biometricSettings.dataStorage && (
                          <div className="flex flex-col items-start gap-2 w-full">
                            <label className="text-[#172B4D] text-[13px] font-medium leading-[18px]">
                              Retention period
                            </label>
                            <div className="relative w-80">
                              <select
                                value={biometricSettings.retentionPeriod}
                                onChange={(e) =>
                                  setBiometricSettings((prev) => ({
                                    ...prev,
                                    retentionPeriod: e.target.value,
                                  }))
                                }
                                className="flex h-8 px-3 w-full justify-between items-center rounded border border-[#C3C6D4] bg-white text-[#676879] text-[13px] appearance-none"
                              >
                                <option value="6">6 Months</option>
                                <option value="8">8 Months</option>
                                <option value="12">12 Months</option>
                              </select>
                              <ChevronDown
                                size={10}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#676879] pointer-events-none"
                              />
                            </div>
                          </div>
                        )}
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
    </div>
  );
}
