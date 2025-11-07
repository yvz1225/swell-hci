import React from 'react';

interface ClosetButtonProps {
    itemCount: number;
    onClick: () => void;
}

const ClosetButton: React.FC<ClosetButtonProps> = ({ itemCount, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="fixed bottom-6 right-6 w-16 h-16 bg-sand-dark rounded-full flex flex-col items-center justify-center text-white shadow-xl hover:bg-ocean-deep transition-colors z-20"
            aria-label={`View your closet, ${itemCount} items`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                <path d="M12 11v6"></path><path d="M9 14h6"></path>
            </svg>
            <span className="text-xs font-bold">{itemCount}</span>
        </button>
    );
};

export default ClosetButton;