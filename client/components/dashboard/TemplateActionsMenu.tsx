import React from 'react';
import {
  Eye,
  Send,
  Link,
  Download,
  Type,
  Copy,
  Edit,
  Trash2
} from 'lucide-react';

interface TemplateActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
  templateId: number;
  templateName: string;
}

interface ActionItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

function ActionItem({ icon, label, onClick, className = '' }: ActionItemProps) {
  return (
    <div 
      className={`flex items-center gap-2 h-8 px-1.5 rounded bg-white hover:bg-gray-50 transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="w-4 h-4 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium text-secondary-text">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return <div className="h-px bg-border-color mx-0" />;
}

export function TemplateActionsMenu({ 
  isOpen, 
  onClose, 
  position, 
  templateId, 
  templateName 
}: TemplateActionsMenuProps) {
  if (!isOpen) return null;

  const handleAction = (action: string) => {
    console.log(`${action} action for template ${templateId}: ${templateName}`);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div 
        className="fixed z-50 w-[250px] p-2 bg-white rounded shadow-lg"
        style={{
          left: position?.x || '50%',
          top: position?.y || '50%',
          transform: position ? 'none' : 'translate(-50%, -50%)',
          boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)'
        }}
      >
        <div className="flex flex-col gap-px">
          <ActionItem
            icon={<Eye size={16} className="text-secondary-text" />}
            label="Preview"
            onClick={() => handleAction('Preview')}
          />
          
          <ActionItem
            icon={<Send size={16} className="text-secondary-text" />}
            label="Send Invite"
            onClick={() => handleAction('Send Invite')}
          />
          
          <ActionItem
            icon={<Link size={16} className="text-secondary-text" />}
            label="Generate Link"
            onClick={() => handleAction('Generate Link')}
          />
          
          <ActionItem
            icon={<Download size={16} className="text-secondary-text" />}
            label="Download"
            onClick={() => handleAction('Download')}
          />
          
          <Separator />
          
          <ActionItem
            icon={<Type size={16} className="text-secondary-text" />}
            label="Rename"
            onClick={() => handleAction('Rename')}
          />
          
          <ActionItem
            icon={<Copy size={16} className="text-secondary-text" />}
            label="Clone"
            onClick={() => handleAction('Clone')}
          />
          
          <ActionItem
            icon={<Edit size={16} className="text-secondary-text" />}
            label="Edit"
            onClick={() => handleAction('Edit')}
          />
          
          <ActionItem
            icon={<Trash2 size={16} className="text-secondary-text" />}
            label="Delete"
            onClick={() => handleAction('Delete')}
          />
        </div>
      </div>
    </>
  );
}
