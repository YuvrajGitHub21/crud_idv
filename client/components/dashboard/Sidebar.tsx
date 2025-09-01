import React from 'react';
import { 
  Home, 
  FileText, 
  CreditCard, 
  UserPlus, 
  BarChart3, 
  GitBranch, 
  HelpCircle,
  Settings,
  LogOut
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  opacity?: number;
}

function NavItem({ icon, label, isActive = false, opacity = 1 }: NavItemProps) {
  return (
    <div className={`flex flex-col items-center gap-0.5 w-10 h-15 rounded-lg ${isActive ? 'bg-blue-100' : ''}`} style={{ opacity }}>
      <div className={`flex items-center justify-center w-[38px] h-[22px] rounded-lg ${isActive ? 'bg-blue-100' : 'bg-white'}`}>
        {icon}
      </div>
      <span className={`text-xs font-semibold leading-5 ${isActive ? 'text-primary-text' : 'text-secondary-text'}`}>
        {label}
      </span>
    </div>
  );
}

export function Sidebar() {
  return (
    <nav className="flex flex-col w-18 min-h-[650px] p-4 border-r border-border-color bg-white">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center gap-3">
          <NavItem
            icon={<Home size={22} className="text-secondary-text" />}
            label="Home"
          />
          <NavItem
            icon={<FileText size={22} className="text-secondary-text" />}
            label="Templates"
            isActive={true}
          />
          <NavItem
            icon={<CreditCard size={22} className="text-secondary-text" />}
            label="Verification"
          />
          <NavItem
            icon={
              <div className="relative w-[22px] h-[22px]">
                <UserPlus size={14} className="text-secondary-text absolute top-0.5 left-0.5" />
                <Settings size={13} className="text-secondary-text absolute bottom-0 right-0" />
              </div>
            }
            label="Management"
          />
          <NavItem
            icon={<BarChart3 size={22} className="text-secondary-text" />}
            label="Analytics"
          />
          <NavItem
            icon={<GitBranch size={22} className="text-secondary-text" />}
            label="Integration"
          />
          <NavItem
            icon={<LogOut size={22} className="text-secondary-text" />}
            label="Logout"
            opacity={0.01}
          />
        </div>
        
        <div className="flex flex-col items-center">
          <NavItem
            icon={<HelpCircle size={22} className="text-secondary-text" />}
            label="Help"
          />
        </div>
      </div>
    </nav>
  );
}
