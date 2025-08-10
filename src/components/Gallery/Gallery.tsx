// src/components/Gallery/Gallery.tsx
import React, { useState, useEffect } from 'react';
import TitleBar from './TitleBar/TitleBar';
import ImageViewer from './ImageViewer/ImageViewer';
import StatusBar from './StatusBar/StatusBar';

// Gallery Props 타입 정의
interface GalleryProps {
  images?: string[];  // 선택적 props (기본값 있음)
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  // 기본 이미지 목록
const defaultImages: string[] = [
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop'
];

  // images props가 있으면 사용, 없으면 기본 이미지 사용
  const galleryImages = images.length > 0 ? images : defaultImages;

  // 상태 관리 (App.tsx에서 이동해온 것들)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // 상태 변경 함수들 (App.tsx에서 이동해온 것들)
  const nextImage = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevImage = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToImage = (index: number): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // 키보드 이벤트 (App.tsx에서 이동해온 것)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTransitioning]);

  // 갤러리 닫기 함수
  const handleClose = (): void => {
    window.close();
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#87CEEB',
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px, 30px 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      
      {/* 메인 갤러리 프레임 */}
      <div style={{
        width: 'min(85vw, 750px)',
        height: 'min(75vh, 550px)',
        maxWidth: 'calc(100vw - 40px)',
        maxHeight: 'calc(100vh - 40px)',
        backgroundColor: '#F0F0F0',
        border: '4px solid #000',
        borderStyle: 'solid',
        boxShadow: `
          inset -2px -2px 0px #808080,
          inset 2px 2px 0px #FFFFFF,
          4px 4px 0px rgba(0,0,0,0.3)
        `,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        
        <TitleBar title="Kang's Gallery" onClose={handleClose} />
        
        <ImageViewer
          images={galleryImages}
          currentIndex={currentIndex}
          isTransitioning={isTransitioning}
          onNext={nextImage}
          onPrev={prevImage}
        />
        
        <StatusBar
          currentIndex={currentIndex}
          totalImages={galleryImages.length}
          onIndicatorClick={goToImage}
          isTransitioning={isTransitioning}
        />
        
      </div>
    </div>
  );
};

export default Gallery;