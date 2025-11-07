import React, { useMemo, useState, useCallback, useRef } from 'react';
import { Product, Category } from './types';
import { HermitCrabIcon } from './assets/HermitCrabIcon';
import ClosetItemCard from './components/ClosetItemCard';
import FittingQueue from './components/FittingQueue';
import ImageCropModal from './components/ImageCropModal';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-ocean-deep">{title}</h2>
                <p className="text-sm text-sand-medium mt-2 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="bg-sand-medium/20 text-sand-dark font-bold py-2 px-4 rounded-lg hover:bg-sand-medium/40 transition-colors text-sm"
                    >
                        취소
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-coral text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ClosetPageProps {
    savedProducts: Product[];
    onBack: () => void;
    onRemoveItem: (productId: number) => void;
    userImage: string | null;
    setUserImage: (image: string | null) => void;
    showToast: (message: string) => void;
}

const FittingCanvas: React.FC<{
    userImage: string | null;
    fittedItems: Product[];
    isLoading: boolean;
    canvasRef: React.RefObject<HTMLDivElement>;
}> = ({ userImage, fittedItems, isLoading, canvasRef }) => {
    return (
        <div className="w-full aspect-[4/6] bg-white rounded-2xl shadow-lg p-4 flex flex-col">
            <div ref={canvasRef} className="relative flex-grow w-full h-full flex items-center justify-center bg-shell-bg rounded-lg">
                {!userImage ? (
                    <div className="w-full h-full p-4">
                        <div className="border-2 border-dashed border-sand-medium/40 rounded-xl w-full h-full flex flex-col items-center justify-center text-sand-medium">
                            <p className="text-sm font-semibold">'내 사진'을 눌러 이미지를 업로드하세요.</p>
                        </div>
                    </div>
                ) : (
                    <img src={userImage} alt="User's full body" className="w-full h-full object-cover rounded-lg" />
                )}

                {userImage && fittedItems.length === 0 && !isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-sm text-sand-medium/80 text-center leading-relaxed">
                            오른쪽에서 아이템을 선택하고<br/>Fitting 버튼을 눌러주세요
                        </p>
                    </div>
                 )}

                {userImage && fittedItems.map(item => (
                    <img key={item.id} src={item.imageUrl} alt={item.name} className="absolute w-1/2 h-1/2 object-contain pointer-events-none" />
                ))}

                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
                        <div className="w-10 h-10 border-4 border-seafoam border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-sm text-sand-medium">피팅 중...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const PhotoUploadPage: React.FC<{ onImageSelected: (src: string) => void }> = ({ onImageSelected }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => fileInputRef.current?.click();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    onImageSelected(event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="flex-grow flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md h-auto aspect-[4/6] p-4 border-2 border-dashed border-sand-medium/40 rounded-xl flex flex-col items-center justify-center text-center">
                 <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                <p className="text-sand-dark font-semibold text-base mb-6">전신이 다 나오는 사진이어야 합니다.</p>
                <button onClick={handleButtonClick} className="bg-sand-dark text-white font-bold py-2 px-6 rounded-lg hover:bg-ocean-deep transition-colors text-sm">
                    Upload Photo
                </button>
            </div>
        </div>
    );
};


const ClosetPage: React.FC<ClosetPageProps> = ({ savedProducts, onBack, onRemoveItem, userImage, setUserImage, showToast }) => {
    const [mode, setMode] = useState<'fitting' | 'upload'>('fitting');
    const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
    const [fittingQueue, setFittingQueue] = useState<Product[]>([]);
    const [fittedItems, setFittedItems] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    const categorizedProducts = useMemo(() => {
        return savedProducts.reduce((acc, product) => {
            const category = product.category || 'Accessory';
            if (!acc[category]) acc[category] = [];
            acc[category].push(product);
            return acc;
        }, {} as Record<Category, Product[]>);
    }, [savedProducts]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: Product) => {
        e.dataTransfer.setData('application/json', JSON.stringify(product));
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const productData = e.dataTransfer.getData('application/json');
        if (productData) {
            const product = JSON.parse(productData) as Product;
            if (!fittingQueue.some(p => p.id === product.id)) {
                setFittingQueue(prev => [...prev, product]);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    const handleDragEnter = () => setIsDraggingOver(true);
    const handleDragLeave = () => setIsDraggingOver(false);
    
    const handleRemoveFromQueue = (productId: number) => {
        setFittingQueue(prev => prev.filter(p => p.id !== productId));
    };

    const handleFit = () => {
        if (!userImage) {
            showToast('먼저 사진을 업로드해주세요.');
            return;
        }
        if (fittingQueue.length === 0) {
            showToast('옷걸이 큐에 옷을 추가해주세요.');
            return;
        }

        setIsLoading(true);
        setFittedItems([]); 

        setTimeout(() => {
            setFittedItems(fittingQueue);
            setFittingQueue([]);
            setIsLoading(false);
            showToast('피팅 완료!');
        }, 2000);
    };
    
    const handleImageSelectedForCrop = (src: string) => {
        setCropImageSrc(src);
    };

    const handleCropComplete = (croppedImage: string) => {
        setUserImage(croppedImage);
        setCropImageSrc(null);
        setMode('fitting');
    };

    const handleReset = () => {
        setFittedItems([]);
        setUserImage(null);
    };

    const handleSaveImage = async () => {
        if (!canvasContainerRef.current || !userImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const userImg = new Image();
        userImg.crossOrigin = "anonymous";
        userImg.src = userImage;
        
        userImg.onload = async () => {
            canvas.width = userImg.width;
            canvas.height = userImg.height;
            ctx.drawImage(userImg, 0, 0);

            const clothingPromises = fittedItems.map(item => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const itemImg = new Image();
                    itemImg.crossOrigin = "anonymous";
                    itemImg.src = item.imageUrl;
                    itemImg.onload = () => resolve(itemImg);
                    itemImg.onerror = reject;
                });
            });

            const clothingImages = await Promise.all(clothingPromises);
            
            clothingImages.forEach(img => {
                const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.5;
                const sw = img.width;
                const sh = img.height;
                const dw = sw * scale;
                const dh = sh * scale;
                const dx = (canvas.width - dw) / 2;
                const dy = (canvas.height - dh) / 2;
                ctx.drawImage(img, dx, dy, dw, dh);
            });

            const link = document.createElement('a');
            link.download = 'swell-fitting.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
    };
    
    const handleRequestDelete = (productId: number) => {
        setItemToDelete(productId);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete !== null) {
            onRemoveItem(itemToDelete);
        }
        setItemToDelete(null);
    };

    const handleCancelDelete = () => {
        setItemToDelete(null);
    };

    const renderFittingView = () => (
        <main className="flex-grow grid md:grid-cols-2 gap-8 p-4 md:p-8">
             <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-2">
                    <button 
                        onClick={() => setMode('upload')}
                        className="text-base font-bold text-sand-dark bg-sand-medium/20 px-4 py-1.5 rounded-lg self-start hover:bg-sand-medium/30 transition-colors"
                    >
                        내 사진
                    </button>
                </div>
                <FittingCanvas
                    userImage={userImage}
                    fittedItems={fittedItems}
                    isLoading={isLoading}
                    canvasRef={canvasContainerRef}
                />
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <button
                            onClick={handleSaveImage}
                            disabled={!userImage || fittedItems.length === 0}
                            className="bg-seafoam text-white font-bold py-2 px-5 rounded-lg hover:bg-ocean-deep transition-colors text-sm flex items-center gap-2 disabled:bg-sand-medium/50 disabled:cursor-not-allowed"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            이미지 저장
                        </button>
                    </div>
                    <button
                        onClick={handleReset}
                        className="bg-sand-medium/20 text-sand-dark font-bold py-2 px-5 rounded-lg hover:bg-sand-medium/40 transition-colors text-sm flex items-center gap-2"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/></svg>
                        새로고침
                    </button>
                </div>
            </div>
            
            <div className="flex flex-col gap-4">
                 <div className="space-y-6">
                   {savedProducts.length > 0 ? (
                    <>
                        {(['Tops', 'Bottoms', 'Accessory'] as Category[]).map(category => 
                            categorizedProducts[category] && categorizedProducts[category].length > 0 && (
                            <div key={category} className="space-y-3">
                                <h3 className="text-lg font-bold text-ocean-deep px-1">{category}</h3>
                                <div className="flex gap-3 overflow-x-auto pb-3">
                                    {categorizedProducts[category].map(product => (
                                        <ClosetItemCard 
                                            key={product.id} 
                                            product={product} 
                                            onRemove={handleRequestDelete}
                                            onDragStart={(e) => handleDragStart(e, product)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                   ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-sm text-sand-medium text-center">
                            아직 옷장에 상품이 없어요!<br/>코디에서 마음에 드는 상품을 추가해보세요.
                        </p>
                    </div>
                   )}
                </div>
                <FittingQueue 
                    queue={fittingQueue}
                    onRemove={handleRemoveFromQueue}
                    onFit={handleFit}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    isDraggingOver={isDraggingOver}
                />
            </div>
        </main>
    );
    
    const renderUploadView = () => (
         <PhotoUploadPage onImageSelected={handleImageSelectedForCrop} />
    );


    return (
        <div className="w-full flex flex-col min-h-screen">
            <header className="w-full p-4 flex items-center justify-between border-b border-sand-medium/20 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <HermitCrabIcon className="w-8 h-8 text-ocean-deep"/>
                    <h1 className="text-xl font-bold text-ocean-deep">
                        {mode === 'upload' ? 'My Closet - 내 사진' : 'My Closet'}
                    </h1>
                </div>
                <button onClick={mode === 'upload' ? () => setMode('fitting') : onBack} className="flex items-center gap-2 text-sand-medium hover:text-ocean-deep font-semibold text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    {mode === 'upload' ? 'Back to Closet' : 'Back to Outfits'}
                </button>
            </header>
            
            {mode === 'fitting' ? renderFittingView() : renderUploadView()}
            
            {cropImageSrc && (
                <ImageCropModal 
                    src={cropImageSrc}
                    onCropComplete={handleCropComplete}
                    onCancel={() => setCropImageSrc(null)}
                />
            )}
            <ConfirmationModal
                isOpen={itemToDelete !== null}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="아이템 삭제"
                message="정말로 삭제하시겠습니까?"
            />
        </div>
    );
};

export default ClosetPage;