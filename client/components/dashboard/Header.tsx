import React from 'react';

export function Header() {
  return (
    <header className="flex items-center justify-between w-full h-11 px-4 border-b border-header-border bg-white">
      <div className="flex items-center">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/4566b1e4f2b69299156b1f1c61472e06e0ad9666?width=180"
          alt="Logo"
          className="w-[90px] h-7 flex-shrink-0"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-accent">
          <span className="text-white font-medium text-xs leading-[10px]">
            OS
          </span>
        </div>
      </div>
    </header>
  );
}
