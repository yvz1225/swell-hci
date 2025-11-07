
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getStylingAdvice } from '../services/geminiService';

interface StylingAdviceModalProps {
  product: Product;
  onClose: () => void;
}

const StylingAdviceModal: React.FC<StylingAdviceModalProps> = ({ product, onClose }) => {
    const [advice, setAdvice] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                setLoading(true);
                const result = await getStylingAdvice(product.name, product.brand);
                setAdvice(result);
            } catch (err) {
                setError('Failed to fetch styling advice. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdvice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8 animate-slide-in-up max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4 flex-shrink-0">
                     <div>
                        <h2 className="text-xl font-bold text-ocean-deep">Styling Advice</h2>
                        <p className="text-sm text-sand-medium">AI-powered tips for your <span className="font-semibold text-sand-dark">{product.name}</span>.</p>
                    </div>
                    <button onClick={onClose} className="text-sand-medium hover:text-sand-dark text-xl">&times;</button>
                </div>
                
                <div className="overflow-y-auto">
                    {loading && (
                        <div className="flex flex-col items-center justify-center p-8 space-y-3">
                            <div className="w-10 h-10 border-4 border-seafoam border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm text-sand-medium">Our AI stylist is thinking...</p>
                        </div>
                    )}
                    {error && <p className="text-coral text-center">{error}</p>}
                    {!loading && !error && (
                        <div className="prose prose-sm max-w-none text-sand-dark" dangerouslySetInnerHTML={{ __html: advice.replace(/\n/g, '<br />') }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StylingAdviceModal;