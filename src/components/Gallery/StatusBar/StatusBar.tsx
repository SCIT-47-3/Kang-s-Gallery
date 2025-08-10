import React from 'react';

// Props 타입 정의
interface StatusBarProps {
  currentIndex: number;                    // 현재 이미지 인덱스 (0, 1, 2...)
  totalImages: number;                     // 전체 이미지 개수
  onIndicatorClick: (index: number) => void; // 도트 클릭시 실행할 함수
  isTransitioning: boolean;                // 전환 중인지 여부
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  currentIndex, 
  totalImages, 
  onIndicatorClick, 
  isTransitioning 
}) => {
  return (
    <div style={{
      height: '32px',
      backgroundColor: '#C0C0C0',
      border: '1px inset #C0C0C0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      fontSize: '12px'
    }}>
      {/* 왼쪽: 상태 표시 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '12px',
          height: '12px',
          backgroundColor: '#00FF00',
          border: '1px solid #000',
          imageRendering: 'pixelated'
        }} />
        Woking...
      </div>
      
      {/* 가운데: 인디케이터 도트들 */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {/* Array.from으로 totalImages만큼 도트 생성 */}
        {Array.from({ length: totalImages }, (_, index) => (
          <div
            key={index}
            onClick={() => {
              // 전환 중이 아닐 때만 클릭 허용
              if (!isTransitioning) {
                onIndicatorClick(index);
              }
            }}
            style={{
              width: '8px',
              height: '8px',
              // 현재 인덱스와 같으면 검은색, 아니면 회색
              backgroundColor: index === currentIndex ? '#000' : '#808080',
              border: '1px solid #000',
              cursor: 'pointer',
              imageRendering: 'pixelated'
            }}
          />
        ))}
      </div>
      
      {/* 오른쪽: 페이지 표시 */}
      <div>
        {currentIndex + 1} / {totalImages}
      </div>
    </div>
  );
};

export default StatusBar;