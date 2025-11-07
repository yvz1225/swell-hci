import React, { useRef, useEffect, useState } from 'react';

interface ImageCropModalProps {
    src: string;
    onCropComplete: (croppedImage: string) => void;
    onCancel: () => void;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({ src, onCropComplete, onCancel }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const image = new Image();
        image.src = src;
        image.crossOrigin = "anonymous";
        image.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const canvasWidth = 300;
            const canvasHeight = 450;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const imgAspectRatio = image.width / image.height;
            const canvasAspectRatio = canvasWidth / canvasHeight;
            
            let sx, sy, sWidth, sHeight;

            if (imgAspectRatio > canvasAspectRatio) { // Image is wider than canvas
                sHeight = image.height;
                sWidth = sHeight * canvasAspectRatio;
                sx = (image.width - sWidth) / 2;
                sy = 0;
            } else { // Image is taller or same aspect ratio
                sWidth = image.width;
                sHeight = sWidth / canvasAspectRatio;
                sx = 0;
                sy = (image.height - sHeight) / 2;
            }

            ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
        };
        image.onerror = () => {
            setError("Could not load the image. Please try another one.");
        };
    }, [src]);

    const handleApply = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            onCropComplete(canvas.toDataURL('image/png'));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-slide-in-up flex flex-col items-center">
                <h2 className="text-lg font-bold text-ocean-deep mb-4">Crop Image</h2>
                <p className="text-xs text-sand-medium text-center mb-4">
                    Your photo will be cropped to fit the frame.
                </p>
                <div className="w-[300px] h-[450px] bg-sand-medium/10 rounded-lg overflow-hidden">
                    {error ? (
                         <div className="w-full h-full flex items-center justify-center text-coral p-4 text-sm">{error}</div>
                    ) : (
                        <canvas ref={canvasRef} />
                    )}
                </div>
                <div className="flex w-full gap-3 mt-6">
                    <button 
                        onClick={onCancel}
                        className="flex-1 bg-sand-medium/20 text-sand-dark font-bold py-3 px-4 rounded-lg hover:bg-sand-medium/40 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleApply}
                        disabled={!!error}
                        className="flex-1 bg-seafoam text-white font-bold py-3 px-4 rounded-lg hover:bg-ocean-deep transition-colors disabled:bg-sand-medium/50 text-sm"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropModal;