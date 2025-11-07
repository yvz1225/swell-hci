
import React, { useState } from 'react';
import { Product } from '../types';

interface VirtualFittingModalProps {
  product: Product;
  onClose: () => void;
}

const InputField: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, id, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-xs font-medium text-sand-medium">{label}</label>
        <div className="mt-1">
            <input type="number" id={id} value={value} onChange={onChange} className="w-full px-3 py-2 bg-shell-bg border border-sand-medium/30 rounded-md shadow-sm focus:ring-seafoam focus:border-seafoam" />
        </div>
    </div>
);


const VirtualFittingModal: React.FC<VirtualFittingModalProps> = ({ product, onClose }) => {
    const [measurements, setMeasurements] = useState({ height: '', bust: '', waist: '', hips: '' });
    const [isFitChecked, setIsFitChecked] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMeasurements({ ...measurements, [e.target.id]: e.target.value });
    };

    const handleSeeFit = () => {
        // In a real app, this would trigger a complex calculation or API call.
        // Here, we just simulate the result.
        setIsFitChecked(true);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-ocean-deep">Virtual Fitting</h2>
                        <p className="text-sm text-sand-medium">See how the <span className="font-semibold text-sand-dark">{product.name}</span> fits you.</p>
                    </div>
                    <button onClick={onClose} className="text-xl text-sand-medium hover:text-sand-dark">&times;</button>
                </div>

                <div className="mt-6">
                    {!isFitChecked ? (
                        <form onSubmit={(e) => { e.preventDefault(); handleSeeFit(); }} className="space-y-4">
                            <p className="text-xs text-sand-medium mb-4">Enter your measurements (in cm) for an accurate prediction.</p>
                            <InputField label="Height" id="height" value={measurements.height} onChange={handleChange} />
                            <InputField label="Bust" id="bust" value={measurements.bust} onChange={handleChange} />
                            <InputField label="Waist" id="waist" value={measurements.waist} onChange={handleChange} />
                            <InputField label="Hips" id="hips" value={measurements.hips} onChange={handleChange} />
                            <button type="submit" className="w-full bg-seafoam text-white font-bold py-3 px-4 rounded-lg mt-4 hover:bg-ocean-deep transition-colors text-sm">
                                See My Fit
                            </button>
                        </form>
                    ) : (
                        <div className="text-center p-4 bg-seafoam/10 rounded-lg">
                            <h3 className="text-lg font-bold text-ocean-deep">Looks like a great fit!</h3>
                            <p className="text-sm text-sand-medium mt-2">Based on your measurements, we recommend a size M. This item should fit comfortably.</p>
                             <button onClick={onClose} className="w-full bg-seafoam text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-ocean-deep transition-colors text-sm">
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirtualFittingModal;