import React from 'react';
import { Product } from '../types';

interface ClosetItemCardProps {
    product: Product;
    onRemove: (productId: number) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

const ClosetItemCard: React.FC<ClosetItemCardProps> = ({ product, onRemove, onDragStart }) => {
    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove(product.id);
    };

    return (
        <div 
            className="group relative w-28 h-28 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing shadow-sm flex-shrink-0"
            draggable
            onDragStart={onDragStart}
        >
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-300 group-hover:grayscale"
            />
            <div className="absolute inset-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between text-center">
                <div className="text-white">
                    <p className="font-bold text-xs truncate w-full">{product.brand}</p>
                    <p className="text-xs truncate w-full">{product.name}</p>
                </div>
                <button 
                    onClick={handleRemoveClick}
                    className="bg-coral/80 hover:bg-coral text-white text-xs font-semibold py-1 px-2 rounded-md self-center"
                    aria-label={`Remove ${product.name}`}
                >
                    삭제
                </button>
            </div>
        </div>
    );
};

export default ClosetItemCard;