import React from 'react';

export function Footer() {
  return (
    <footer className="flex items-start justify-between px-4 py-2 border-t border-border-color bg-white">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-medium leading-3 text-secondary-text">
          Copyright @ 2025{' '}
        </span>
        <span className="text-xs font-medium leading-3 text-primary-text">
          Arcon
        </span>
        <span className="text-xs font-medium leading-3 text-secondary-text">
          . All right reserved.
        </span>
      </div>
    </footer>
  );
}
