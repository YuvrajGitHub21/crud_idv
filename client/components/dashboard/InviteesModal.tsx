import React from 'react';

interface User {
  id: string;
  initials: string;
  name: string;
  email: string;
  avatarColor: string;
}

interface InviteesModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  position?: { x: number; y: number };
}

export function InviteesModal({ isOpen, onClose, users, position }: InviteesModalProps) {
  if (!isOpen) return null;

  const getAvatarColor = (color: string) => {
    const colorMap: Record<string, string> = {
      'avatar-1': 'hsl(var(--avatar-1))',
      'avatar-2': 'hsl(var(--avatar-2))',
      'avatar-3': 'hsl(var(--avatar-3))',
      'avatar-4': 'hsl(var(--avatar-4))',
      'avatar-5': 'hsl(var(--avatar-5))',
      'avatar-6': 'hsl(var(--avatar-6))',
      'avatar-7': 'hsl(var(--avatar-7))',
      'avatar-8': 'hsl(var(--avatar-8))',
    };
    return colorMap[color] || 'hsl(var(--grey-bg))';
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed z-50 w-[280px] p-2 bg-white rounded shadow-lg"
        style={{
          left: position?.x || '50%',
          top: position?.y || '50%',
          transform: position ? 'none' : 'translate(-50%, -50%)',
          boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.20)'
        }}
      >
        <div className="flex flex-col gap-1">
          {users.map((user) => (
            <div 
              key={user.id}
              className="flex items-center gap-2 h-[42px] px-2 rounded bg-white hover:bg-gray-50 transition-colors"
            >
              <div 
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white text-xs font-medium text-secondary-text"
                style={{ backgroundColor: getAvatarColor(user.avatarColor) }}
              >
                {user.initials}
              </div>
              <div className="flex flex-col justify-center flex-1">
                <div className="text-sm font-medium text-primary-text">
                  {user.name}
                </div>
                <div className="text-sm font-normal text-secondary-text leading-5">
                  {user.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
