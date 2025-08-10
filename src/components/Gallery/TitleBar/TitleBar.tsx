// src/components/Gallery/TitleBar.tsx
import React from 'react';

// Props 타입 정의 - 부모로부터 받을 데이터들
interface TitleBarProps {
  title: string;           // 제목 텍스트
  onClose: () => void;     // 닫기 버튼 클릭시 실행할 함수
}

// 함수형 컴포넌트 정의
const TitleBar: React.FC<TitleBarProps> = ({ title, onClose }) => {
  return (
    <div style={{
      height: '40px',
      backgroundColor: '#C0C0C0',
      border: '2px solid #808080',
      borderTop: '2px solid #FFFFFF',
      borderLeft: '2px solid #FFFFFF',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#000'
    }}>
      {/* 아이콘 */}
      <img
      src='/public/favicon.ico'
      alt='Gallery Icon'
      style={
        {
          width: '16px',
          height: '16px',
          marginRight: '8px',
          imageRendering: 'pixelated',
        }
      }/>
      
      {/* 제목 - props로 받은 title 사용 */}
      {title}
      
      {/* 닫기 버튼 */}
      <div style={{
        marginLeft: 'auto',
        marginRight: '8px',
        width: '20px',
        height: '20px',
        backgroundColor: '#C0C0C0',
        border: '1px outset #C0C0C0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      onClick={onClose}  // props로 받은 onClose 함수 실행
      >
        ×
      </div>
    </div>
  );
};

export default TitleBar;