
import React from 'react';

interface ActionButtonsProps {
  onDislike: () => void;
  onSave: () => void;
  onLike: () => void;
}

const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string, 'aria-label': string }> = ({ onClick, children, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110 active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);


const ActionButtons: React.FC<ActionButtonsProps> = ({ onDislike, onSave, onLike }) => {
  return (
    <div className="flex items-center justify-around w-full max-w-xs">
      <ActionButton onClick={onDislike} className="bg-white text-coral" aria-label="Dislike">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </ActionButton>
      <ActionButton onClick={onSave} className="bg-white text-sand-medium w-14 h-14 md:w-16 md:h-16" aria-label="Save">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
      </ActionButton>
      <ActionButton onClick={onLike} className="bg-white text-seafoam" aria-label="Like">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
      </ActionButton>
    </div>
  );
};

export default ActionButtons;
