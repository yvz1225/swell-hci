import React from 'react';
import { Product } from '../types';

interface ProductListItemProps {
    product: Product;
    isSaved: boolean;
    onAddToCloset: (product: Product) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, isSaved, onAddToCloset }) => {
    return (
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-grow">
                <a 
                    href={product.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-sand-dark hover:text-ocean-deep hover:underline"
                >
                    {product.name}
                </a>
                <p className="text-xs text-sand-medium">{product.brand}</p>
                <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm font-bold text-ocean-deep">₩{product.price.toLocaleString()}</p>
                </div>
            </div>
            <button
                onClick={() => onAddToCloset(product)}
                disabled={isSaved}
                className={`w-32 text-xs font-bold py-2 px-3 rounded-lg transition-colors flex-shrink-0 ${
                    isSaved 
                        ? 'bg-seafoam/20 text-seafoam cursor-not-allowed'
                        : 'bg-seafoam text-white hover:bg-ocean-deep'
                }`}
            >
                {isSaved ? '✅ Saved' : 'Add Closet'}
            </button>
        </div>
    );
};

export default ProductListItem;