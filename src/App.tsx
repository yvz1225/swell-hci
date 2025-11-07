import React, { useState, useMemo, useEffect } from 'react';
import { Outfit, Product, Style, Season } from './types';
import { MOCK_OUTFITS } from './constants';
import Header from './components/Header';
import ProductListItem from './components/ProductListItem';
import ClosetButton from './components/ClosetButton';
import Toast from './components/Toast';
import ClosetPage from './ClosetPage';

const ArrowButton = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => {
  const isLeft = direction === 'left';
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'left-4' : 'right-4'} bg-white/70 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-sand-dark hover:bg-white transition-all shadow-md z-10`}
      aria-label={isLeft ? 'Previous Outfit' : 'Next Outfit'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {isLeft ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
};

export default function App() {
  const [view, setView] = useState<'main' | 'closet'>('main');
  const [outfits] = useState<Outfit[]>(MOCK_OUTFITS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState<{ style: 'all' | Style, season: 'all' | Season }>({ style: 'all', season: 'all' });
  const [closet, setCloset] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  const allProducts = useMemo(() => MOCK_OUTFITS.flatMap(o => o.products), []);
  const savedProducts = useMemo(() => allProducts.filter(p => closet.includes(p.id)), [allProducts, closet]);

  const filteredOutfits = useMemo(() => {
    let tempOutfits = outfits;
    if (filters.style !== 'all') {
      tempOutfits = tempOutfits.filter(o => o.style === filters.style);
    }
    if (filters.season !== 'all') {
      tempOutfits = tempOutfits.filter(o => o.season === filters.season);
    }
    return tempOutfits;
  }, [outfits, filters]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filters]);
  
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNext = () => {
    if (filteredOutfits.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredOutfits.length);
  };

  const handlePrev = () => {
    if (filteredOutfits.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredOutfits.length) % filteredOutfits.length);
  };

  const handleFilterChange = (type: 'style' | 'season', value: 'all' | Style | Season) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleAddToCloset = (product: Product) => {
    if (!closet.includes(product.id)) {
      setCloset(prev => [...prev, product.id]);
      showToast('Saved!');
    }
  };

  const handleRemoveFromCloset = (productId: number) => {
    setCloset(prev => prev.filter(id => id !== productId));
    showToast('삭제되었습니다');
  };
  
  const currentOutfit = filteredOutfits[currentIndex];
  
  const renderMainView = () => (
     <div className="h-screen flex flex-col overflow-hidden">
        <Header 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onRefresh={() => setCurrentIndex(0)} 
        />
        
        <main className="flex-grow grid md:grid-cols-2 gap-8 p-4 md:p-8 overflow-hidden">
            <div className="relative h-full w-full rounded-2xl shadow-lg overflow-hidden">
            {currentOutfit ? (
                <>
                <img 
                    src={currentOutfit.imageUrl} 
                    alt={`Outfit style ${currentOutfit.style} for ${currentOutfit.season}`}
                    className="w-full h-full object-cover"
                />
                <ArrowButton direction="left" onClick={handlePrev} />
                <ArrowButton direction="right" onClick={handleNext} />
                </>
            ) : (
                <div className="w-full h-full bg-sand-medium/10 flex items-center justify-center">
                <p className="text-sm text-sand-medium">No outfits match your filters.</p>
                </div>
            )}
            </div>
            
            <div className="h-full overflow-y-auto pr-2">
            {currentOutfit ? (
                <div className="space-y-4">
                {currentOutfit.products.map(product => (
                    <ProductListItem 
                    key={product.id}
                    product={product}
                    isSaved={closet.includes(product.id)}
                    onAddToCloset={handleAddToCloset}
                    />
                ))}
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-sand-medium">Select filters to see new outfits.</p>
                </div>
            )}
            </div>
        </main>

        <ClosetButton itemCount={closet.length} onClick={() => setView('closet')} />
    </div>
  );

  const renderClosetView = () => (
    <ClosetPage 
        savedProducts={savedProducts} 
        onBack={() => setView('main')} 
        onRemoveItem={handleRemoveFromCloset}
        userImage={userImage}
        setUserImage={setUserImage}
        showToast={showToast}
    />
  );


  return (
    <div className="bg-shell-bg min-h-screen font-sans text-sand-dark">
      {view === 'main' ? renderMainView() : renderClosetView()}
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}