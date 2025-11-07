import React from 'react';
import { Product } from '../types';

interface FittingQueueProps {
    queue: Product[];
    onRemove: (productId: number) => void;
    onFit: () => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    // FIX: Add missing props to handle drag enter/leave events and dragging state.
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    isDraggingOver: boolean;
}

const FittingQueue: React.FC<FittingQueueProps> = ({ queue, onRemove, onFit, onDrop, onDragOver, onDragEnter, onDragLeave, isDraggingOver }) => {
    return (
        <div 
            className="flex-shrink-0 bg-white rounded-2xl shadow-lg p-4 space-y-3"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-ocean-deep">옷걸이 큐</h3>
                <span className="text-xs font-semibold text-sand-medium">{queue.length} items</span>
            </div>
            <div 
                className={`h-24 border-2 border-dashed ${isDraggingOver ? 'border-ocean-deep bg-seafoam/10' : (queue.length === 0 ? 'border-sand-medium/40' : 'border-seafoam')} rounded-lg p-2 flex items-center gap-2 overflow-x-auto transition-colors`}
            >
                {queue.length === 0 ? (
                    <p className="text-xs text-sand-medium w-full text-center">{ isDraggingOver ? 'Drop here!' : '오른쪽 옷장에서 아이템을 드래그하세요.'}</p>
                ) : (
                    queue.map(product => (
                        <div key={product.id} className="relative flex-shrink-0">
                            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                             <button 
                                onClick={() => onRemove(product.id)}
                                className="absolute -top-1 -right-1 bg-coral text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                aria-label={`Remove ${product.name} from queue`}
                            >
                                &times;
                            </button>
                        </div>
                    ))
                )}
            </div>
             <button
                onClick={onFit}
                className="w-full bg-seafoam text-white font-bold py-3 px-4 rounded-lg hover:bg-ocean-deep transition-colors disabled:bg-sand-medium/50 text-sm"
                disabled={queue.length === 0}
            >
                Fitting
            </button>
        </div>
    );
};

export default FittingQueue;