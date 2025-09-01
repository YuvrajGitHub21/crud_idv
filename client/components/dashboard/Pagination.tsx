import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export function Pagination() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-normal leading-5 text-secondary-text">
        Rows per page
      </span>
      
      <div className="flex items-center justify-center h-7 px-2 gap-2 rounded border border-border-color bg-white">
        <span className="text-sm font-medium text-placeholder-text">12</span>
        <ChevronDown size={20} className="text-placeholder-text" />
      </div>
      
      <span className="text-sm font-normal leading-5 text-secondary-text">
        1-9 0f 100
      </span>
      
      <div className="flex items-center gap-1">
        <button className="flex items-center justify-center w-7 h-7 rounded-full">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M14.1668 5.28594L15.0449 6.16406L11.2116 9.9974L15.0449 13.8307L14.1668 14.7089L9.45534 9.9974L14.1668 5.28594ZM6.45846 5.20573L6.45846 14.7891L5.20846 14.7891L5.20846 5.20573L6.45846 5.20573Z" fill="#676879"/>
          </svg>
        </button>
        
        <button className="flex items-center justify-center w-7 h-7 rounded-full">
          <ChevronLeft size={16} className="text-placeholder-text" />
        </button>
        
        <button className="flex items-center justify-center w-7 h-7 rounded-full">
          <ChevronRight size={16} className="text-placeholder-text" />
        </button>
        
        <button className="flex items-center justify-center w-7 h-7 rounded-full">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5.8332 14.7141L4.95508 13.8359L8.78841 10.0026L4.95508 6.16927L5.8332 5.29115L10.5447 10.0026L5.8332 14.7141ZM13.5415 14.7943V5.21094H14.7915V14.7943H13.5415Z" fill="#676879"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
