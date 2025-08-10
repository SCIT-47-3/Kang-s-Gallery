// src/components/Gallery/ImageViewer.tsx
import React, { useRef } from 'react';

// Props 타입 정의
interface ImageViewerProps {
  images: string[];                    // 이미지 URL 배열
  currentIndex: number;                // 현재 이미지 인덱스
  isTransitioning: boolean;            // 전환 중인지 여부
  onNext: () => void;                  // 다음 이미지로 이동하는 함수
  onPrev: () => void;                  // 이전 이미지로 이동하는 함수
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  isTransitioning,
  onNext,
  onPrev
}) => {
  // 터치 이벤트를 위한 ref들 (컴포넌트 내부에서 관리)
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // 터치 이벤트 핸들러들
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (): void => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) onNext();
    if (isRightSwipe) onPrev();
  };

  // 이미지 로드 실패 처리
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const target = e.target as HTMLImageElement;
    const nextSibling = target.nextSibling as HTMLElement;
    target.style.display = 'none';
    if (nextSibling) {
      nextSibling.style.display = 'flex';
    }
  };

  return (
    <div style={{
      flex: 1,
      margin: '12px',
      backgroundColor: '#FFF',
      border: '2px inset #C0C0C0',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 0
    }}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    >
      
      {/* 이미지 슬라이더 */}
      <div style={{
        width: `${images.length * 100}%`,
        height: '100%',
        display: 'flex',
        transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
        transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none'
      }}>
        {images.map((src, index) => (
          <div key={index} style={{
            width: `${100 / images.length}%`,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000'
          }}>
            <img 
              src={src}
              alt={`Artwork ${index + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                imageRendering: 'pixelated'
              }}
              onError={handleImageError}
            />
            <div style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontSize: '16px'
            }}>
              Image {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* 좌측 네비게이션 버튼 */}
      <button 
        onClick={onPrev}
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          left: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '28px',
          height: '28px',
          backgroundColor: '#C0C0C0',
          border: '2px outset #C0C0C0',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: isTransitioning ? 'default' : 'pointer',
          userSelect: 'none',
          opacity: isTransitioning ? 0.5 : 1,
          zIndex: 10,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          lineHeight: 1
        }}
      >
        ‹
      </button>

      {/* 우측 네비게이션 버튼 */}
      <button 
        onClick={onNext}
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          right: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '28px',
          height: '28px',
          backgroundColor: '#C0C0C0',
          border: '2px outset #C0C0C0',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: isTransitioning ? 'default' : 'pointer',
          userSelect: 'none',
          opacity: isTransitioning ? 0.5 : 1,
          zIndex: 10,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          lineHeight: 1
        }}
      >
        ›
      </button>
    </div>
  );
};

export default ImageViewer;