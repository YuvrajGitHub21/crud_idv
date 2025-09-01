import React, { useState } from "react";
import { X, Search, Filter, Download, Upload, CheckCircle } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatar: string;
  selected: boolean;
}

interface SendInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const employees: Employee[] = [
  { id: "1", name: "Roger G. Rhone", email: "RogerGRhone@teleworm.us", initials: "OP", avatar: "avatar-1", selected: true },
  { id: "2", name: "Mike J. Torres", email: "MikeJTorres@rhyta.com", initials: "MT", avatar: "avatar-2", selected: false },
  { id: "3", name: "Wanda C. Moore", email: "WandaCMoore@dayrep.com", initials: "WM", avatar: "avatar-3", selected: false },
  { id: "4", name: "Roy C. Kephart", email: "RoyCKephart@dayrep.com", initials: "RK", avatar: "avatar-4", selected: true },
  { id: "5", name: "Lois S. Spencer", email: "LoisSSpencer@rhyta.com", initials: "LS", avatar: "avatar-5", selected: false },
  { id: "6", name: "Jerry T. Beavers", email: "JerryTBeavers@teleworm.us", initials: "JB", avatar: "avatar-6", selected: false },
];

const departments = [
  "Human Resources",
  "Finance", 
  "Marketing",
  "Sales",
  "Customer Support",
  "IT & Security",
  "Legal",
  "Operations"
];

export function SendInviteModal({ isOpen, onClose, onSuccess }: SendInviteModalProps) {
  const [activeTab, setActiveTab] = useState<"select" | "bulk">("select");
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>(employees);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  if (!isOpen) return null;

  const selectedCount = selectedEmployees.filter(emp => emp.selected).length;
  const filteredEmployees = selectedEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmployeeToggle = (id: string) => {
    setSelectedEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, selected: !emp.selected } : emp
    ));
  };

  const handleSelectAll = () => {
    const allSelected = filteredEmployees.every(emp => emp.selected);
    setSelectedEmployees(prev => prev.map(emp => {
      if (filteredEmployees.find(filtered => filtered.id === emp.id)) {
        return { ...emp, selected: !allSelected };
      }
      return emp;
    }));
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 50) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleSendInvite = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      onSuccess?.();
    }, 2000);
  };

  const renderSuccessState = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="flex w-[540px] p-6 items-center gap-4 rounded-lg bg-white shadow-xl">
        <div className="flex w-12 h-12 p-3 justify-center items-center flex-shrink-0 rounded-full border-8 border-[#ECFDF3] bg-[#D1FADF]">
          <CheckCircle size={24} className="text-[#039855]" />
        </div>
        <div className="flex flex-col items-start gap-7 flex-1">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <h2 className="self-stretch text-[#323238] text-base font-bold leading-[26px]">
              Invite has been sent
            </h2>
          </div>
        </div>
        <button
          onClick={() => setShowSuccess(false)}
          className="flex w-8 h-8 justify-center items-center gap-2.5 flex-shrink-0 rounded-full bg-white hover:bg-gray-50 transition-colors"
        >
          <X size={20} className="text-[#676879]" />
        </button>
      </div>
    </div>
  );

  if (showSuccess) {
    return renderSuccessState();
  }

  const renderDepartmentFilter = () => (
    <div className="absolute top-12 right-0 w-[250px] bg-white rounded border shadow-lg z-10 p-2">
      {departments.map((dept, index) => (
        <div key={index} className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded">
          <div className="w-4 h-4 border border-[#C3C6D4] rounded bg-white"></div>
          <span className="text-sm text-[#676879]">{dept}</span>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="flex w-[800px] h-[640px] flex-col bg-white rounded-lg shadow-xl">
          
          {/* Header */}
          <div className="flex h-[52px] px-5 py-2.5 justify-between items-center border-b border-[#D0D4E4] bg-white rounded-t-lg">
            <h2 className="text-[#323238] text-lg font-bold leading-[26px]">Send Invite</h2>
            <button
              onClick={onClose}
              className="flex w-8 h-8 justify-center items-center gap-2.5 rounded-full bg-white hover:bg-gray-50 transition-colors"
            >
              <X size={20} className="text-[#676879]" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex h-[42px] items-start gap-2 border-b border-[#D0D4E4] px-5">
            <button
              onClick={() => setActiveTab("select")}
              className={`flex h-[42px] px-2 py-2 justify-center items-center gap-1.5 ${
                activeTab === "select" ? "border-b-2 border-[#0073EA]" : ""
              }`}
            >
              <span className={`text-sm font-normal ${
                activeTab === "select" ? "text-[#172B4D]" : "text-[#505258]"
              }`}>
                Select Invitees
              </span>
            </button>
            <button
              onClick={() => setActiveTab("bulk")}
              className={`flex h-[42px] px-2 py-2 justify-center items-center gap-1.5 ${
                activeTab === "bulk" ? "border-b-2 border-[#0073EA]" : ""
              }`}
            >
              <span className={`text-sm font-normal ${
                activeTab === "bulk" ? "text-[#172B4D]" : "text-[#505258]"
              }`}>
                Send Bulk Invitation
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 overflow-hidden">
            {activeTab === "select" ? (
              <div className="h-full flex flex-col gap-4">
                {/* Search and Filter */}
                <div className="flex h-[42px] px-3 items-center gap-2 rounded border border-[#C3C6D4] bg-white">
                  <Search size={18} className="text-[#676879]" />
                  <input
                    type="text"
                    placeholder="Search email address, name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-sm text-[#172B4D] placeholder:text-[#676879] bg-transparent outline-none"
                  />
                  <div className="relative">
                    <button
                      onClick={() => setShowDepartmentFilter(!showDepartmentFilter)}
                      className="flex items-center gap-1 px-2 py-2 rounded bg-white hover:bg-gray-50"
                    >
                      <Filter size={16} className="text-[#676879]" />
                      <span className="text-sm text-[#505258]">Filter</span>
                    </button>
                    {showDepartmentFilter && renderDepartmentFilter()}
                  </div>
                </div>

                {/* Employee count and select all */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#676879]">54 Employees found</span>
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center gap-2 px-2 py-2"
                  >
                    <div className="w-4 h-4 border border-[#C3C6D4] rounded bg-white"></div>
                    <span className="text-sm text-[#505258]">Select All</span>
                  </button>
                </div>

                {/* Employee List */}
                <div className="flex-1 flex gap-10 overflow-hidden">
                  <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                    {filteredEmployees.slice(0, Math.ceil(filteredEmployees.length / 2)).map((employee) => (
                      <div
                        key={employee.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                          employee.selected ? "bg-[#E6F1FD]" : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => handleEmployeeToggle(employee.id)}
                      >
                        <div 
                          className="flex w-8 h-8 items-center justify-center rounded-full border border-white text-xs font-medium text-[#505258]"
                          style={{ backgroundColor: `hsl(var(--${employee.avatar}))` }}
                        >
                          {employee.initials}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[#172B4D]">{employee.name}</div>
                          <div className="text-sm text-[#505258]">{employee.email}</div>
                        </div>
                        {employee.selected && (
                          <div className="flex w-5 h-5 items-center justify-center rounded-full bg-[#0073EA]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M9.81045 3.14062L4.57236 8.37872L2.19141 5.99777" stroke="white" strokeWidth="1.07143" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                    {filteredEmployees.slice(Math.ceil(filteredEmployees.length / 2)).map((employee) => (
                      <div
                        key={employee.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                          employee.selected ? "bg-[#E6F1FD]" : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => handleEmployeeToggle(employee.id)}
                      >
                        <div 
                          className="flex w-8 h-8 items-center justify-center rounded-full border border-white text-xs font-medium text-[#505258]"
                          style={{ backgroundColor: `hsl(var(--${employee.avatar}))` }}
                        >
                          {employee.initials}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[#172B4D]">{employee.name}</div>
                          <div className="text-sm text-[#505258]">{employee.email}</div>
                        </div>
                        {employee.selected && (
                          <div className="flex w-5 h-5 items-center justify-center rounded-full bg-[#0073EA]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M9.81045 3.14062L4.57236 8.37872L2.19141 5.99777" stroke="white" strokeWidth="1.07143" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col gap-5">
                {/* Download Sample Format Button */}
                <div className="flex justify-end">
                  <button className="flex items-center gap-1 px-2 py-2 border border-[#0073EA] rounded bg-white hover:bg-[#F6F7FB] transition-colors">
                    <Download size={16} className="text-[#0073EA]" />
                    <span className="text-sm text-[#0073EA]">Download sample format</span>
                  </button>
                </div>

                {/* Upload Area */}
                <div className="flex flex-col gap-2">
                  <div 
                    className="flex h-[200px] flex-col justify-center items-center gap-2 rounded-lg border-2 border-dashed border-[#C3C6D4] bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <div className="relative">
                      <svg width="40" height="40" viewBox="0 0 41 41" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M22.1648 3.75118C22.1667 3.79093 22.1667 3.81285 22.1667 3.8567V11.2172C22.1667 11.6379 22.1665 12.0475 22.195 12.3945C22.226 12.7754 22.2995 13.225 22.53 13.6774C22.8495 14.3046 23.3595 14.8145 23.9867 15.1341C24.439 15.3646 24.8887 15.438 25.2697 15.4692C25.6165 15.4975 26.0262 15.4975 26.4468 15.4974H33.8075C33.8512 15.4974 33.873 15.4974 33.9128 15.4993C34.7358 15.5386 35.4593 16.2624 35.4982 17.0854C35.5 17.1251 35.5 17.1381 35.5 17.164V29.2329C35.5 30.5746 35.5 31.6817 35.4263 32.5837C35.3498 33.5206 35.1855 34.3817 34.7733 35.1907C34.1342 36.4451 33.1143 37.4649 31.86 38.1041C31.051 38.5162 30.1898 38.6806 29.253 38.7571C28.351 38.8307 27.2438 38.8307 25.9022 38.8307H15.0978C13.7562 38.8307 12.649 38.8307 11.747 38.7571C10.8101 38.6806 9.94897 38.5162 9.14007 38.1041C7.88565 37.4649 6.86578 36.4451 6.22663 35.1907C5.81447 34.3817 5.6502 33.5206 5.57367 32.5837C5.49997 31.6817 5.49998 30.5746 5.5 29.2329V11.7619C5.49998 10.4203 5.49997 9.31301 5.57367 8.41103C5.6502 7.4742 5.81447 6.61303 6.22663 5.80413C6.86578 4.54971 7.88565 3.52985 9.14007 2.8907C9.94897 2.47855 10.8101 2.31426 11.747 2.23773C12.6489 2.16403 13.7562 2.16405 15.0978 2.16406H20.5C20.526 2.16406 20.539 2.16405 20.5788 2.16593C21.4017 2.20486 22.1255 2.92823 22.1648 3.75118Z" fill="#DCDFEC"/>
                        <path d="M32.9477 12.0466C32.7473 12.1694 32.5027 12.1694 32.0133 12.1694L26.8333 12.1694C26.3667 12.1694 26.1333 12.1693 25.955 12.0785C25.7982 11.9986 25.6707 11.8711 25.5908 11.7143C25.5 11.5361 25.5 11.3027 25.5 10.836V5.65617C25.5 5.16681 25.5 4.92212 25.6228 4.72167C25.7965 4.43861 26.2053 4.26937 26.5282 4.34697C26.7567 4.40192 26.9162 4.56149 27.235 4.88064L32.7888 10.4345C33.108 10.7533 33.2675 10.9127 33.3225 11.1413C33.4 11.4642 33.2308 11.873 32.9477 12.0466Z" fill="#A3ADBA"/>
                      </svg>
                      <div className="absolute top-6 right-0 flex w-6 h-6 justify-center items-center rounded-full bg-[#323238]">
                        <Upload size={14} className="text-white" />
                      </div>
                    </div>
                    <div className="text-sm text-[#505258]">
                      <span>Drag & Drop File Here</span>
                      <span className="text-[#172B4D]"> or </span>
                      <span className="text-[#0073EA]">Choose File</span>
                    </div>
                    <input 
                      id="file-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg,.xls,.xlsx"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-[#505258]">
                    <span>Supported Formats: JPG, JPEG, PNG, SVG, .XLS</span>
                    <span>Maximum Size: 25MB</span>
                  </div>
                </div>

                {/* Uploaded File */}
                {uploadedFile && (
                  <div className="flex flex-col gap-2 p-4 rounded-lg bg-[#F6F7FB]">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="flex p-2 justify-center items-center rounded border border-[#D0D4E4] bg-white">
                          <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M10.0463 8.12406L3.7207 7.00781V15.2559C3.7207 15.6325 4.02602 15.9381 4.40289 15.9381H15.3179C15.6945 15.9381 16.0001 15.6328 16.0001 15.2559V12.2172L10.0463 8.12406Z" fill="#185C37"/>
                            <path d="M10.0463 1.0625H4.40289C4.02633 1.0625 3.7207 1.36781 3.7207 1.74469V4.78344L10.0463 8.50437L13.3951 9.62062L15.9998 8.50437V4.78344L10.0463 1.0625Z" fill="#21A366"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#172B4D]">{uploadedFile.name}</div>
                          <div className="text-xs text-[#505258]">Size {Math.round(uploadedFile.size / 1024 / 1024)}MB</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="flex w-7 h-7 justify-center items-center rounded-full bg-[#F6F7FB] hover:bg-gray-200"
                      >
                        <X size={18} className="text-[#676879]" />
                      </button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-[#505258]">Pending</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium text-[#505258]">{uploadProgress}%</span>
                          {uploadProgress >= 50 && (
                            <CheckCircle size={20} className="text-[#258750]" />
                          )}
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#5E58EE] via-[#4DC0F9] via-[#B7C964] via-[#FFC207] to-[#FF05EC] transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex h-[68px] px-5 justify-between items-center border-t border-[#D0D4E4] bg-white rounded-b-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#676879]">
                You've selected {activeTab === "select" ? selectedCount : uploadedFile ? "26" : "0"} employees
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="flex h-8 px-4 py-2 items-center justify-center rounded bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-[#676879]">Cancel</span>
              </button>
              <button
                onClick={handleSendInvite}
                disabled={activeTab === "select" ? selectedCount === 0 : !uploadedFile}
                className="flex h-8 px-4 py-2 items-center justify-center rounded bg-[#0073EA] hover:bg-[#0061d1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="text-sm font-medium text-white">Send Invite</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
