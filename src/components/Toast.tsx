import React from 'react';

interface ToastProps {
    message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
    return (
        <div className="fixed top-20 right-4 bg-ocean-deep text-white py-2 px-5 rounded-lg shadow-lg animate-toast-in-right z-50">
            <p className="text-sm font-semibold">{message}</p>
        </div>
    );
};

export default Toast;