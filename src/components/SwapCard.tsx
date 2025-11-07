
import React from 'react';
import { Product } from '../types';

interface SwapCardProps {
  product: Product;
  isActive: boolean;
  animation: 'left' | 'right' | 'up' | null;
  onTryOn: (product: Product) => void;
  onGetAdvice: (product: Product) => void;
  zIndex: number;
}

const animationClasses = {
  left: '-translate-x-[150%] -rotate-12',
  right: 'translate-x-[150%] rotate-12',
  up: '-translate-y-[150%] rotate-6',
};

const SwapCard: React.FC<SwapCardProps> = ({ product, isActive, animation, onTryOn, onGetAdvice, zIndex }) => {
  const transformClass = isActive && animation ? animationClasses[animation] : 'translate-x-0 rotate-0';

  return (
    <div
      className={`absolute w-full h-full transition-all duration-500 ease-in-out transform-gpu ${transformClass}`}
      style={{ zIndex }}
    >
        <div className="relative w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white">
                <h3 className="text-xl font-bold leading-tight">{product.name}</h3>
                <p className="text-base opacity-90">{product.brand}</p>
                <p className="text-lg font-semibold mt-1">${product.price.toFixed(2)}</p>
            </div>
             <div className="absolute top-4 right-4 flex flex-col gap-3">
                <button
                    onClick={() => onTryOn(product)}
                    className="bg-white/80 backdrop-blur-sm text-sand-dark p-3 rounded-full shadow-md hover:bg-white transition-transform transform hover:scale-110"
                    aria-label="Virtual Fitting"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.25 5.25c0-2.485-2.015-4.5-4.5-4.5s-4.5 2.015-4.5 4.5c0 .324.034.642.1.951a.75.75 0 0 1-1.401.597A6.01 6.01 0 0 0 9.75 5.25c-2.485 0-4.5 2.015-4.5 4.5S7.265 14.25 9.75 14.25c.324 0 .642-.034.951-.1a.75.75 0 0 1 .597 1.401A6.01 6.01 0 0 0 9.75 15.75c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5c0-.324-.034-.642-.1-.951a.75.75 0 0 1 1.401-.597c.066.309.1.627.1.951 2.485 0 4.5-2.015 4.5-4.5S22.735 5.25 20.25 5.25Z"/></svg>
                </button>
                 <button
                    onClick={() => onGetAdvice(product)}
                    className="bg-white/80 backdrop-blur-sm text-sand-dark p-3 rounded-full shadow-md hover:bg-white transition-transform transform hover:scale-110"
                    aria-label="Get Styling Advice"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                </button>
            </div>
        </div>
    </div>
  );
};

export default SwapCard;